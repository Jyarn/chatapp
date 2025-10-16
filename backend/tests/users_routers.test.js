require('dotenv').config({ path: "../../.env" });
const host = `${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}`;

let params;

beforeEach(() => {
  params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
})

test("login w/ missing params", async () => {
  params.body = "{ }";
  let res = await fetch(`${host}/users/login`, params);
  expect(res.status).toBe(400);

  params.body = '{ "password": "password" }';
  res = await fetch(`${host}/users/login`, params);
  expect(res.status).toBe(400);

  params.body = '{ "username": "username" }'
  res = await fetch(`${host}/users/login`, params);
  expect(res.status).toBe(400);

  params.body = '{ "email": "username@email.com" }';
  res = await fetch(`${host}/users/login`, params);
  expect(res.status).toBe(400);

  params.body = '{ "username": "username", "password": "password", "email": "email" }';
  res = await fetch(`${host}/users/login`, params);
  expect(res.status).toBe(400);
});


test("signup w/ invalid params", async () => {
  params.body = "{ }";
  let res = await fetch(`${host}/users/signup`, params);
  expect(res.status).toBe(400);

  params.body = '{ "password": "password" }';
  res = await fetch(`${host}/users/signup`, params);
  expect(res.status).toBe(400);

  params.body = '{ "username": "username" }'
  res = await fetch(`${host}/users/signup`, params);
  expect(res.status).toBe(400);

  params.body = '{ "email": "username@email.com" }';
  res = await fetch(`${host}/users/signup`, params);
  expect(res.status).toBe(400);

  params.body = '{ "username": "username", "password": "password", "email": "email" }';
  res = await fetch(`${host}/users/signup`, params);
  expect(res.status).toBe(400);
});


test("login w/ non-existant user", async () => {
  params.body = '{ "username": "username", "password": "password", "email": "username@email.com"}';
  const res = await fetch(`${host}/users/login`, params);
  expect(res.status).toBe(403);
});


test("signup w/ valid params", async () => {
  params.body = '{ "username": "username", "password": "password", "email": "username@email.com"}';
  const res = await fetch(`${host}/users/signup`, params);
  expect(res.status).toBe(200);
});


test("signup w/ duplicate user", async () => {
  params.body = '{ "username": "usernamee", "password": "password", "email": "username@email.com"}';
  let res = await fetch(`${host}/users/signup`, params);
  expect(res.status).toBe(422);

  params.body = '{ "username": "username", "password": "password", "email": "usernamee@email.com"}';
  res = await fetch(`${host}/users/signup`, params);
  expect(res.status).toBe(422);

  params.body = '{ "username": "username", "password": "password", "email": "username@email.com"}';
  res = await fetch(`${host}/users/signup`, params);
  expect(res.status).toBe(422);
});


test("login w/ valid user", async () => {
  params.body = '{ "username": "username", "password": "password", "email": "username@email.com"}';
  const res = await fetch(`${host}/users/login`, params);
  expect(res.status).toBe(200);
});
