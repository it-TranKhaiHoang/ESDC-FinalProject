const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');

router.get('/management', ProjectController.getProjectManagement);
router.get('/list', ProjectController.getList);
router.post('/create', ProjectController.postCreateProject);
router.get('/:id', ProjectController.getDetail);
module.exports = router;
