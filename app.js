const express = require("express");
const router = require("./Routes/userRoutes");
const app = express();
const port = 5000;
require("dotenv").config(); // load env variables

app.use(express.json()); // to parse json body

// Simple route to test
app.get("/", (req, res) => {
  res.send(`<h1>Response is sent successfully</h1>`);
});

app.use("/api/user", router);


// Listen on port
app.listen(port, () => {
  console.log(`Server running on port ${port},http://localhost:5000`);
});

