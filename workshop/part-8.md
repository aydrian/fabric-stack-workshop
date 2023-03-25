# Part 8: Delete a User

## Objectives

- Learn SQL: Use the `DELETE` statement to remove a row from the ussers table

### Exercise: `delete_user`

The Admin Page allows you to delete users by removing their row from the `users` table. Update `delete_user` to delete the row from the `users` table where the `id` matches the `users_id` passed to the function.

<details> 
<br>
<summary>Solution</summary>

```python
def delete_user(user_id: str, db: Connection):
    db.execute("DELETE FROM users WHERE id=%s", (user_id,))
    return
```

</details>

| [Back](part-7.md) | [Next](part-9.md) |
| ----------------- | ----------------- |
