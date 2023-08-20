import express from "express";
import db from "../conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
const DB_COLLECTION = "UserReview"

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection(DB_COLLECTION);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.post("/post-review", async (req, res) => {
  let collection = await db.collection(DB_COLLECTION);
  let newDocument = req.body;
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


router.get("/:user", async (req, res) => {
  let collection = await db.collection(DB_COLLECTION);
  console.log(req.params.user)
  let results = await collection.find({user: req.params.user}).toArray();
  if(results.length > 0)
    res.send(results).status(200);
  else
    res.send({"message": "No reviews found"}).status(400);
});
// // This section will help you get a single record by id
// router.get("/:id", async (req, res) => {
//   let collection = await db.collection("records");
//   let query = {_id: new ObjectId(req.params.id)};
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // This section will help you create a new record.
// router.post("/", async (req, res) => {
//   let newDocument = {
//     name: req.body.name,
//     position: req.body.position,
//     level: req.body.level,
//   };
//   let collection = await db.collection("records");
//   let result = await collection.insertOne(newDocument);
//   res.send(result).status(204);
// });

// // This section will help you update a record by id.
// router.patch("/:id", async (req, res) => {
//   const query = { _id: new ObjectId(req.params.id) };
//   const updates =  {
//     $set: {
//       name: req.body.name,
//       position: req.body.position,
//       level: req.body.level
//     }
//   };

//   let collection = await db.collection("records");
//   let result = await collection.updateOne(query, updates);

//   res.send(result).status(200);
// });

// // This section will help you delete a record
// router.delete("/:id", async (req, res) => {
//   const query = { _id: new ObjectId(req.params.id) };

//   const collection = db.collection("records");
//   let result = await collection.deleteOne(query);

//   res.send(result).status(200);
// });

export default router;