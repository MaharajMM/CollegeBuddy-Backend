const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    default: Date.now(),
  },
});

// Create a User model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;

// export default mongoose.model("User", userSchema);
