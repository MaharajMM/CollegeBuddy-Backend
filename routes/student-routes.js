const express = require("express");
const controller = require("../controller/student-controller");
const marksheetController = require("../controller/marksheet_controller");
const bankController = require("../controller/bank_details_controller");
const bookController = require("../controller/library_controller");
const attendanceController = require("../controller/attendance_controller");
const router = express.Router();

// router.get("/users", userController.getAllUser);
// router.post("/signup", userController.signup);
// router.post("/register", controller.registerStudent);

//Student
router.post("/register", controller.addStudent);
router.post("/login", controller.login);
router.put("/:rollNo", controller.updateStudent);
router.get("/", controller.getStudents);
router.get("/:rollNo", controller.getStudentById);

// marksheet
router.get("/marksheet/:studentId", marksheetController.marksheet);
router.get(
  "/marksheet/:studentId/:semesterNo",
  marksheetController.getMarksheetBySem
);
router.post("/marksheet/:studentId", marksheetController.addMarks);
router.put(
  "/marksheet/:studentId/:semester",
  marksheetController.updateMarksheet
);
router.delete(
  "/marksheet/:studentId/:semester",
  marksheetController.removeSemesterMarksheet
);
router.delete("/marksheet/:studentId/", marksheetController.removeMarksheet);

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
router.get(
  "/attendance/:studentId/:semesterNo",
  attendanceController.getAttendanceBySem
);
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
