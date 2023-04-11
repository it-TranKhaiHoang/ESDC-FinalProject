const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const { upload } = require('../middleware/multer');

router.post('/create', upload.array('files'), TaskController.postCreateTask);
router.get('/complete/:id', TaskController.getComplete);
router.get('/list', TaskController.getTaskByMember);
router.get('/progressing/:id', TaskController.getProgressing);
router.get('/pending/:id', TaskController.getPending);
router.get('/cancel/:id', TaskController.getCancel);
router.get('/unqualified/:id', TaskController.getUnqualified);
router.get('/:id', TaskController.getDetail);
module.exports = router;
