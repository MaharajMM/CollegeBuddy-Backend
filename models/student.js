const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  registrationNo: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  phoneNo: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  session: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  profilePicture: {
    type: String,
    // You can store a URL or file path for the profile picture
  },
});

// Create a User model based on the schema
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

// export default mongoose.model("User", userSchema);
