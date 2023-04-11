const express = require('express');
const router = express.Router();
const AssignController = require('../controllers/AssignController');
const { uploadAssign } = require('../middleware/multer');

router.post('/create', uploadAssign.array('files'), AssignController.postCreateAssign);

module.exports = router;
