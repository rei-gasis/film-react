import express from "express";
import cors from "cors";
import "./loadEnv.mjs"; //@TODO
import reviews from "./routes/reviews.mjs";
import users from "./routes/users.mjs";


const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //for x-www-form-urlencoded

app.use("/api/reviews", reviews); //base URL for reviews
app.use("/api/users", users); //base URL for reviews
// app.use("/movies", movies); 

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  
  
});