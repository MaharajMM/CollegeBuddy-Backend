const Book = require("../models/admin-library.model");

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get book details by ID
const getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({
      message: "success",
      book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a new book
const addBook = async (req, res) => {
  try {
    const { bookName, bookNo, serialNo, author, edition, publication } =
      req.body;

    // Validate the request payload
    if (
      !bookName ||
      !bookNo ||
      !serialNo ||
      !author ||
      !edition ||
      !publication
    ) {
      return res.status(400).json({ message: "Invalid request payload" });
    }

    // Create a new Book instance
    const newBook = new Book({
      bookName,
      bookNo,
      serialNo,
      author,
      edition,
      publication,
    });

    // Save the book to the database
    const savedBook = await newBook.save();

    res.status(201).json({
      message: "Book added successfully",
      book: savedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const { bookName, bookNo, serialNo, author, edition, publication } =
      req.body;

    const existingBook = await Book.findById(bookId);

    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Update the book fields if provided
    existingBook.bookName = bookName || existingBook.bookName;
    existingBook.bookNo = bookNo || existingBook.bookNo;
    existingBook.serialNo = serialNo || existingBook.serialNo;
    existingBook.author = author || existingBook.author;
    existingBook.edition = edition || existingBook.edition;
    existingBook.publication = publication || existingBook.publication;

    // Save the updated book to the database
    const updatedBook = await existingBook.save();

    res.json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    // Find and delete the book
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllBooks,
  getBookDetails,
  addBook,
  updateBook,
  deleteBook,
};
