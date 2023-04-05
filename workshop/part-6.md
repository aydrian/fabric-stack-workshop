# Part 6: Modifying a User

## 💡 Objectives

- Learn SQL: Use the `UPDATE` statement to modify a user

## ℹ️ [`UPDATE`](https://www.cockroachlabs.com/docs/stable/update.html)

To update one or many rows in a table, use `UPDATE` followed by the table name and then `SET` with one or more column = value statements separated with a comma. Add a `WHERE` expression to target the row or rows to be modified. If you do not include a where expression, all rows in the table will be updated.

```SQL
UPDATE {table_name}
SET {col_name} = {col_value}, ...
WHERE {expression}; -- Optional
```

> **Note**
> This is just one way to write the `UPDATE` statement. [See other examples in the CockroachDB Docs.](https://www.cockroachlabs.com/docs/stable/update.html#update-multiple-columns-in-a-single-row)

## 🧑‍💻 Exercise: `update_user`

In order to handle changing the password on the profile page, we need to be able to update a row in the user table. Update the `update_user` function to update the fields and values passed in the function.

This exercise is a bit more challenging becaues it involves creating a dynamic UPDATE statement. It's okay to peek at the solution. The [`sql` module](https://www.psycopg.org/psycopg3/docs/api/sql.html#module-psycopg.sql) will assist with string composition.

<details> 
<br>
<summary>✅ Solution</summary>

```python
def update_user(user_id: str, user: UserUpdate, db: Connection) -> User:
    user_id = UUID(user_id)
    if user.password is not None:
        user.password_hash = hash_password(user.password)
        user.password = None
    user_dict = user.dict(exclude_none=True)
    query = sql.SQL("UPDATE users SET {data} WHERE id={id};").format(
        data=sql.SQL(", ").join(
            sql.Composed([sql.Identifier(k), sql.SQL(" = "), sql.Placeholder(k)])
            for k in user_dict.keys()
        ),
        id=user_id,
    )
    db.execute(query, user_dict)
    user = get_user_by_id(user_id, db)
    return

```

> **_Note_**
> This solution uses a list comprehension but could also be done with a for loop. There are many correct ways to solve this.

</details>

| [Back](part-5.md) | [Next](part-7.md) |
| ----------------- | ----------------- |
