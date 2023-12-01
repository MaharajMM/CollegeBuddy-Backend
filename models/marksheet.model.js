const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const marksheetSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "All_Students",
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      subjectCode: String,
      subjectName: String,
      grade: String,
    },
  ],
  sgpa: {
    type: Number,
    required: true,
  },
});

const Marksheet = mongoose.model("Marksheet", marksheetSchema);

module.exports = Marksheet;
