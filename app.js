const express=require("express")

const app=express()
const port=5600
const userRoute=require('./Routes/userRoutes')
const dbconnection=require('./db/dbconfig')

app.use(express.json())

app.use('/api/user' ,userRoute)



async function start() {
  try {
    const result=await  dbconnection.execute("select 'connected`' ")
    await app.listen(port)
    console.log("database estalished");
     console.log(`connected on port ${port}`);
   

    
  } catch (err) {
    console.log(err.message);
    
  }    
}

start()



