#!/usr/bin/env bash
set -euo pipefail

# Bring the DB up in detached mode
docker compose up -d db

# Wait until the health-check reports "healthy"
echo "Waiting for PostgreSQL to become healthy..."
attempts=0
max_attempts=60
until docker compose exec -T db pg_isready -U postgres -d portfolio > /dev/null 2>&1; do
  attempts=$((attempts + 1))
  if [ "$attempts" -ge "$max_attempts" ]; then
    echo "PostgreSQL did not become ready within ${max_attempts}s." >&2
    docker compose ps db >&2 || true
    exit 1
  fi
  sleep 1
done
echo "PostgreSQL is ready."

# Run Prisma migration
npx prisma migrate dev --name init
