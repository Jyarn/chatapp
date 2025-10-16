#!/bin/sh

# Since the test script requires that certain users not be defined we delete them here
echo $(pwd)
. ./.env

POSTGRES=chat-postgres-1

docker exec -it ${POSTGRES} psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -c "DELETE FROM users WHERE username=username AND email=username@email.com;"
