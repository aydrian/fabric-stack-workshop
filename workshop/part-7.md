# Part 7: Support Admin Users

## 💡 Objectives

- Learn SQL:

  - Use the `ALTER TABLE` statement to add a new column to the users table
  - Use the `SELECT` statement to list all users with a limited set of columns

## ℹ️ [`ALTER TABLE`](https://www.cockroachlabs.com/docs/stable/alter-table.html)

To change the definition of a table, use the `ALTER TABLE` followed by the table name and any [subcommands](https://www.cockroachlabs.com/docs/stable/alter-table.html#subcommands) to add/remove/change constraints, keys, columns, and more.

**Examples**

```SQL
/* Rename Table */
ALTER TABLE dogs
  RENAME TO good_dogs;

/* Remove Column */
ALTER TABLE good_dogs
  DROP COLUMN favorite_treat;

/* Add Unique Constraint */
ALTER TABLE good_dogs
  ADD CONSTRAINT name_owner_unique UNIQUE (name, owner);
```

[More examples](https://www.cockroachlabs.com/docs/stable/alter-table.html#examples) are available in the CockroachDB Documentation.

## 🧑‍💻 Exercises

### 📝 Add `is_admin` column to `users` table

This application only has 2 roles, each user either has admin privileges or doesn't. Let's alter the table and add a boolean `is_admin` column to track who can access the admin page. It's probably a good idea to default everyone to being a regular user.

Use your Cockroach SQL shell (`./cli.sh`) to execute an `ALTER TABLE` statement to modify your users table.

<details> 
<br>
<summary>✅ Solution</summary>

```SQL
ALTER TABLE users
  ADD COLUMN is_admin BOOL NOT NULL DEFAULT false;
```

</details>

### 📝 `get_users`

The admin page lists all the users in the `users` table by issuing a `GET` request to the `/users` route which calls the `get_users` function. Update the function to query all users rows returning only the `id`, `username`, `full_name`, and `is_admin` columns. The function should return a list of User objects.

<details> 
<br>
<summary>✅ Solution</summary>

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
