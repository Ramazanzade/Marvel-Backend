  require('dotenv').config();
  const path = require('path');
  const multer = require('multer');
  const File = require("../../models/filemodel");
  const fs = require('fs');
  const express = require('express');
  const app = express();

  // const uploadDirectory = path.join(__dirname, '../../uploads/');

  // if (!fs.existsSync(uploadDirectory)) {
  //   fs.mkdirSync(uploadDirectory);
  // } 

  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, uploadDirectory);
  //   },
  //   filename: (req, file, cb) => {
  //     const fileExtension = path.extname(file.originalname);
  //     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
  //     const fileName = `${file.originalname}-${uniqueSuffix}${fileExtension}`; // Include original filename in the generated filename
  //     cb(null, fileName);
  //   },
  // });

  // const fileFilter = (req, file, cb) => {
  //   const allowedExtensions = /\.(jpg|jpeg|png|gif|mp4|avi)$/i;
  //   if (!allowedExtensions.test(file.originalname.toLowerCase())) {
  //     return cb(new Error('Only image and video files are allowed!'), false);
  //   }
  //   cb(null, true);
  // };

  // const upload = multer({ storage, fileFilter });

  // app.use('/uploads', express.static(uploadDirectory));
  // Create a storage object with the desired configuration

  // exports.fileadd = async (req, res, next) => {
  //   upload.any()(req, res, async (err) => {
  //     if (err) {
  //       console.error('Error uploading file:', err);
  //       return res.status(500).json({ message: 'Error uploading file', error: err });
  //     }

  //     const files = req.files.map(file => ({
  //       category: file.originalname,
  //       url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`, // Use file.filename directly
  //       type: file.mimetype.startsWith('image') ? 'image' : 'video',
  //     }));

  //     try {
  //       const savedFiles = await File.insertMany(files);
  //       res.json(savedFiles);
  //     } catch (err) {
  //       console.error('Error saving files:', err);
  //       res.status(500).json({ message: 'Error saving files', error: err });
  //     }
  //   });


  // };
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Specify the destination folder for storing uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = file.mimetype.split('/')[1]; // Get the file extension from mimetype
      cb(null, `${uniqueSuffix}.${ext}`); // Set the filename to a unique value
    }
  });
  
  const upload = multer({ storage: storage });                                                                                     
  exports.fileadd = async (req, res, next) => {
    try {
      upload.array('files')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
  
        const files = req.files;
  
        for (const file of files) {
          const { filename, path, mimetype } = file;
  
          const newFile = new File({
            filename,
            path,
            mimetype
          });
          await newFile.save();
  
          const publicPath = `public/${filename}`;
          fs.renameSync(path, publicPath);
        }
  
        return res.status(200).json({ message: 'Files uploaded successfully.' });
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  };
  
  
exports.filesget = async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await File.findById(fileId);

    if (!file || !fs.existsSync(path.join(uploadDirectory, file.url))) {
      return res.status(404).send('File not found');
    }

    const filePath = file.url;
    res.sendFile(path.join(uploadDirectory, filePath));
  } catch (err) {
    console.error('Error retrieving file:', err);
    res.status(500).send('Error retrieving file');
  }
};



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