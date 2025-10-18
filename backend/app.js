import express from "express";
import "dotenv/config";

import { usersRouter } from "./routers/users_router.js";
import { pool } from "./db.js";

const app = express();


app.use(express.json());
app.use("/", (req, res, next) => {
  console.log(`${req.method} -> ${req.originalUrl}`);
  next();
})

app.use("/users", usersRouter);
app.listen(process.env.BACKEND_PORT, (err) => {
  if (err) console.error(`Unable to connect: ${err}`);
  else console.log(`Connected to port ${process.env.BACKEND_PORT}.`);
});
