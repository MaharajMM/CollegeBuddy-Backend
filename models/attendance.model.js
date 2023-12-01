const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  attendance: [
    {
      semester: {
        type: Number,
        required: true,
      },
      attendancePercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
    },
  ],
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
