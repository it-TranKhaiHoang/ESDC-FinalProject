const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');
const auth = require('../auth/auth');
const role = require('../auth/role');

router.get('/management', auth, ProjectController.getProjectManagement);
router.get('/list', auth, ProjectController.getList);
router.post('/create', auth, ProjectController.postCreateProject);
router.get('/:id', auth, ProjectController.getDetail);
module.exports = router;
