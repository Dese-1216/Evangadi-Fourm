const {StatusCodes}=require("http-status-codes");
const dbConnection=require("../db/dbconfig")

async function getanswer(req, res) {
  const questionid = req.query.questionid || 'default_value'; 
//   console.log(req.query)

  try {
    const readAnswers= `SELECT answers.*,Users.username FROM answers LEFT JOIN Users ON answers.userid = Users.userid where answers.questionid=?`
    const [answers] = await dbConnection.query(
     readAnswers,
      [questionid]
    );

    if (answers.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No answers found for this question" });
    }

    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.error("Error fetching answers:", error.stack);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}module.exports={getanswer}