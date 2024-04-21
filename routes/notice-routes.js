const express = require("express");
const noticeController = require("../controller/notice");
const router = express.Router();

//Notice
router.get("/", noticeController.getAllNotices);
router.get("/:noticeId", noticeController.noticeDetails);
router.post("/", noticeController.addNotice);
router.delete("/:noticeId", noticeController.removeNotice);
router.put("/:noticeId", noticeController.editNotice);

module.exports = router;
