const express = require('express');
const router = express.Router()
//controler
const { register } = require('../Controller/userController')


//register//
router.post("/register", register)
module.exports = router