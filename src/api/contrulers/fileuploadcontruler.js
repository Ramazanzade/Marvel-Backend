require('dotenv').config();
const fileUpload = require('express-fileupload');
const path = require('path');
exports.sendfileupload= async (req,res)=>{
 res.sendFile(path.join(__dirname,'http://localhost:19006'))
}

exports.creatfileupload = async(req,res)=>{
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).json({ message: 'No files were .' });
        }
        const file = req.files.file;
        console.log(file);
    Object.keys(file).forEach(key =>{
      const filepaht = path.json(__dirname, 'file', file[key].name)
      file[key].mv(filepaht, (err)=>{
        if(err) return res.status(500).json({status:'error', message:err})
      })
    })
        return res.json({ status: 'success', message:Object.keys(file).toString() });
      } catch (err) {
        console.log('Error uploading file:', err);
        return res.status(500).json({ message: 'Error uploading file.' });
      }
}