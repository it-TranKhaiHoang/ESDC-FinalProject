const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");

router.get("/list", CommentController.getListCommentByProject);


module.exports = router;