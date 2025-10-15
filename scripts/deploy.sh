#!/bin/sh
docker compose up --build -d
./scripts/test.sh
