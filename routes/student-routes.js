const express = require("express");
const controller = require("../controller/student-controller");
const markshhetController = require("../controller/marksheet");
const router = express.Router();

// router.get("/users", userController.getAllUser);
// router.post("/signup", userController.signup);
router.post("/register", controller.registerStudent);
router.get("/login", controller.login);
router.get("/marksheet/:studentId", markshhetController.marksheet);
router.post("/marksheet/:studentId", markshhetController.addMarks);

// export default router;

module.exports = router;
