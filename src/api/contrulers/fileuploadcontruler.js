require('dotenv').config();
const fileUpload = require('express-fileupload');
const path =require('path')
exports.sendfileupload= async (req,res)=>{
 res.sendFile(path.join(__dirname,'http://localhost:19006'))
}

exports.creatfileupload = async(req,res)=>{
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).json({ message: 'No files were uploaded.' });
        }
    
        const file = req.files.file;
        console.log(file);
    
        return res.json({ status: 'success', message: 'File uploaded successfully' });
      } catch (err) {
        console.log('Error uploading file:', err);
        // return res.status(500).json({ message: 'Error uploading file.' });
      }
}