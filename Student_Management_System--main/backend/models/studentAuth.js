const mongoose = require('mongoose');

// Define the schema for the Student model
const studentAuthSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  regNo: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  }
});

// Create the Student model from the schema
const StudentAuth = mongoose.model('StudentAuth', studentAuthSchema); // Change model name to StudentAuth

module.exports = { StudentAuth };
