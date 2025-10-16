CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(32) NOT NULL UNIQUE,
  email VARCHAR(32) NOT NULL UNIQUE,
  password TEXT NOT NULL
  CHECK(username != '' AND email != '' AND password != '')
);
