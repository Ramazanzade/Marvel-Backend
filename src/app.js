const express=require('express')
const { CONNECTION_STRING}=require('./confing')
const {mongoose}= require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config();
const UserRouter = require('./api/routers/userrouter')
const fileUploadrouter = require('./api/routers/fileuploadrouter')
const serverless = require("serverless-http");
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(CONNECTION_STRING)                                                     
.then(res=>console.log('connect'))
.catch(err=>console.log(err))
app.options("*", cors({ origin: ['http://localhost:19006',  'http://localhost:8080','https://fluffy-tarsier-c3f7df.netlify.app', "https://marvel-backend-vzsr.onrender.com"], optionsSuccessStatus: 200 }));
app.options("*", cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use('/.netlify/functions/api/user',UserRouter)
app.use('/.netlify/functions/api/file',fileUploadrouter)
app.use((err,res)=>{
    res.status(err.statusCode || 500).json({
        message:err?.message || "Server error",
        statusCode:err.statusCode || 500
    })
})
// skklsdk ssjksidhds sdisis ixkjcvnd skjdzuis sdisis

module.exports=app
module.exports.handler = serverless(app);