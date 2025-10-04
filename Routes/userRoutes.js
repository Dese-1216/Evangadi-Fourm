const express = require("express");
const router = express.Router();
const {userRegister} = require("../Controller/userController");

router.post("/register", userRegister);


module.exports = router;
