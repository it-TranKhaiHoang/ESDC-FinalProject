const { check } = require('express-validator');
const MemberService = require('../services/MemberService');
const TaskService = require('../services/TaskService');

module.exports = [
    check('author')
        .exists()
        .withMessage('Invalid author')
        .notEmpty()
        .withMessage('Invalid author')
        .custom((value) => {
            const authorID = value;
            MemberService.getOne(authorID).then((author) => {
                if (!author) throw new Error('Member not exist');
                return true;
            });
        }),
    check('task')
        .exists()
        .withMessage('Invalid author')
        .notEmpty()
        .withMessage('Invalid author')
        .custom((value) => {
            const taskID = value;
            TaskService.getOne(taskID).then((task) => {
                if (!task) throw new Error('Task not exist');
                return true;
            });
        }),
    check('status').exists().withMessage('Invalid status').notEmpty().withMessage('Invalid status'),
    check('body').exists().withMessage('Invalid body').notEmpty().withMessage('Invalid body'),
];
