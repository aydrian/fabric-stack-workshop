#!/bin/sh

## Check for venv
if [ ! -d "$VIRTUAL_ENV" ]
then
  echo "Creating a Python Virtual Environment..."
  python3 -m venv $VIRTUAL_ENV
fi

## Check for DATABASE_URL env var
if [[ -z "${DATABASE_URL}" ]]
then
    echo "Please set the DATABASE_URL in Secrets to continue"
    exit 1
fi

## Check for CA cert
if [ ! -f "$HOME/.postgresql/root.crt" ]
then
    echo "Please download the CA Cert from Cockroach Cloud Connect Model"
    exit 1
fi

## Build the frontend if it doesn't exist
if [ ! -d "./frontend/build" ] 
then
    echo "Building the React front end..." 
    cd frontend
    npm install 
    npm run build
    cd - > /dev/null
fi

## Start FastAPI Server
cd backend
poetry install
python3 backend/main.py
