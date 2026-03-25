#!/usr/bin/env bash

set -e
set -o pipefail

# Safely source .env file with validation
if [ ! -f "$PWD/.env" ]; then
  echo "Error: .env file not found at $PWD/.env"
  exit 1
fi

# Check if .env is readable
if [ ! -r "$PWD/.env" ]; then
  echo "Error: .env file is not readable"
  exit 1
fi

# Source the .env file
source "$PWD/.env"

# Validate required environment variables
if [ -z "$PROJECT_NAME" ]; then
  echo "Error: PROJECT_NAME not set in .env"
  exit 1
fi

if [ -z "$PROJECT_PATH" ]; then
  echo "Error: PROJECT_PATH not set in .env"
  exit 1
fi

DCP="docker compose -p $PROJECT_NAME --file=$PROJECT_PATH$PROJECT_NAME/current/docker-compose.yaml --env-file=$PROJECT_PATH$PROJECT_NAME/current/.env"

# Zero-downtime deployment: build, update, and remove old containers
$DCP up -d --build --remove-orphans

# additional steps
