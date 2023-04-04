#!/bin/sh

## Build the frontend if it doesn't exist
if [ ! -d "./frontend/build" ] 
then
    echo "Directory /frontend/build DOES NOT exists." 
    cd frontend
    npm install 
    npm run build
    cd - > /dev/null
fi

cd backend
poetry install
poetry run python backend/main.py
