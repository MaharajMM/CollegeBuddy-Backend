const express = require("express");
const controller = require("../controller/student-controller");
const markshhetController = require("../controller/marksheet");
const bankController = require("../controller/bankDetails");
const bookController = require("../controller/library");
const attendanceController = require("../controller/attendance");
const router = express.Router();

// router.get("/users", userController.getAllUser);
// router.post("/signup", userController.signup);
// router.post("/register", controller.registerStudent);
router.post("/register", controller.addStudent);
router.get("/login", controller.login);
router.get("/", controller.getStudents);
router.get("/:rollNo", controller.getStudentById);

// marksheet
router.get("/marksheet/:studentId", markshhetController.marksheet);
router.post("/marksheet/:studentId", markshhetController.addMarks);
router.put(
  "/marksheet/:studentId/:semester",
  markshhetController.updateMarksheet
);
router.delete(
  "/marksheet/:studentId/:semester",
  markshhetController.removeSemesterMarksheet
);
router.delete("/marksheet/:studentId/", markshhetController.removeMarksheet);

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

//attendace details
router.post("/attendance/:studentId", attendanceController.addAttendance);
router.get("/attendance/:studentId/", attendanceController.getAttendance);
router.put(
  "/attendance/:studentId/:semester",
  attendanceController.updateAttendance
);
router.delete(
  "/attendance/:studentId/:semester",
  attendanceController.dltAttendance
);
router.delete(
  "/attendance/:studentId/",
  attendanceController.dltStudentAttendance
);

// export default router;

module.exports = router;
