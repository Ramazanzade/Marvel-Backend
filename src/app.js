const express=require('express')
const { CONNECTION_STRING}=require('./confing')
const {mongoose}= require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config();
const path = require('path');
const multer = require('multer');
const File = require("./models/filemodel");
const fs = require('fs');
const UserRouter = require('./api/routers/userrouter')
const fileUploadrouter = require('./api/routers/fileuploadrouter')
const serverless = require("serverless-http");
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(CONNECTION_STRING)                                                     
.then(res=>console.log('connect'))
.catch(err=>console.log(err))
app.options("*", cors({ origin: ['http://localhost:19007',  'http://localhost:8080', "https://marvel-backend2.onrender.com"], optionsSuccessStatus: 200 }));
app.options("*", cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use('/api/user',UserRouter)
app.use('/api/file',fileUploadrouter)
app.use((err,res)=>{
    res.status(err.statusCode || 500).json({
        message:err?.message || "Server error",
        statusCode:err.statusCode || 500
    })
})



const uploadDirectory = path.resolve(__dirname, '../../uploads/');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileName = `${uniqueSuffix}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /\.(jpg|jpeg|png|gif|mp4|avi)$/i;
  if (!allowedExtensions.test(file.originalname.toLowerCase())) {
    return cb(new Error('Only image and video files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });
app.post('/fileadd', upload.any(), async (req, res) => {
    try {
      const files = req.files.map(file => ({
        category: file.originalname,
        url: `${req.protocol}://${req.get('host')}/file/${file.filename}`,
        type: file.mimetype.startsWith('image') ? 'image' : 'video',
        filename: file.filename,
      }));
  
      const savedFiles = await File.insertMany(files);
      res.json(savedFiles);
    } catch (err) {
      console.error('Error saving files:', err);
      res.status(500).json({ message: 'Error saving files', error: err });
    }
  });
  
  app.get('/file/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(uploadDirectory, filename);
    res.sendFile(filePath, err => {
      if (err) {
        console.error('Error retrieving file:', err);
        res.status(500).json({ message: 'Error retrieving file', error: err });
      }
    });
  });
  
  app.get('/filesget', async (req, res) => {
    try {
      const files = await File.find();
  
      if (files.length === 0) {
        return res.status(404).send('No files found');
      }
  
      res.json(files);
    } catch (err) {
      console.error('Error retrieving files:', err);
      res.status(500).json({ message: 'Error retrieving files', error: err });
    }
  });
  

module.exports=app
module.exports.handler = serverless(app);