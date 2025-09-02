const express = require('express')
const app = express()
require("dotenv").config()
require("./config/db")
const taskRouter = require("./Routes/task.route")
const bodyParser = require('body-parser')
const UserRouter = require("./Routes/user.route")
const cors = require('cors')


const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("hello i am working")
})
app.use(cors())
app.use(bodyParser.json())
app.use("/task",taskRouter)
app.use("/user",UserRouter)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})