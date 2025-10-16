#!/bin/sh
CWD=$(pwd)
. ./.env

# Since the test script requires that certain users not be defined, we delete them here
docker exec -it chat-postgres-1 psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c "DELETE FROM users WHERE username='username' AND email='username@email.com';"

cd ${CWD}/backend/tests/
npx jest
