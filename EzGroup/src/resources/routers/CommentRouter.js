const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const auth = require('../auth/auth');

router.get('/list', auth, CommentController.getListCommentByProject);
router.post('/post', auth, CommentController.postCreateComment);
module.exports = router;
