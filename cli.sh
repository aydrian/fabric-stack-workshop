#!/bin/sh

if [ ! -f "cockroach-sql" ]; then
    curl https://binaries.cockroachdb.com/cockroach-sql-v22.2.7.linux-amd64.tgz | tar -xz
    mv ./cockroach-sql-v22.2.7.linux-amd64/cockroach-sql ./cockroach-sql
    rm -rf ./cockroach-sql-v22.2.7.linux-amd64
fi

./cockroach-sql --url $DATABASE_URL