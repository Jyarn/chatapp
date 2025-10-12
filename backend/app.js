import express from "express";

const app = express();

app.use(express.static("../frontend/"));

const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) console.error(`Unable to connect: ${err}`);
  else console.log(`Connected to port ${PORT}.`);
})
