const Library = require("../models/library.model");

const getLibraryDetails = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const libraryDetails = await Library.findOne({
      student: studentId,
    }).populate("student"); // Populate the 'student' field to get details from the Student model

    if (!libraryDetails) {
      return res
        .status(404)
        .json({ message: "Library details not found for the student" });
    }

    res.json({
      message: "success",
      libraryDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  add book details

const addBookDetails = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { booksBorrowed } = req.body;

    // Validate the request payload
    if (!Array.isArray(booksBorrowed)) {
      return res.status(400).json({ message: "Invalid request payload" });
    }
    // Check if there is an existing library record for the student
    const existingLibrary = await Library.findOne({ student: studentId });

    if (existingLibrary) {
      // If a record is found, update it
      existingLibrary.booksBorrowed.push(...booksBorrowed);
      await existingLibrary.save();

      res.status(200).json({
        message: "Library details updated successfully",
        libraryDetails: existingLibrary,
      });
    } else {
      // If no record is found, create a new one
      const newLibrary = new Library({
        student: studentId,
        booksBorrowed,
      });
      // Save the library details to the database
      const savedLibrary = await newLibrary.save();

      res.status(201).json({
        message: "Library details added successfully",
        libraryDetails: savedLibrary,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  update book details

const editBookDetails = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { booksBorrowed } = req.body;

    // Find the existing library details for the provided studentId
    const existingLibrary = await Library.findOne({
      student: studentId,
    });

    if (!existingLibrary) {
      return res
        .status(404)
        .json({ message: "Library details not found for the student" });
    }

    // Update the library details if the fields are provided
    if (booksBorrowed !== undefined) {
      existingLibrary.booksBorrowed = booksBorrowed;
    }

    // Save the updated library details to the database
    const updatedLibrary = await existingLibrary.save();

    res.json({
      message: "Library details updated successfully",
      libraryDetails: updatedLibrary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  delete book details

const removeBookDetails = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const deletedLibrary = await Library.findOneAndDelete({
      student: studentId,
    });

    if (!deletedLibrary) {
      return res
        .status(404)
        .json({ message: "Library details not found for the student" });
    }

    res.json({
      message: "Library details deleted successfully",
      libraryDetails: deletedLibrary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getLibraryDetails,
  addBookDetails,
  removeBookDetails,
  editBookDetails,
};
