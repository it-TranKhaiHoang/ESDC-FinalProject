const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

router.get('/create', TaskController.getCreateTask);

module.exports = router;
