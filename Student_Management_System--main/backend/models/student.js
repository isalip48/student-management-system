const mongoose = require('mongoose');
const Joi = require('joi');

const studentSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  nicNo: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
  },
  kduEmail: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  stuAddress: {
    type: String,
    required: true,
  },
  degreeProgram: {
    type: String,
    required: false,
  },
  intake: {
    type: String,
    required: false,
  },
  semester: {
    type: String,
    required: false,
  },
  courses: [{ type: String }],
});

const Student = mongoose.model('Student', studentSchema);

function validateStudent(student) {
  const schema = {
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    nicNo: Joi.string().required(),
    dob: Joi.date().required(),
    regNo: Joi.string().required(),
    kduEmail: Joi.string().required(),
    phoneNo: Joi.number().required(),
    stuAddress: Joi.string().required(),
    degreeProgram: Joi.string().required(),
    intake: Joi.string().required(),
    semester: Joi.string().required(),
    courses: Joi.array().items(Joi.string()).required(),
  };
  return Joi.validate(student, schema);
}

module.exports.Student = Student;
module.exports.validateStudent = validateStudent;
