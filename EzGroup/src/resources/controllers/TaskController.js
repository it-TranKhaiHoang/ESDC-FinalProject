const TaskService = require('../services/TaskService');

const TaskController = {
    getCreateTask: (req, res, next) => {
        res.render('pages/createTask', { layout: 'admin' });
    },
};

module.exports = TaskController;
