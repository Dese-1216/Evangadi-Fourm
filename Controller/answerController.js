const mysqlconnection = require("../db/dbconfig");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");

//post answer
const postAnswer = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { userid, questionid, answer } = req.body;

  // Error Handling for missing answers ---
  if (!answer || !questionid) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error("Question ID and answer text are required.");
  }

  // Check if the question exists
  const [questionRows] = await mysqlconnection.query(
    "SELECT questionid FROM questions WHERE questionid = ?",
    [questionid]
  );

  if (questionRows.length === 0) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error("Question not found with the provided ID.");
  }

  try {
    // SQL query to insert the new answer
    const insertQuery = `INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)`;

    const [result] = await mysqlconnection.query(insertQuery, [
      userid,
      questionid,
      answer,
    ]);

    //  Response Handling (201 Created) ---
    if (result.affectedRows === 1) {
      res.status(StatusCodes.CREATED).json({
        message: "Answer submitted successfully",
        answer: {
          answerid: result.insertId,
          userid: userid,
          questionid: questionid,
          answer: answer,
        },
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      throw new Error("Failed to save the answer in the database.");
    }
  } catch (error) {
    // If a foreign key constraint fails (though covered by the check above)  or another DB error occurs.
    console.error("Database error while posting answer:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    throw new Error("Server error while saving answer.");
  }
});

// Get Answer

const getanswer = async (req, res) => {
  const { question_id } = req.params;

  try {
    const readAnswers = `
    SELECT 
      answers.answerid AS answer_id,
      answers.answer AS content,
      users.username AS user_name,
      answers.created_at
    FROM answers
    LEFT JOIN users ON answers.userid = users.userid
    WHERE answers.questionid = ?
  `;

    const [answers] = await mysqlconnection.query(readAnswers, [question_id]);

    if (answers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found.",
      });
    }

    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.error("Error fetching answers:", error.stack);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

module.exports = { postAnswer, getanswer };
