require('dotenv').config({ path: "../../.env" });
const host = `${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}`;

const params = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

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
});


test("login w/ non-existant user", async () => {
  params.body = '{ "username": "username", "password": "password" }';
  const res = await fetch(`${host}/users/login`, params);
  expect(res.status).toBe(403);
});


test("signup w/ valid params", async () => {
  params.body = '{ "username": "username", "password": "password" }';
  const res = await fetch(`${host}/users/signup`, params);
  expect(res.status).toBe(200);
});


test("signup w/ duplicate user", async () => {
  params.body = '{ "username": "username", "password": "password" }';
  const res = await fetch(`${host}/users/signup`, params);
  expect(res.status).toBe(422);
});


test("login w/ valid user", async () => {
  params.body = '{ "username": "username", "password": "password" }';
  const res = await fetch(`${host}/users/login`, params);
  expect(res.status).toBe(200);
});
