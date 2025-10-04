const dbconnection=require('../db/dbconfig')
const bcrypt=require('bcrypt')
const {StatusCodes}=require('http-status-codes')

async function userRegister(req,res){
   const{userName,firstName,lastName,email,password}=req.body
   if(!userName||!firstName||!lastName||!email||!password){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"please provide required information"})
   }
   try {
     const[user]=await dbconnection.query("select username,userid from users where username=? or email =?",[userName,email])


     if(user.length>0){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"user already registred"})
     }
     if(password.length<=8){
         return res.status(StatusCodes.BAD_REQUEST).json({msg:"the password must atleast 8 characters"})

     }

     const salt=await bcrypt.genSalt(10)

     const hashPassword=await bcrypt.hash(password,salt)




      await dbconnection.query("INSERT INTO users(username,firstname,lastname,email,password) VALUES(?,?,?,?,?) ",[userName,firstName,lastName,email,hashPassword])
      return res.status(StatusCodes.CREATED).json({msg:"user cerated"})
    
   } catch (error) {
    console.log(error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"someting is wrong :try again"})

    
   }
}

module.exports={userRegister}