import { Router } from "express";

export const usersRouter = Router();

usersRouter.post("/login", async (req, res) => {
  return res
    .status(200)
    .json({ response: `Welcome Back ${req.body.username}.` });
});

usersRouter.post("/signup", async (req, res) => {
  return res
    .status(200)
    .json({ response: `Welcome ${req.body.username}.` });
});
