const express = require("express");
const userController = require("../controller/user-controller");
const router = express.Router();

router.get("/users", userController.getAllUser);
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// export default router;

module.exports = router;
