const express = require("express");
const router = express.Router();
const Marksheet = require("../models/marksheet.model");

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  get marksheet

const marksheet = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find the marksheet using the provided studentId
    const marksheet = await Marksheet.findOne({
      student: studentId,
    }).populate("student");

    if (!marksheet) {
      return res.status(404).json({ message: "Marksheet not found" });
    }

    const studentDetails = marksheet.student;

    // Check if the marksheet has the semesters property
    if (!marksheet.semesters || !Array.isArray(marksheet.semesters)) {
      return res.status(404).json({
        message: "Semesters details not found in the marksheet",
      });
    }

    // Modify the marksheet array structure
    const modifiedMarksheet = marksheet.semesters.map((semester) => ({
      semester: semester.semester,
      subjects: semester.subjects,
      sgpa: semester.sgpa,
    }));

    return res.status(200).json({
      message: "success",
      student: studentDetails,
      marksheet: modifiedMarksheet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  get attendance by sem

const getMarksheetBySem = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const semesterNo = parseInt(req.params.semesterNo);

    // Find the marksheet details for the provided studentId and semesterNo
    const marksheetDetails = await Marksheet.findOne({
      student: studentId,
    }).populate("student");

    if (!marksheetDetails) {
      return res.status(404).json({
        message: `marksheet details not found for the student in semester ${semesterNo}`,
      });
    }

    const studentDetails = marksheetDetails.student;

    // Search for the marksheet record for the specified semester
    const marksheetRecord = marksheetDetails.semesters.find(
      (record) => record.semester === semesterNo
    );

    if (!marksheetRecord) {
      return res.status(404).json({
        message: "Attendance record not found for the specified semester",
      });
    }

    // Find the attendance details for the provided studentId
    res.status(200).json({
      message: "success",
      student: studentDetails,
      marksheetRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  add marksheet

const addMarks = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { semester, subjects, sgpa } = req.body;

    // Validate the request payload
    if (!semester || !subjects || !Array.isArray(subjects)) {
      return res.status(400).json({ message: "Invalid request payload" });
    }

    // Find the existing marksheet or create a new one if it doesn't exist
    const existingMarksheet = await Marksheet.findOne({ student: studentId });
    
    if (existingMarksheet) {
      // If the marksheet exists, add a new semester
      existingMarksheet.semesters.push({
        semester: semester,
        subjects,
        sgpa,
      });

      const savedMarksheet = await existingMarksheet.save();

      res.status(201).json({
        message: "Marks added successfully",
        marksheet: savedMarksheet,
      });
    } else {
      // If the marksheet doesn't exist, create a new one
      const newMarksheet = new Marksheet({
        student: studentId,
        semesters: [
          {
            semester: semester,
            subjects,
            sgpa,
          },
        ],
      });

      const savedMarksheet = await newMarksheet.save();

      res.status(201).json({
        message: "Marksheet added successfully",
        marksheet: savedMarksheet,
      });
    }
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

    // Find the marksheet details for the provided studentId
    const existingMarksheet = await Marksheet.findOne({
      student: studentId,
    });

    if (!existingMarksheet) {
      return res.status(404).json({
        message: "Marksheet not found for the student",
      });
    }

    // Find the specific semester to update
    const semesterToUpdateIndex = existingMarksheet.semesters.findIndex(
      (semester) => semester.semester === parseInt(semesterToUpdate)
    );

    if (semesterToUpdateIndex === -1) {
      return res.status(404).json({
        message: "Marksheet details not found for the student and semester",
      });
    }

    if (subjects && sgpa) {
      existingMarksheet.semesters[semesterToUpdateIndex].subjects = subjects;
      existingMarksheet.semesters[semesterToUpdateIndex].sgpa = sgpa;
    } else if (subjects) {
      existingMarksheet.semesters[semesterToUpdateIndex].subjects = subjects;
    } else if (sgpa !== undefined && sgpa !== null) {
      existingMarksheet.semesters[semesterToUpdateIndex].sgpa = sgpa;
    }
    // // Update the marksheet details for the specific semester

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

    // Find the marksheet details for the provided studentId
    const existingMarksheet = await Marksheet.findOne({
      student: studentId,
    });

    if (!existingMarksheet) {
      return res.status(404).json({
        message: "Marksheet not found for the student",
      });
    }

    // Find the specific semester to delete
    const semesterToDeleteIndex = existingMarksheet.semesters.findIndex(
      (semester) => semester.semester === parseInt(semesterToDelete)
    );

    if (semesterToDeleteIndex === -1) {
      return res.status(404).json({
        message: "Marksheet details not found for the student and semester",
      });
    }

    // Remove the specific semester from the array
    existingMarksheet.semesters.splice(semesterToDeleteIndex, 1);

    await existingMarksheet.save();

    res.json({
      message: "Marksheet details for the semester deleted successfully",
      marksheetDetails: existingMarksheet,
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
  getMarksheetBySem,
  addMarks,
  updateMarksheet,
  removeMarksheet,
  removeSemesterMarksheet,
};
