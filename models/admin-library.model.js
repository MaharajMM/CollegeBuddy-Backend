const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookName: {
    type: String,
    required: true,
  },
  bookNo: {
    type: String,
    required: true,
    unique: true,
  },
  serialNo: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  edition: {
    type: String,
    required: true,
  },
  publication: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
