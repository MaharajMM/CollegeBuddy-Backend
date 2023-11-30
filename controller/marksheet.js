const express = require("express");
const router = express.Router();
const Marksheet = require("../models/marksheet.model");

const marksheet = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find the marksheet using the provided studentId and semester (assuming semester 8)
    const marksheet = await Marksheet.find({
      student: studentId,
    }).populate("student"); // Populate the 'student' field to get details from the Student model

    if (!marksheet || marksheet.length === 0) {
      return res.status(404).json({ message: "Marksheet not found" });
    }

    const studentDetails = marksheet[0].student;

    return res
      .status(200)
      .json({
        message: "success",
        student: studentDetails,
        marksheet: marksheet,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addMarks = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { semester, subjects, sgpa } = req.body;

    // Validate the request payload
    if (!semester || !subjects || !Array.isArray(subjects)) {
      return res.status(400).json({ message: "Invalid request payload" });
    }

    /// Create a new marksheet instance
    const newMarksheet = new Marksheet({
      student: studentId,
      semester,
      subjects,
      sgpa,
    });

    const savedMarksheet = await newMarksheet.save();

    res.status(201).json({
      message: "Marksheet added successfully",
      marksheet: savedMarksheet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { marksheet, addMarks };
