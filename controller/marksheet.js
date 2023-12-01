const express = require("express");
const router = express.Router();
const Marksheet = require("../models/marksheet.model");

const marksheet = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find the marksheet using the provided studentId and semester (assuming semester 8)
    const marksheet = await Marksheet.find({
      student: studentId,
    }).populate("student");

    if (!marksheet || marksheet.length === 0) {
      return res.status(404).json({ message: "Marksheet not found" });
    }

    const studentDetails = marksheet[0].student;

    return res.status(200).json({
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

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  update marksheet

const updateMarksheet = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const semesterToUpdate = req.params.semester;
    const { subjects, sgpa } = req.body;

    // Find the marksheet details for the provided studentId and semester
    const existingMarksheet = await Marksheet.findOne({
      student: studentId,
      semester: semesterToUpdate,
    });

    if (!existingMarksheet) {
      return res.status(404).json({
        message: "Marksheet details not found for the student and semester",
      });
    }

    // Update the marksheet details for the specific semester
    existingMarksheet.subjects = subjects;
    existingMarksheet.sgpa = sgpa;

    await existingMarksheet.save();

    res.json({
      message: "Marksheet details updated successfully",
      marksheetDetails: existingMarksheet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  delete sem marksheet for the student

const removeSemesterMarksheet = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const semesterToDelete = req.params.semester;

    // Find and delete the marksheet details for the provided studentId and semester
    const deletedMarksheet = await Marksheet.findOneAndDelete({
      student: studentId,
      semester: semesterToDelete,
    });

    if (!deletedMarksheet) {
      return res.status(404).json({
        message: "Marksheet details not found for the student and semester",
      });
    }

    res.json({
      message: "Marksheet details deleted successfully",
      marksheetDetails: deletedMarksheet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  delete all marksheet for the student

const removeMarksheet = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find and delete the entire marksheet for the provided studentId
    const deletedMarksheet = await Marksheet.findOneAndDelete({
      student: studentId,
    });

    if (!deletedMarksheet) {
      return res
        .status(404)
        .json({ message: "Marksheet details not found for the student" });
    }

    res.json({
      message: "Entire marksheet details deleted successfully",
      marksheetDetails: deletedMarksheet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  marksheet,
  addMarks,
  updateMarksheet,
  removeMarksheet,
  removeSemesterMarksheet,
};
