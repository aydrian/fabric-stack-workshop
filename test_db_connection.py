import os
import psycopg

pg_conn_string = os.environ["DATABASE_URL"]

# Test Psycopg
conn = psycopg.connect(pg_conn_string)
res =  conn.execute("SELECT now()").fetchall()
conn.commit()
print(res)