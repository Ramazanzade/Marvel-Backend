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
const stripe = require('stripe')('sk_test_51NRj63FWhGiOytmSiTTHY0bZhkpUaKgvO2B0C1zScQalJQItV5WWW68ZSsnik8UnTuM5k2sQYKKefRBH45En0XvI00n6Bcbjbo');
// app.post('/api/pay', async (req, res) => {
// //     const { name, surname, cart, date, security , amount } = req.body;
  
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: Number(amount) * 100,
//         currency: 'usd',
//         payment_method_types: ['card'],
//         description: `Payment from ${name} ${surname}`,
//       });
  
  
// //       res.status(200).json({ clientSecret: paymentIntent.client_secret });
// //     } catch (error) {
// //       console.error('Error processing payment:', error);
// //       res.status(500).json({ error: 'Payment processing failed' });
// //     }
// //   });
















app.use((err,res)=>{
    res.status(err.statusCode || 500).json({
        message:err?.message || "Server error",
        statusCode:err.statusCode || 500
    })
})


module.exports=app
module.exports.handler = serverless(app);