const express = require("express");
const router = express.Router();
const {
  getAllQuestions,
  askQuestion,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  // askgpt, // <--- Comment this out: We are no longer exporting or using askgpt from the controller
} = require("../Controller/questionController");


//crud
// post question
router.post("/ask-question", askQuestion);
// get all questions
router.get("/all-questions", getAllQuestions);
// get single question
router.get("/question", getSingleQuestion);
//edit question
router.put("/question/:questionid", editQuestion);
//delete question
router.delete("/question/:questionid", deleteQuestion);

// --- START OpenAI-related route to comment out or remove ---
// This route handler was for the askgpt function.
// Since we've disabled askgpt in the controller, this route should also be commented out.
// router.post("/", askgpt);
// --- END OpenAI-related route ---

module.exports = router;