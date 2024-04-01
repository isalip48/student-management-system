const mongoose = require("mongoose");
const Joi = require('joi');

const courseSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  semester: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  modCode: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  },
  modName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  }
});

const Course = mongoose.model("Course", courseSchema);

function validateCourse(course) {
  const schema = Joi.object({
    degree: Joi.string()
      .min(1)
      .max(50)
      .required(),
    semester: Joi.string()
      .min(1)
      .max(50)
      .required(),
    modCode: Joi.string()
      .min(3)
      .max(50)
      .required(),
    modName: Joi.string()
      .min(5)
      .max(255)
      .required()
  });
  return schema.validate(course);
}


module.exports.Course = Course;
module.exports.validateCourse = validateCourse;
