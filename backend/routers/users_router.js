import { Router } from "express";

import bcrypt from "bcrypt";

export const usersRouter = Router();

const users = new Map();
const SALT_ROUNDS = 10;

function isValidString(str) {
  return str && typeof str === "string" && str !== '';
}

usersRouter.post("/login", async (req, res) => {
  if (!isValidString(req.body.username) && !isValidString(req.body.password))
    return res.status(400).json({ error: "Missing username or password." });

  const userPassword = users.get(req.body.username);
  if (!userPassword || !bcrypt.compareSync(req.body.password, userPassword))
    return res.status(403).json({ error: "Incorrect login." });

  return res.status(200).json({ response: `Welcome Back ${req.body.username}.`})
});

usersRouter.post("/signup", async (req, res) => {
  if (!isValidString(req.body.username) && !isValidString(req.body.password))
    return res.status(400).json({ error: "Missing username or password." });
  else if (users.get(req.body.username))
    return res.status(422).json({ error: "User already exists." });

  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  users.set(req.body.username, hashedPassword);

  return res.status(200).json({ response: `Welcome ${req.body.username}.` });
});
