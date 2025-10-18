import jwt from "jsonwebtoken";

import { isValidString } from "./utils.js";

export function isAuth(req, res, next) {
  const authHeader = req.get("authorization");

  if (!isValidString(authHeader))
    return res.status(400).json({ error: "Invalid." });

  const [tokenType, token]= authHeader.split(' ');

  if (tokenType !== "bearer_jwt" || !isValidString(token))
    return res.status(400).json({ error: "Invalid." });

  try {
    const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
    req.jwt = decodedJwt;
    return next();

  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: "Forbidden." });
  }
}
