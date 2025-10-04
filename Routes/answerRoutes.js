const express = require("express");
const router = express.Router();
const { postAnswer, getanswer } = require("../Controller/answerController");

// GET /api/answer/:question_id
router.get("/:question_id", getanswer);

// router.post('/answer').post( postAnswer);
router.post("/", postAnswer);

module.exports = router;
