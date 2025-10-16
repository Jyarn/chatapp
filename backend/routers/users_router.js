import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import assert from "node:assert";

import { pool } from "../db.js";
import { isAuth } from "../middleware.js";
import { isValidString } from "../utils.js";

export const usersRouter = Router();

const SALT_ROUNDS = 10;

function issueToken(user) {
  assert(process.env.JWT_SECRET.length > 16);
  return jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

usersRouter.post("/login", async (req, res) => {
  if (!isValidString(req.body.username) ||
      !isValidString(req.body.password) ||
      !isValidString(req.body.email))
    return res.status(400).json({ error: "Missing username or password." });
  else if (!/\w+@\w+.(ca|com)/.test(req.body.email))
    return res.status(400).json({ error: "Invalid Email." });

  try {
    const queryResult= await pool.query(`
        SELECT user_id, password
        FROM users
        WHERE username=$1 AND email=$2
        LIMIT 1;
      `,
      [req.body.username, req.body.email]);

    if (queryResult.rows.length === 0 || !bcrypt.compareSync(req.body.password, queryResult.rows[0].password))
      return res.status(403).json({ error: "Incorrect login details." });

    return res.status(200).json({
      jwt: issueToken(queryResult.rows[0])
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error." });
  }
});


usersRouter.post("/signup", async (req, res) => {
  if (!isValidString(req.body.username) ||
      !isValidString(req.body.password) ||
      !isValidString(req.body.email))
    return res.status(400).json({ error: "Missing username or password." });
  else if (!/\w+@\w+.(ca|com)/.test(req.body.email))
    return res.status(400).json({ error: "Invalid email." });

  try {
    let queryResult = await pool.query(`
        SELECT *
        FROM users
        WHERE username=$1 OR email=$2
        LIMIT 1;
      `,
      [req.body.username, req.body.email]);

    if (queryResult.rows.length !== 0)
      return res.status(422).json({ error: "User already exists." });

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    queryResult = await pool.query(`
        INSERT INTO users (username, email, password)
        VALUES($1, $2, $3)
        RETURNING user_id;
      `,
      [req.body.username, req.body.email, hashedPassword]);

    return res.status(200).json({
      jwt: issueToken(queryResult.rows[0])
    });

  } catch (err){
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error." });
  }
});
