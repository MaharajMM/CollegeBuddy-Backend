const multer = require("multer");
const path = require("path");
const AllStudent = require("../models/student.model");

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

    const newStudent = new AllStudent({
      name: studentData.name,
      email: studentData.email,
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
//  Login student

const login = async (req, res) => {
  let existingStudent;
  const { rollNo, password } = req.body;
  try {
    existingStudent = await AllStudent.findOne({ rollNo });

    if (!existingStudent) {
      return res.status(404).json({
        message: "Could not find Student by this rollNo",
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
    console.log(err.message);
    res.status(500).json({ message: "server error." });
  }
};

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
};
