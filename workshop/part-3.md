# Part 3: Exploring the Application

## 💡 Objectives

- Quick intro to SQL
- Quick intro to PsycoPG 3
- Starting the backend and frontend applications
- Experience the application features using mocked data

For this workshop, we will use a starter FAbRiC stack application to teach you a core set of SQL statements and how to use them with PsycoPG 3, a PostgreSQL adapter for Python. The application allows a user to register, login, perform some basic and admin functions. It consists of a FastAPI Python backend and a React frontend. Mock data has been provided to allow the application to be functional from the start. Over the course of this workshop, we'll swap out the mocked functions with calls to the database. But first, let us start with a couple short introductions.

## 🔍 Intro to SQL

As we complete each excercise we'll learn how to use each of the following SQL statements.

- CREATE TABLE
- INSERT INTO
- SELECT
- UPDATE
- ALTER TABLE
- DELETE FROM

There is a full [Learn CockroachDB SQL](https://www.cockroachlabs.com/docs/cockroachcloud/learn-cockroachdb-sql.html) tutorial located in the docs. [More in depth documentation](https://www.cockroachlabs.com/docs/stable/sql-statements.html) is available and can be used as reference.

## 🐍 Intro to PsycoPG 3

[PsycoPG 3](https://www.psycopg.org/psycopg3/) is a Python library used to connect to a Postgres compatible database (i.e. CockroachDB).

Here is some boilerplate code for setting up PsycoPG.

```python
import os
import psycopg

# read the pg connection string from the environment variable
pg_conn_string = os.environ["DATABASE_URL"]

# Connect to an existing database
with psycopg.connect(pg_conn_string) as conn:

    # Open a cursor to perform database operations
    with conn.cursor() as cur:

        # Execute a command: this creates a new table
        cur.execute("""
            CREATE TABLE test (
                id serial PRIMARY KEY,
                num integer,
                data text)
            """)

        # Pass data to fill a query placeholders and let Psycopg perform
        # the correct conversion (no SQL injections!)
        cur.execute(
            "INSERT INTO test (num, data) VALUES (%s, %s)",
            (100, "abc'def"))

        # Query the database and obtain data as Python objects.
        cur.execute("SELECT * FROM test").fetchone()
        # will return (1, 100, "abc'def")

        # You can use `cur.fetchmany()`, `cur.fetchall()` to return a list
        # of several records, or even iterate on the cursor
        for record in cur:
            print(record)

        # Make the changes to the database persistent
        conn.commit()
```

**Connection:** Use this to commit (”checkpoint”) your statements at the end of a transaction.

**Cursor:** Use to execute statements within a transaction.

**Transaction:** A series of SQL statements that you want to happen atomically.

There are two main ways to interact with the database.

**Querying Data**

```python
results = cursor.execute("SELECT * FROM programs").fetchall()
# print(results)
```

**Executing Statements**

```python
cursor.execute("INSERT INTO programs VALUES (1, 'ece')")
connection.commit()
```

You must `commit()` statements for them to be saved in the database.

**Transactions**

How it works is that every time you use `cursor.execute`, you aren’t actually executing something against the database and you aren’t changing the data. You can imagine that you are queueing or buffering the statements.

When you `commit()` all the queued up statements are executed on your data in order as one atomic unit. If there was any error with any of the statements, then **NONE** of the statements will have actually touched/affected your data in the database. If there were no errors (ie. success), then all of the statements will have ran against your real data in the database.

**Inserting Parameters**

You can pass data in Python variables safely into SQL using Psycopg parameters. Take a look at the example below.

```python
def add_course_with_params():
    cursor.execute(
        "INSERT INTO courses VALUES (default, %s, %s, %s, %s)",
        ("Algorithms", "341", 2, 1)
    )

def add_course_with_named_params():
    data = {
    'name': 'Programming for Performance',
        'name': 'Programming for Performance',
    'name': 'Programming for Performance',
    'code': '459',
        'code': '459',
    'code': '459',
    'program': 1,
    'credits': 1
    }
    cursor.execute("INSERT INTO courses VALUES (default, %(name)s, %(code)s, %(program)s, %(credits)s)", data)
```

You can also filter with parameters:

```python
cursor.execute("SELECT * FROM courses WHERE credits > %s", (0,))
```

> **Note**
> You are passing two arguments to `cursor.execute`. The first one is the SQL string and the 2nd is a tuple with parameters. Remember, if you have a single value in your tuple, add a **trailing comma**.

For more info about inserting parameters, see [Passing parameters to SQL queries](https://www.psycopg.org/psycopg3/docs/basic/params.html)

## ▶️ Run the App

Now that we have everything set up and our Repl configured. You can start the app by clicking the ▶ Run button at the top of your Repl.

The could take some time for the first run and after your Repl sleeps. It will check for the `DATABASE_URL` secret and CA Cert, install all the packages, and generate generate the frontend build folder (if needed). Please be patient. You can watch the progress in the Console.

The application is ready when see the following in the Console:

```shell
 INFO:     Will watch for changes in these directories: ['/home/runner/{Your Repl Name}/backend']
 INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
 INFO:     Started reloader process [4622] using WatchFiles
 INFO:     Started server process [4626]
 INFO:     Waiting for application startup.
 INFO:     Application startup complete.
```

A Webview tab will open and load the site. You can also grab the url from the Webview and open it in a new browser window or share it.

Take some time to explore the application. You can sign up for a new account or use one of the provided mock users. Every user has the same password: `password1234`. Use the `craig` username to see the admin functionality. Other users include:

- `spiderman`
- `antman`
- `wiccan`
- `hulkling`

> **Note**
> Currently nothing you do will persist after the server is restarted. If you create a new user, it will not be available the next time the server starts.

Once you have a good idea of what the application does, proceed to the next lesson.

| [Back](part-2.md) | [Next](part-4.md) |
| ----------------- | ----------------- |
