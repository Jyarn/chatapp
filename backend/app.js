import express from "express";
import "dotenv/config";

import { usersRouter } from "./routers/users_router.js";

const app = express();

app.use(express.json());

app.use("/users", usersRouter);

app.listen(process.env.BACKEND_PORT, (err) => {
  if (err) console.error(`Unable to connect: ${err}`);
  else console.log(`Connected to port ${process.env.BACKEND_PORT}.`);
})
