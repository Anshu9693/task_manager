const mongoose = require("mongoose")
const db_URL = process.env.DB_URL

mongoose.connect(db_URL).then(()=>{
    console.log("DB connected successfully")
    console.log(`${process.env.DB_URL} Database connected`)
}).catch((err)=>{
    console.log("DB Error " + err)
})