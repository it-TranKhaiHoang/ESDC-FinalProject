const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const upload = require('../middleware/multer');

router.post('/create', upload.array('files'), TaskController.postCreateTask);
router.get('/:id', TaskController.getDetail);
module.exports = router;
