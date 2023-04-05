# Part 8: Delete a User

## 💡 Objectives

- Learn SQL: Use the `DELETE` statement to remove a row from the users table

## ℹ️ `DELETE`

To delete a row or rows from a table, use `DELETE FROM` followed by the table name and a `WHERE` clause specifying the row or rows to delete.

```SQL
DELETE FROM {table_name}
WHERE {expression};
```

**Examples**

```SQL
/* Delete One (assuming unique names) */
DELETE FROM dogs
WHERE name = 'Atticus';

/* Delete Many */
DELETE FROM dogs
WHERE age > 3 AND breed = 'corgi';
```

> **Note**
> You must include a `WHERE` clause with your `DELETE` statement. If you'd like to delete all rows in a table, use `TRUNCATE {table_name};`.

## 🧑‍💻 Exercise: `delete_user`

The Admin Page allows you to delete users by removing their row from the `users` table. Update `delete_user` to delete the row from the `users` table where the `id` matches the `users_id` passed to the function. You don't need to return anything.

<details> 
<br>
<summary>✅ Solution</summary>

```python
def delete_user(user_id: str, db: Connection):
    db.execute("DELETE FROM users WHERE id=%s", (user_id,))
    return
```

</details>

| [Back](part-7.md) | [Next](part-9.md) |
| ----------------- | ----------------- |
