const express = require("express");
const router = express.Router();
const { StudentAuth } = require('../models/studentAuth');
const { Student } = require('../models/student'); 
const bcrypt = require('bcrypt');
const _ = require('lodash'); 

// Define route for student signup
router.post("/signup", async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            birthDate,
            regNo,
            password,
            degree,
            confirmPassword
        } = req.body;

        // Validate input data
        if (!firstName || !lastName || !birthDate || !regNo || !password || !degree || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if student already exists
        const existingStudentAuth = await StudentAuth.findOne({ regNo });
        if (existingStudentAuth) {
            return res.status(400).json({ error: "Student with this registration number already exists" });
        }

        // Check if the regNo exists in the Student collection
        const existingStudent = await Student.findOne({ regNo });
        if (!existingStudent) {
            return res.status(400).json({ error: "Student with this registration number does not exist in the Student collection" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new student authentication record
        const newStudentAuth = new StudentAuth({
            firstName,
            lastName,
            birthDate,
            regNo,
            password: hashedPassword,
            degree
        });

        // Save the student authentication record to the database
        await newStudentAuth.save();

        return res.status(201).json({ message: "Student signed up successfully", student: newStudentAuth });
    } catch (error) {
        console.error("Error signing up student:", error);
        if (error.code === 11000) {
            return res.status(400).json({ error: "Student with this registration number already exists" });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Define route for student signin

router.post("/signin", async (req, res) => {
    try {
        const { regNo, password } = req.body;
        const student = await StudentAuth.findOne({ regNo });

        if (!student) {
            return res.status(400).send("Invalid registration number or password");
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);

        if (!isPasswordValid) {
            return res.status(400).send("Invalid registration number or password");
        }

        console.log(student);

        res.send(_.pick(student, ['_id','image', 'regNo', 'firstName', 'lastName']));
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
