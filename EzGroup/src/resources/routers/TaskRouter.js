const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const { upload } = require('../middleware/multer');
const auth = require('../auth/auth');
const role = require('../auth/role');

router.post('/create', auth, upload.array('files'), TaskController.postCreateTask);
router.get('/addMember/:taskID/:memberID', TaskController.postAddMember);
router.get('/complete/:id', auth, TaskController.getComplete);
router.get('/list', auth, TaskController.getTaskByMember);
router.get('/getOtherMember/:id', TaskController.getMemberNotInTask);
router.get('/progressing/:id', auth, TaskController.getProgressing);
router.get('/pending/:id', auth, TaskController.getPending);
router.get('/cancel/:id', auth, TaskController.getCancel);
router.get('/unqualified/:id', auth, TaskController.getUnqualified);
router.get('/:id', auth, TaskController.getDetail);
module.exports = router;
