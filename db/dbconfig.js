const mysql2 = require("mysql2");
// require("dotenv").config();

// const dbconnection = mysql2.createPool({
//   user: process.env.DB_USER,
//   database: process.env.DB_DATABASE,
//   host: process.env.DB_HOST,
//   password: process.env.DB_PASSWORD,
 
// });

const dbconnection=mysql2.createPool({
    user:"Eyobs",
    database:"evangadi-forum-practice",
    password:"87654321",
    host:"localhost",
    port:"8889"
    

})



module.exports = dbconnection.promise();

