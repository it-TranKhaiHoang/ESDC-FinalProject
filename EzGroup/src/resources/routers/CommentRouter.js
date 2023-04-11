const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const auth = require('../auth/auth');

router.get('/list', auth, CommentController.getListCommentByProject);

module.exports = router;
