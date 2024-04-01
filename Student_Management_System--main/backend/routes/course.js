const express = require("express");
const router = express.Router();
const { Course, validateCourse } = require('../models/course');
const { Student } = require('../models/student');



// GET all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/student/:regNo', async (req, res) => {
  const { regNo } = req.params;

  try {
    // Find the student by registration number
    const student = await Student.findOne({ regNo });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Extract degree and semester from the student
    const { degree, semester } = student;

    // Fetch modules based on the student's degree and semester
    const modules = await Course.find({ degree, semester }, { modCode: 1, modName: 1, _id: 0 });
    console.log(modules.course);
    res.json(modules);
  } catch (error) {
    console.error('Error fetching student modules:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get all 1 year modules a specific degree

router.get('/:degree', async (req, res) => {
  const { degree } = req.params;

  try {
    const modules = await Course.find({ degree: degree, semester: 'Y1S1' }, { modCode: 1, modName: 1, _id: 0 });
    console.log(modules);
    res.send(modules);
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/all/:degree', async (req, res) => {
  const { degree } = req.params;
  const { semester } = req.query;

  try {
    const modules = await Course.find({ degree, semester }, { modCode: 1, modName: 1, _id: 0 });
    res.json(modules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// POST a new course
router.post('/', async (req, res) => {
  // Validate the request body
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let course = new Course({
    degree: req.body.degree,
    semester: req.body.semester,
    modCode: req.body.modCode,
    modName: req.body.modName
  });

  try {
    course = await course.save();
    console.log('Course added successfully');
    res.send(course);
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Function to retrieve student courses
async function getStudentCourses(regNo) {
  try {
    const student = await Student.findOne({ regNo });

    if (!student) {
      return { error: 'Student not found' };
    }

    const { degreeProgram, semester } = student;

    // Find the courses based on the student's degree program up to the current semester
    const courses = await Course.find({
      degree: degreeProgram,
      semester: { $lte: semester },
    });

    // Group the courses by semester
    const coursesBySemester = {};
    courses.forEach((course) => {
      if (!coursesBySemester[course.semester]) {
        coursesBySemester[course.semester] = [];
      }
      coursesBySemester[course.semester].push({
        modCode: course.modCode,
        modName: course.modName,
      });
    });

    return coursesBySemester;
  } catch (error) {
    console.error('Error retrieving student courses:', error);
    return { error: 'Internal server error' };
  }
}

router.get('/student-courses/:regNo', async (req, res) => {
  const regNo = req.params.regNo;
  const coursesBySemester = await getStudentCourses(regNo);
  res.json(coursesBySemester);
});


module.exports = router;
