//using dotenv package to link to env variables
//to this project
require("dotenv").config();
//importing modules
const express = require("express")
const mongoose = require("mongoose")

//importing files
const userRoutes = require("./routes/userRoutes");
const { errorResponse } = require("./utils/responseRouter");

//required env variables
const MONGO_DB = process.env.MONGO_DB_DATABASE_URL;
const PORT = process.env.PORT

//initializing express app
const app = express()

//this ensures that complex data structures(extended) can be present in
//the req and can be used by accessing the req.body(urlencoded)
app.use(express.urlencoded({extended: true}))
//if it would have been false only single line query strings would 
//have been accepted from the url

app.use(express.json()); // Use the express.json() middleware
//without this middleware express app couldn't interpret json requests

//all routes urlS
//using jwt for authentication and
//bcryptjs for hashing the passwords
app.use("/users", userRoutes)


//If no routes are matched
app.all("*", (req, res) => {
  return errorResponse(res, 400, "The Request Route that you are trying to access is not Available!!!", "Bad Request");
});


//using mongoose package to connect to mongo db cluster
mongoose
  .connect(
    MONGO_DB,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("Successfully Connected to Mongo DB Cluster")
      console.log(`Server is running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB Connnection Error!!");
    console.log(err);
  });