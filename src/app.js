const path = require("path");
const express=require('express')
const { CONNECTION_STRING}=require('./confing')
const {mongoose}= require('mongoose')
const multer = require("multer");
const cors = require('cors')
const app = express()
require('dotenv').config();
const UserRouter = require('./api/routers/userrouter')
const fileUploadrouter = require('./api/routers/fileuploadrouter')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(CONNECTION_STRING)                                                     
.then(res=>console.log('connect'))
.catch(err=>console.log(err))
app.options("*", cors({ origin: ['http://localhost:19006',  'http://localhost:8082','https://fluffy-tarsier-c3f7df.netlify.app'], optionsSuccessStatus: 200 }));
app.options("*", cors({ origin: '*', optionsSuccessStatus: 200 }));
// app.use('/api/user',UserRouter)
// app.use('/api/file',fileUploadrouter)


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images"); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
  
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'http://localhost:19006'));
  });
  const upload = multer({ storage: fileStorageEngine });
  
  app.post("/single", upload.single("image"), (req, res) => {
    console.log(req.file);
    res.send("Single FIle upload success");
  });
  
  app.post("/multiple", upload.array("images", 3), (req, res) => {
    console.log(req.files);
    res.send("Multiple Files Upload Success");
  });
  



app.use((err,res)=>{
    res.status(err.statusCode || 500).json({
        message:err?.message || "Server error",
        statusCode:err.statusCode || 500
    })
})
module.exports=app