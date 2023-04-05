# Part 5: Update Login and Sign-Up Functions

## 💡 Objectives

- Learn SQL:
  - Use the `SELECT` statement to aid in login
  - Use the `INSERT` statement to sign up new users

## ℹ️ [`SELECT`](https://www.cockroachlabs.com/docs/stable/select-clause.html)

To retrieve rows from a table, use `SELECT` followed by a comma-separated list of column names (or `*` for all columns), and then `FROM` followed by a table name. You have the option of adding a `WHERE` clause to filter the results and `ORDER BY` followed by a column name and direction to sort the results.

```SQL
SELECT {col_name_1}, {col_name_2}, ... {col_name_n}
FROM {table_name}
WHERE {expression} -- Optional
ORDER BY {col_name} {asc | desc}; -- Optional
```

## ℹ️ [`INSERT`](https://www.cockroachlabs.com/docs/stable/insert.html)

To add a new row to a table, use `INSERT INTO` followed by the table name and a comma-separated list of columns with `VALUES` and a comma-separated list of corresponding values. You can add `RETURNING` along with a column name to retreive a value created on insert like an id.

```SQL
INSERT INTO {table_name} ({col_name_1}, {col_name_2}, ... {col_name_n})
VALUES ({col_value_1}, {col_value_2}, ... {col_value_n})
RETURNING {col_name}; -- Optional
```

## 🧑‍💻 Exercises

> **Note**
> The following exercises involve updating functions in `./backend/backend/app/database/actions.py`. You should not need to modify any other files.

> **Note**
> Each function provides you with a db argument that is a PsycoPG [Connection class](https://www.psycopg.org/psycopg3/docs/api/connections.html) which can be used to execute SQL statements.

### 📝 `get_user_by_username`

In order to log in, the user must exist in the database. Update the `get_user_by_username` function to return a single user row containing all fields as a `UserInDB` where the username equals the username passed to the function. If no user is found, return `None`.

_Hint: You can convert an object or dict to a `UserInDB` with `UserInDB.parse_obj`._

<details> 
<br>
<summary>✅ Solution</summary>

```python
@manager.user_loader(conn_provider=get_db)
def get_user_by_username(
    username,
    db: Optional[Connection] = None,
    conn_provider: Callable[[], Iterator[Connection]] = None,
) -> Optional[UserInDB]:
    """
    Queries the database for a user with the given name
    Args:
        name: The name of the user
        db: The currently active database connection
        conn_provider: Optional method to retrieve a connection if db is None (provided by our LoginManager)
    Returns:
        The user object or none
    """
    if db is None and conn_provider is None:
        raise ValueError("db and conn_provider cannot both be None.")

    if db is None:
        db = next(conn_provider())

    result = db.execute(
        "SELECT * FROM users WHERE username = %s;", (username,)
    ).fetchone()
    if result is None:
        return result
    user = UserInDB.parse_obj(result)
    return user
```

</details>

### 📝 `create_user`

When someone registers, a new row is inserted into the users table. Update `create_user` to create a new user using the `newUser` object passed to the function. The password has been hashed for you. Return the new row (with the newly generated id) as a User object.

<details> 
<br>
<summary>✅ Solution</summary>

```python
def create_user(newUser: UserRegister, db: Connection) -> User:
    password_hash = hash_password(newUser.password)
    id = db.execute(
        """
        INSERT INTO users (username, password_hash, full_name)
        VALUES (%s, %s, %s)
        RETURNING id;
        """,
        (newUser.username, password_hash, newUser.full_name),
    ).fetchone()["id"]
    return User(id=id, username=newUser.username, full_name=newUser.full_name)
```

</details>

| [Back](part-4.md) | [Next](part-6.md) |
| ----------------- | ----------------- |
