const express = require("express");
const app = express();
const port = 5000;
require("dotenv").config(); // load env variables

//db connection
const dbConnection = require("./db/dbconfig")

//user routes
const userRoutes = require("./Routes/userRoutes")


//json midleware
app.use(express.json())

//user routes

app.use("/api/user", userRoutes)

// Simple route to test
app.get("/", (req, res) => {
  res.send(`<h1>Response is sent successfully</h1>`);
});

// Listen on port
app.listen(port, () => {
  console.log(`Server running on port ${port},http://localhost:5000`);
});
