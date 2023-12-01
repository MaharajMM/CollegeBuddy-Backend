const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance.model");

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  add attendance

const addAttendance = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { semester, attendancePercentage } = req.body;

    const existingAttendance = await Attendance.findOne({ student: studentId });

    if (!existingAttendance) {
      // If attendance details for the student do not exist, create a new record
      const newAttendance = new Attendance({
        student: studentId,
        attendance: [{ semester, attendancePercentage }],
      });

      await newAttendance.save();
      return res.status(201).json({
        message: "Attendance details added successfully",
        attendanceDetails: newAttendance,
      });
    }

    // If attendance details for the student already exist, update the existing record
    const semesterExists = existingAttendance.attendance.some(
      (entry) => entry.semester === semester
    );

    if (semesterExists) {
      return res.status(400).json({
        message: `Attendance details for semester ${semester} already exist for the student`,
      });
    }

    existingAttendance.attendance.push({ semester, attendancePercentage });
    await existingAttendance.save();

    res.status(201).json({
      message: "Attendance details added successfully",
      attendanceDetails: existingAttendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  get attendance

const getAttendance = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find the attendance details for the provided studentId
    const attendanceDetails = await Attendance.findOne({ student: studentId });

    if (!attendanceDetails) {
      return res
        .status(404)
        .json({ message: "Attendance details not found for the student" });
    }

    res.json({
      message: "success",
      attendanceDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  update attendance

const updateAttendance = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const semesterToUpdate = req.params.semester;
    const { attendancePercentage } = req.body;

    // Find the attendance details for the provided studentId
    const existingAttendance = await Attendance.findOne({ student: studentId });

    if (!existingAttendance) {
      return res
        .status(404)
        .json({ message: "Attendance details not found for the student" });
    }

    // Find the specific semester to update
    const semesterEntry = existingAttendance.attendance.find(
      (entry) => entry.semester == semesterToUpdate
    );

    if (!semesterEntry) {
      return res.status(404).json({
        message: `Attendance details not found for semester ${semesterToUpdate}`,
      });
    }

    // Update the attendance details for the specific semester
    semesterEntry.attendancePercentage = attendancePercentage;
    await existingAttendance.save();

    res.json({
      message: "Attendance details updated successfully",
      attendanceDetails: existingAttendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  delete sem attendance for the student

const dltAttendance = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const semesterToDelete = req.params.semester;

    // Find the attendance details for the provided studentId
    const existingAttendance = await Attendance.findOne({ student: studentId });

    if (!existingAttendance) {
      return res
        .status(404)
        .json({ message: "Attendance details not found for the student" });
    }

    // Find the specific semester to delete
    const semesterIndex = existingAttendance.attendance.findIndex(
      (entry) => entry.semester == semesterToDelete
    );

    if (semesterIndex === -1) {
      return res
        .status(404)
        .json({
          message: `Attendance details not found for semester ${semesterToDelete}`,
        });
    }

    // Delete the attendance details for the specific semester
    existingAttendance.attendance.splice(semesterIndex, 1);
    await existingAttendance.save();

    res.json({
      message: "Attendance details deleted successfully",
      attendanceDetails: existingAttendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  delete sem attendance for the student

const dltStudentAttendance = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find and delete the attendance record for the provided studentId
    const deletedAttendance = await Attendance.findOneAndDelete({
      student: studentId,
    });

    if (!deletedAttendance) {
      return res
        .status(404)
        .json({ message: "Attendance details not found for the student" });
    }

    res.json({
      message: "Entire attendance record deleted successfully",
      attendanceDetails: deletedAttendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addAttendance,
  getAttendance,
  updateAttendance,
  dltAttendance,
  dltStudentAttendance,
};
