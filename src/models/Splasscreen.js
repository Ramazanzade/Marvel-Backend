const mongoose = require('mongoose');

const splasfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
  }, 
   text: {
    type: String,
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  filename: {
    type: String,
    required: true
  },
});

const SplasFile = mongoose.model('SplasFile', splasfileSchema);

module.exports = SplasFile;
