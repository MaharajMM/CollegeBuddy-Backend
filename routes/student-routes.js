const express = require("express");
const controller = require("../controller/student-controller");
const router = express.Router();

// router.get("/users", userController.getAllUser);
// router.post("/signup", userController.signup);
router.post("/register", controller.registerStudent);

// export default router;

module.exports = router;
