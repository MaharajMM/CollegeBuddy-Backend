const multer = require("multer");
const path = require("path");
const Student = require("../models/student");

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

const registerStudent = async (req, res) => {
  let existingStudent;
  const { name, email, rollNo, registrationNo, phoneNo, session, branch, dob } =
    req.body;

  try {
    existingStudent = await Student.findOne({ rollNo });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student is already registered!",
      });
    }

    const newStudent = new Student({
      name,
      email,
      rollNo,
      registrationNo,
      phoneNo,
      session,
      branch,
      dob,
      profilePicture: req.file ? req.file.path : null,
    });

    await newStudent.save();

    console.log(`Student ${newStudent.name} registered successfully`);
    res.status(201).json({
      message: "Student registered successfully",
      student: newStudent,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Could not register student." });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Login student

const login = async (req, res) => {
  let existingStudent;
  const { rollNo, password } = req.body;
  try {
    existingStudent = await Student.findOne({ rollNo });

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

module.exports = { registerStudent, login };
