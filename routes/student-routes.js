const express = require("express");
const controller = require("../controller/student-controller");
const markshhetController = require("../controller/marksheet");
const bankController = require("../controller/bankDetails");
const bookController = require("../controller/library");
const router = express.Router();

// router.get("/users", userController.getAllUser);
// router.post("/signup", userController.signup);
router.post("/register", controller.registerStudent);
router.get("/login", controller.login);

// marksheet
router.get("/marksheet/:studentId", markshhetController.marksheet);
router.post("/marksheet/:studentId", markshhetController.addMarks);

//bank details
router.get("/bank-details/:studentId", bankController.bankDetails);
router.post("/bank-details/:studentId", bankController.addBankDetails);
router.delete("/bank-details/:studentId", bankController.removeBankDetails);
router.put("/bank-details/:studentId", bankController.editBankDetails);

//book details
router.get("/library/:studentId", bookController.getLibraryDetails);
router.post("/library/:studentId", bookController.addBookDetails);
router.delete("/library/:studentId", bookController.removeBookDetails);
router.put("/library/:studentId", bookController.editBookDetails);

// export default router;

module.exports = router;
