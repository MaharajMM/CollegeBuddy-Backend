const Notice = require("../models/notice.model");

// Get all notices
const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json({
      data: notices,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get notice details by ID
const noticeDetails = async (req, res) => {
  try {
    const noticeId = req.params.noticeId;

    const notice = await Notice.findById(noticeId);

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json({
      message: "success",
      notice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a new notice
const addNotice = async (req, res) => {
  try {
    const { date, title, downloadUrl } = req.body;

    // Validate the request payload
    if (!date || !title || !downloadUrl) {
      return res.status(400).json({ message: "Invalid request payload" });
    }

    // Create a new Notice instance
    const newNotice = new Notice({ date, title, downloadUrl });

    // Save the notice to the database
    const savedNotice = await newNotice.save();

    res.status(201).json({
      message: "Notice added successfully",
      notice: savedNotice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a notice
const editNotice = async (req, res) => {
  try {
    const noticeId = req.params.noticeId;
    const { date, title, downloadUrl } = req.body;

    const existingNotice = await Notice.findById(noticeId);

    if (!existingNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    // Update the notice fields if provided
    if (date !== undefined) {
      existingNotice.date = date;
    } else if (title !== undefined) {
      existingNotice.title = title;
    } else if (downloadUrl !== undefined) {
      existingNotice.downloadUrl = downloadUrl;
    }

    // Save the updated notice to the database
    const updatedNotice = await existingNotice.save();

    res.json({
      message: "Notice updated successfully",
      notice: updatedNotice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a notice
const removeNotice = async (req, res) => {
  try {
    const noticeId = req.params.noticeId;

    // Find and delete the notice
    const deletedNotice = await Notice.findByIdAndDelete(noticeId);

    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json({
      message: "Notice deleted successfully",
      notice: deletedNotice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllNotices,
  noticeDetails,
  addNotice,
  removeNotice,
  editNotice,
};
