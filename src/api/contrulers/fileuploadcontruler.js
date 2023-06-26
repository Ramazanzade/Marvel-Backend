require('dotenv').config();
const path = require('path');
const File = require("../../models/filemodel")
exports.filesget= async (req,res)=>{
  const fileId = req.params.id;

  File.findById(fileId, (err, file) => {
    if (err) {
      console.error('Error retrieving file:', err);
      return res.status(500).send('Error retrieving file');
    }

    if (!file) {
      return res.status(404).send('File not found');
    }

    const filePath = file.url;
    res.sendFile(filePath);
  });}



  exports.fileadd = async(req, res) => {
    const { originalname, filename, path } = req.file;
  
    const file = new File({
      catogory: originalname,
      url: path,
      type: 'image' 
    });
  
    try {
      const savedFile = await file.save();
      res.json(savedFile);
    } catch (err) {
      console.error('Error saving file:', err);
      res.status(500).json({ message: 'Error saving file', error: err });
    }
  };
  


exports.filedelet = async(req,res)=>{
  const fileId = req.params.id;

  File.findByIdAndDelete(fileId, (err, file) => {
    if (err) {
      console.error('Error deleting file:', err);
      return res.status(500).send('Error deleting file');
    }

    if (!file) {
      return res.status(404).send('File not found');
    }

    fs.unlink(file.url, (err) => {
      if (err) {
        console.error('Error deleting file from the file system:', err);
      }
    });

    res.sendStatus(204);
  });

}


exports.fileupdate= async(req,res)=>{
  const fileId = req.params.id;
  const { catogory } = req.body;

  File.findByIdAndUpdate(fileId, { catogory }, { new: true }, (err, updatedFile) => {
    if (err) {
      console.error('Error updating file:', err);
      return res.status(500).send('Error updating file');
    }

    if (!updatedFile) {
      return res.status(404).send('File not found');
    }

    res.json(updatedFile);
  });
}