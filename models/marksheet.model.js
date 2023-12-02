const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const marksheetSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "All_Students",
    required: true,
  },
  semesters: [
    {
      semester: {
        type: Number,
        required: true,
      },
      subjects: [
        {
          subjectCode: { type: String },
          subjectName: { type: String, required: true },
          grade: { type: String, required: true },
        },
      ],
      sgpa: { type: Number, required: true },
    },
  ],
});

const Marksheet = mongoose.model("Marksheet", marksheetSchema);

module.exports = Marksheet;
