# Part 7: Support Admin Users

## Objectives

- Learn SQL:

  - Use the `ALTER TABLE` statement to add a new column to the users table
  - Use the `SELECT` statement to list all users with a limited set of columns

### Exercise: Add `is_admin` column to `users` table

This application only has 2 roles, each user either has admin privileges or doesn't. Let's alter the table and add a boolean `is_admin` column to track who can access the admin page. It's probably a good idea to default everyone to being a regular user.

Use your CockroachDB SQL Shell (`ccloud cluster sql`) to modify your users table.

<details> 
<br>
<summary>Solution</summary>

```SQL
ALTER TABLE users
  ADD COLUMN is_admin BOOL NOT NULL DEFAULT false;
```

</details>

### Exercise: `get_users`

The admin page lists all the users in the `users` table by issuing a `GET` request to the `/users` route which calls the `get_users` function. Update the function to query all users rows returning only the id, username, full_name, and is_admin columns. The function should return a list of User objects.

<details> 
<br>
<summary>Solution</summary>

```python
def get_users(db: Connection) -> list[User]:
    results = db.execute(
        """
        SELECT id, username, full_name, is_admin
        FROM users;
    """
    ).fetchall()
    users = [User.parse_obj(item) for item in results if item is not None]
    return users
```

</details>

| [Back](part-6.md) | [Next](part-8.md) |
| ----------------- | ----------------- |
