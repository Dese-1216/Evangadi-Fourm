const dbConnection = require("../db/dbconfig")
const bcrypt = require('bcrypt');
// const {statuscodes}= require('http-status-code')


async function register(req, res) {
    const { username, firstname, lastname, email, password } = req.body;
    if (!email || !password || !firstname || !lastname || !username) {
        return res.status(400).json({
            msg: "please provide all required information!"
        })
    }
    try {

        const [user] = await dbConnection.query("select username,userid From users where username=?or email=?", [username, email])
        if (user.length > 0) {
            return res.status(400).json({ msg: "user already registerd" })
        }
        if (password.length < 8) {
            return res.status(400).json({ msg: "password must be at least 8 character" })

        }

        //encrypt password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)


        // return res.json({ user: user })


        await dbConnection.query(
            "INSERT INTO USERS(username,firstname,lastname,email,password) VALUES(?,?,?,?,?)", [username, firstname, lastname, email, hashedpassword]
        )
        return res.status(201).json({ msg: "'user registerd" })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ msg: "somthing went wrong,try again!" })
    }


}
module.exports = { register }