const mongoose = require('mongoose');

const OnboardingfileSchema = new mongoose.Schema({
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

const Onboardingfile = mongoose.model('Onboardingfile', OnboardingfileSchema);

module.exports = Onboardingfile;
