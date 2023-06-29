require('dotenv').config();
const path = require('path');
const multer = require('multer');
const File = require("../../models/filemodel");
const fs = require('fs');
const express = require('express');
const app = express();

const uploadDirectory = path.join(__dirname, '../../uploads/');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
} 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileName = `${file.originalname.split('.')[0]}-${uniqueSuffix}${fileExtension}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|avi)$/i)) {
    return cb(new Error('Only image and video files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

app.use('/uploads', express.static(uploadDirectory));

exports.fileadd = async (req, res, next) => {
  upload.any()(req, res, async (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ message: 'Error uploading file', error: err });
    }

    const files = req.files.map(file => ({
      category: file.originalname,
      url: `${req.protocol}://${req.get('host')}/uploads/${path.basename(file.filename)}`, // Use path.basename to get just the filename
      type: 'image',
    }));

    try {
      const savedFiles = await File.insertMany(files);
      res.json(savedFiles);
    } catch (err) {
      console.error('Error saving files:', err);
      res.status(500).json({ message: 'Error saving files', error: err });
    }
  });
};

exports.filesget = async (req, res) => {
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
  });
}



exports.filedelet = async (req, res) => {
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


exports.fileupdate = async (req, res) => {
  const fileId = req.params.id;
  const { category } = req.body;

  File.findByIdAndUpdate(fileId, { category }, { new: true }, (err, updatedFile) => {
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