const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  catogory: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
