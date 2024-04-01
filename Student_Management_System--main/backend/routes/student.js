const express = require('express');
const router = express.Router();
const { Student } = require('../models/student');
const bcrypt = require('bcrypt');
// const _ = require('lodash');

const upload = require("../multerConfig.js");

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort('studentID');
    res.send(students);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// GET a single student by regNo
router.get('/:regNo', async (req, res) => {
  try {
    const regNo = req.params.regNo;
    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error fetching student data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//student delete by regNo
router.delete('/delete/:regNo', async (req, res) => {
  try {
    const regNo = req.params.regNo;

    const deletedStudent = await Student.findOneAndDelete({ regNo });

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({
      message: 'Student removed successfully',
      student: deletedStudent,
    });
  } catch (error) {
    console.error('Error removing student:', error);
    res
      .status(500)
      .json({ message: 'Failed to remove student', error: error.message });
  }
});

// Route to update a student's data
router.post('/:regNo', async (req, res) => {
  try {
    const regNo = req.params.regNo;
    const updatedData = req.body;

    // Update the student data in the database based on registration number
    const updatedStudent = await Student.findOneAndUpdate(
      { regNo },
      updatedData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Student data updated successfully',
      student: updatedStudent,
    });
  } catch (error) {
    console.error('Error updating student data:', error);
    res
      .status(500)
      .json({ message: 'Failed to update student data', error: error.message });
  }
});

// router.post("/", async (req, res) => {

//   let student = await Student.findOne({ studentID: req.body.studentID });
//   if (student) return res.status(400).send("User already registered.");

//   student = new Student(_.pick(req.body, ['studentID', 'password', 'confirmPassword', 'firstName', 'lastName', 'birthDate', 'degree']));

//   const salt = await bcrypt.genSalt(10);
//   student.password = await bcrypt.hash(student.password, salt);

//   await student.save();
//   res.send(_.pick(student, ['_id', 'studentID']));
// });

// Route to add a new student
router.post('/', async (req, res) => {
  try {
    // Extracting data from the request body
    const {
      image,
      firstName,
      lastName,
      nicNo,
      dob,
      regNo,
      kduEmail,
      phoneNo,
      stuAddress,
      degreeProgram,
      intake,
      semester,
      courses,
    } = req.body;

    const newStudent = new Student({
      image,
      firstName,
      lastName,
      nicNo,
      dob,
      regNo,
      kduEmail,
      phoneNo,
      stuAddress,
      degreeProgram,
      intake,
      semester,
      courses,
    });

    // Saving the new student to the database
    await newStudent.save();
    console.log(newStudent);
    res
      .status(201)
      .json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res
      .status(500)
      .json({ message: 'Failed to add student', error: error.message });
  }
});

// router.get('/count/:regNo', async (req, res) => {
//   try {
//       const regNo = req.params.regNo;
//       const student = await Student.findOne({ regNo });

//       if (!student) {
//           return res.status(404).json({ message: 'Student not found' });
//       }

//       // Determine semester
//       const semester = req.body.semester;

//       res.json({ semester });
//   } catch (error) {
//       console.error('Error fetching student data:', error);
//       res.status(500).json({ message: 'Server error' });
//   }
// });

router.get('/count/:regNo', async (req, res) => {
  try {
    const regNo = req.params.regNo;
    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Assuming the semester is stored in the student object
    const semester = student.semester;

    res.json({ semester });
  } catch (error) {
    console.error('Error fetching student data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});






module.exports = router;
