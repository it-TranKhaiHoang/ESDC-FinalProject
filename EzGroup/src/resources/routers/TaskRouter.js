const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const { upload } = require('../middleware/multer');
const auth = require('../auth/auth');
const role = require('../auth/role');

router.post('/create', auth, role(['leader']), upload.array('files'), TaskController.postCreateTask);
router.get('/complete/:id', auth, role(['leader']), TaskController.getComplete);
router.get('/list', auth, TaskController.getTaskByMember);
router.get('/progressing/:id', auth, TaskController.getProgressing);
router.get('/pending/:id', auth, TaskController.getPending);
router.get('/cancel/:id', auth, role(['leader']), TaskController.getCancel);
router.get('/unqualified/:id', auth, role(['leader']), TaskController.getUnqualified);
router.get('/:id', auth, TaskController.getDetail);
module.exports = router;
