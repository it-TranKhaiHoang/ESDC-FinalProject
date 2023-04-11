const express = require('express');
const router = express.Router();
const AssignController = require('../controllers/AssignController');
const { uploadAssign } = require('../middleware/multer');
const auth = require('../auth/auth');

router.post('/create',auth, uploadAssign.array('files'), AssignController.postCreateAssign);

module.exports = router;
