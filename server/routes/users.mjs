import express from "express";
import db from "../conn.mjs";
// import { ObjectId } from "mongodb";

import jwt from "jsonwebtoken";

const router = express.Router();
const DB_COLLECTION = "User";

// const auth = require("../auth");

// This section will help you get a list of all the records.
router.get("/all", async (req, res) => {
  let collection = await db.collection(DB_COLLECTION);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.post("/auth", async (req, res) => {
  const { username, password } = req.body;

  let collection = await db.collection(DB_COLLECTION);
  // let query = {username: req.body.username,  password: req.body.password, }
  let query = { username: username, password: password };
  let result = await collection.findOne(query);

  //jwt
  const token = generateAccessToken({ username: req.body.username });

  if (!result || result == null) {
    res.status(400).send({ message: "Not Found" });
  } else {
    res
      .status(200)
      .send({ token: token, name: result?.name, username: result?.username });
  }
});

function generateAccessToken(username) {
  const expiry = 600; // in secs

  return {
    token: jwt.sign(username, process.env.JWT_SECRET, {
      expiresIn: expiry || "s",
    }),
    expiry: expiry,
  };
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("authHeader", authHeader);

  if (token == null) return res.status(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.status(403);

    req.user = user;

    next();
  });
}

export default router;
