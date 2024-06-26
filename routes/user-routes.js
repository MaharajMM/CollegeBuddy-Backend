const express = require("express");
const userController = require("../controller/user-controller");
const noticeController = require("../controller/notice");
const libraryController = require("../controller/admin-library");
const router = express.Router();

router.get("/users", userController.getAllUser);
router.post("/signup", userController.signup);
router.post("/login", userController.login);

//Notice
router.get("/notice", noticeController.getAllNotices);
router.get("/notice/:noticeId", noticeController.noticeDetails);
router.post("/notice", noticeController.addNotice);
router.delete("/notice/:noticeId", noticeController.removeNotice);
router.put("/notice/:noticeId", noticeController.editNotice);

//Library
router.get("/library", libraryController.getAllBooks);
router.get("/library/:bookId", libraryController.getBookDetails);
router.post("/library", libraryController.addBook);
router.delete("/library/:bookId", libraryController.deleteBook);
router.put("/library/:bookId", libraryController.updateBook);

module.exports = router;
