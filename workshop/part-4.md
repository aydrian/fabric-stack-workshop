# Part 4: Prepare the database

## Objectives

- Learn SQL: Use the `CREATE` statement to build your database schema
- Understand how to store passwords in a database
- Import data from a CSV file

### Excerise: Create a `users` table

Using the CockroachDB SQL Shell (`ccloud cluster sql`), crate a new table that matches the Entity Relationaship diagram below. All fields should be required.

```mermaid
erDiagram
  users {
    uuid id PK "DEFAULT gen_random_uuid()"
    string username
    string full_name
    string password_hash
  }
```

<details> 
<br>
<summary>Solution</summary>

```SQL
CREATE TABLE users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username STRING NOT NULL,
  password_hash STRING NOT NULL,
  full_name STRING NOT NULL,
);
```

</details>

### Exercise: Import Mock Data from a CSV file

Now that we have a `users` tables, let's fill it by importing some mock data from a CSV file. Use the CockroachDB SQL Shell from the previous exercise.

```SQL
IMPORT INTO users (username, full_name, password_hash)
  CSV DATA (
      'https://raw.githubusercontent.com/aydrian/fabric-stack/main/workshop/assets/mock_data.csv'
  )
  WITH
    skip='1';
```

> **Note**
> You can import from a local file using [Userfile Storage](https://www.cockroachlabs.com/docs/v22.2/use-userfile-storage)

Once that is complete, query all the data from the `users` table.

```SQL
SELECT * FROM users;
```

| [Back](part-3.md) | [Next](part-5.md) |
| ----------------- | ----------------- |
