const express=require('express')
const { default: mongoose } = require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
require('./Models/db')
const AuthRouter=require('./Routes/AuthRouter')


const app=express()


// for connceting mongoose
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB is connected.....")
}).catch((err)=>{
    console.log("MongoDB connection err",err)
})


// Body-parser
app.use(bodyParser.json())
// cors
app.use(cors())


app.get("/ping",(req,res)=>{
    res.send("PONG")
})

app.use('/auth',AuthRouter)

const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})

