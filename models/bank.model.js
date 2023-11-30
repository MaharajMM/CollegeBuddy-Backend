const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bankDetailSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
});

const BankDetail = mongoose.model("BankDetail", bankDetailSchema);

module.exports = BankDetail;
