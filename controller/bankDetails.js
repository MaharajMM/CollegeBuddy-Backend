
const BankDetail = require("../models/bank.model");

const bankDetails = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const bankDetails = await BankDetail.findOne({
      student: studentId,
    }).populate("student");

    if (!bankDetails) {
      return res
        .status(404)
        .json({ message: "Bank details not found for the student" });
    }

    res.json({
      message: "success",
      bankDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  add bank details

const addBankDetails = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { accountHolderName, accountNumber, bankName, ifscCode } = req.body;

    // Validate the request payload
    if (!accountHolderName || !accountNumber || !bankName || !ifscCode) {
      return res.status(400).json({ message: "Invalid request payload" });
    }

    // Create a new BankDetail instance
    const newBankDetail = new BankDetail({
      student: studentId,
      accountHolderName,
      accountNumber,
      bankName,
      ifscCode,
    });

    // Save the bank details to the database
    const savedBankDetail = await newBankDetail.save();

    res.status(201).json({
      message: "Bank details added successfully",
      bankDetails: savedBankDetail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  update bank details

const editBankDetails = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { accountHolderName, accountNumber, bankName, ifscCode } = req.body;

    const existingBankDetail = await BankDetail.findOne({
      student: studentId,
    });

    if (!existingBankDetail) {
      return res
        .status(404)
        .json({ message: "Bank details not found for the student" });
    }

    // Update the bank details if the fields are provided
    if (accountHolderName !== undefined) {
      existingBankDetail.accountHolderName = accountHolderName;
    } else if (accountNumber !== undefined) {
      existingBankDetail.accountNumber = accountNumber;
    } else if (bankName !== undefined) {
      existingBankDetail.bankName = bankName;
    } else if (ifscCode !== undefined) {
      existingBankDetail.ifscCode = ifscCode;
    }

    // Save the updated bank details to the database
    const updatedBankDetail = await existingBankDetail.save();

    res.json({
      message: "Bank details updated successfully",
      bankDetails: updatedBankDetail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  delete bank details

const removeBankDetails = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find and delete the bank details for the provided studentId
    const deletedBankDetail = await BankDetail.findOneAndDelete({
      student: studentId,
    });

    if (!deletedBankDetail) {
      return res
        .status(404)
        .json({ message: "Bank details not found for the student" });
    }

    res.json({
      message: "Bank details deleted successfully",
      bankDetails: deletedBankDetail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  bankDetails,
  addBankDetails,
  removeBankDetails,
  editBankDetails,
};
