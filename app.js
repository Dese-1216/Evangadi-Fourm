const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();
//import db
const mysqlconnection = require("./db/dbconfig")
const answerRoutes = require("./Routes/answerRoutes");
 const userRoutes = require("./Routes/userRoutes"); 
const questionRoutes = require("./Routes/questionRoute");
app.use(cors());
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", questionRoutes);
app.use("/api/answer", answerRoutes); 
app.use("/api/user", userRoutes);  

// Simple route to test
app.get("/", (req, res) => {
  res.send(`<h1>Response is sent successfully</h1>`);
});

//connection test

const start = async () => {
  try {
    const result = await mysqlconnection.execute("select 'test'");
     
    await app.listen(port);
    console.log("database successfully established");
  } catch (err) {
    console.log(err.message);
  }
};
start();

// app.listen(port, (err) => {
//   console.log("connected http://localhost:5000");
// })
