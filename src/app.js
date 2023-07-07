const express=require('express')
const { CONNECTION_STRING}=require('./confing')
const {mongoose}= require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config();
const UserRouter = require('./api/routers/userrouter')
const fileUploadrouter = require('./api/routers/fileuploadrouter')
const splasfilerouter= require('./api/routers/Splasfilerouter')
const onboardinfilerouter =require('./api/routers/onboardingfilerouter')
const Plansrouter =require('./api/routers/Plansrouter')
const serverless = require("serverless-http");
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(CONNECTION_STRING)                                                     
.then(res=>console.log('connect'))
.catch(err=>console.log(err))
app.options("*", cors({ origin: ['http://localhost:3000',  'http://localhost:8080', "https://marvel-backend2.onrender.com"], optionsSuccessStatus: 200 }));
app.options("*", cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use('/api/user',UserRouter)
app.use('/api/file',fileUploadrouter)
app.use('/api/splas', splasfilerouter)
app.use('/api/onboarding',onboardinfilerouter)
app.use('/api/plans', Plansrouter)
app.use((err,res)=>{
    res.status(err.statusCode || 500).json({
        message:err?.message || "Server error",
        statusCode:err.statusCode || 500
    })
})


module.exports=app
module.exports.handler = serverless(app);