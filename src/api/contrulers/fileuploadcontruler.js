require('dotenv').config();
const fileUpload = require('express-fileupload');
const path = require('path');
exports.sendfileupload = async (req, res) => {
  res.sendFile('/path/to/file.jpg');
};


exports.creatfileupload = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    for (let key in req.files) {
      const file = req.files[key];
      const filePath = path.join(__dirname, 'file', file.name);
      file.mv(filePath, (err) => {
        if (err) return res.status(500).json({ status: 'error', message: err });
      });
    }

    return res.json({ status: 'success', message: Object.keys(req.files).toString() });
  } catch (err) {
    console.log('Error uploading file:', err);
    return res.status(500).json({ message: 'Error uploading file.' });
  }
};
