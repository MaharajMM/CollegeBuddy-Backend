const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noticeSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  downloadUrl: {
    type: String,
    required: true,
  },
});

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
