const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const librarySchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  booksBorrowed: [
    {
      bookTitle: String,
      author: String,
      dueDate: Date,
    },
  ],
});

const Library = mongoose.model("Library", librarySchema);

module.exports = Library;
