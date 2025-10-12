import express from "express";

import { usersRouter } from "./routers/users_router.js";

const app = express();

app.use(express.json());

app.use(express.static("../frontend/"));
app.use("/users", usersRouter);

const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) console.error(`Unable to connect: ${err}`);
  else console.log(`Connected to port ${PORT}.`);
})
