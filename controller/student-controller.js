const multer = require("multer");
const path = require("path");
const AllStudent = require("../models/student.model");
const bcrypt = require("bcryptjs");

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // The directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  },
});

const upload = multer({ storage: storage });

const addStudent = async (req, res) => {
  try {
    const studentData = req.body;
    const existingStudent = await AllStudent.findOne({
      registrationNo: studentData.registrationNo,
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student is already registered!",
      });
    }
    const hashedPassword = bcrypt.hashSync(studentData.password);

    const newStudent = new AllStudent({
      name: studentData.name,
      email: studentData.email,
      password: hashedPassword,
      rollNo: studentData.rollNo,
      registrationNo: studentData.registrationNo,
      phoneNo: studentData.phoneNo,
      session: studentData.session,
      branch: studentData.branch,
      dob: studentData.dob,
      profilePicture: req.file ? req.file.path : null,
    });

    const savedStudent = await newStudent.save();

    console.log(`Student ${savedStudent.name} registered successfully`);
    res.status(201).json({
      message: "Student registered successfully",
      student: savedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Update student

const updateStudent = async (req, res) => {
  try {
    const studentData = req.body;
    const rollNoToUpdate = req.params.rollNo; // Assuming the rollNo is passed as a parameter in the URL

    // Find the student to update
    const existingStudent = await AllStudent.findOne({
      rollNo: rollNoToUpdate,
    });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Update the student's data
    existingStudent.name = studentData.name || existingStudent.name;
    existingStudent.email = studentData.email || existingStudent.email;
    existingStudent.phoneNo = studentData.phoneNo || existingStudent.phoneNo;
    existingStudent.session = studentData.session || existingStudent.session;
    existingStudent.branch = studentData.branch || existingStudent.branch;
    existingStudent.dob = studentData.dob || existingStudent.dob;

    // Update the password if a new one is provided
    if (studentData.password) {
      const hashedPassword = bcrypt.hashSync(studentData.password);
      existingStudent.password = hashedPassword;
    }

    // Update the profile picture if a new one is provided
    if (req.file) {
      existingStudent.profilePicture = req.file.path;
    }

    // Save the updated student data
    const updatedStudent = await existingStudent.save();

    console.log(`Student ${updatedStudent.name} updated successfully`);
    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Login student

const login = async (req, res) => {
  let existingStudent;
  const { rollNo, email, password } = req.body;
  try {
    // Check if both rollNo and email are provided
    if (!rollNo || !email || !password) {
      return res.status(400).json({
        message: "Please provide both rollNo, email, and password for login",
      });
    }
    existingStudent = await AllStudent.findOne({ rollNo, email });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Could not find Student. Either rollNo or email is incorrect",
      });
    }
    if (!existingStudent.password) {
      return res.status(400).json({
        message: "Password not found for the student",
      });
    }

    const isValidPassword = bcrypt.compareSync(
      password,
      existingStudent.password
    );
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    console.log(`Student: ${existingStudent.name} logged in successfully`);
    res
      .status(200)
      .json({ status: true, message: "Student logged in Successfully" });
  } catch (err) {
    console.log("error:" + err.message);
    res.status(500).json({ message: "server error." });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  get all students
const getStudents = async (req, res) => {
  try {
    const students = await AllStudent.find();
    res.status(200).json({ message: "success", data: students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  get student by roll no.

const getStudentById = async (req, res) => {
  try {
    const rollNo = req.params.rollNo;

    const studentDetails = await AllStudent.findOne({ rollNo });

    if (!studentDetails) {
      return res.status(404).json({
        message: "Could not find Student by this rollNo",
      });
    }

    return res.status(200).json({
      message: "success",
      student: studentDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  login,
  getStudentById,
  getStudents,
  addStudent,
  updateStudent,
};
