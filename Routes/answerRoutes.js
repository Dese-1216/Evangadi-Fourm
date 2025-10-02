const express=require("express")
const router=express.Router();

//controler
const {getanswer}=require("../Controller/answerController")

router.get("/getanswer",getanswer)



module.exports=router