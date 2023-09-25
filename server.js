//using dotenv package to link to env variables
//to this project
require("dotenv").config();
//importing modules
const express = require("express")
const mongoose = require("mongoose")

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

//all routes urlS
// app.use("/users",userRoutes)

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