const express = require("express")
const mongoConnection = require("./Config/mongo.js")
const cors = require("cors")
const userRouter = require("./Route/user.js")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Api is working!!');
})

app.use("/user" , userRouter)

app.listen(8000 , () => {
    mongoConnection()
    console.log("Port Connected")
})