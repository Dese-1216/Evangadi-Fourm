const mysqlconnection = require("../db/dbconfig");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 
//register 
const register = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  // console.log(req.body);
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all information" });
  }
  try {
    const [user] = await mysqlconnection.query(
      "SELECT username,userid from Users where username=? or email=?",
      [username, email]
    );
    // console.log(user);
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already registered" });
    }
    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 characters" });
    }
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    await mysqlconnection.query(
      "INSERT INTO Users (username,firstname,lastname,email,password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedpassword]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "user register" });
  } catch (err) {
    console.log(err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred,'something went wrong'" });
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "please enter all required fields",
    });
  }

  try {
    const [user] = await mysqlconnection.query(
      "SELECT username,userid,password from Users where email = ? ",
      [email]
    );
    // console.log(user);

    if (user.length == 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "invalid credential",
      });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }
    // res.json({ msg: "successfully login" });
    //  res.json({ user:user });

    //create jwt token
    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(StatusCodes.OK).json({ msg: "user login successfully", token });
  } catch (err) {
    console.log(err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred,'something went wrong'" });
  }
};

//check user
const checkuser = async (req, res) => {
  username = req.user.username;
  userid = req.user.userid;
  res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
};

// Inside postQuestion in Controller/userController.js


// for the singleget question from  ELA 
async function getSingleQuestion(req, res) {
  try {
    const questionId = req.params.question_id; // Use 'questionid' from your schema

    // Validate questionid (should be a string, but ensure it's provided)
    if (!questionId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Question ID is required' });
    }

    const [results] = await mysqlconnection.query(
      'SELECT q.questionid, q.title, q.description, q.tag, u.username ' +
      'FROM questions q ' +
      'JOIN users u ON q.userid = u.userid ' +
      'WHERE q.questionid = ?',
      [questionId]
    );

    if (results.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Question not found' });
    }

    res.status(StatusCodes.OK).json(results[0]);
  } catch (error) {
    console.error('Error in getSingleQuestion:', error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong, try again later!' });
  }
 
}



module.exports = { register, checkuser, login ,getSingleQuestion};
