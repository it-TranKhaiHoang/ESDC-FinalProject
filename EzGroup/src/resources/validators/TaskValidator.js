const { check } = require('express-validator');
const MemberService = require('../services/MemberService');
const ProjectService = require('../services/ProjectService');

module.exports = [
    check('name')
        .exists()
        .withMessage('Name cannot be empty. Please enter name')
        .notEmpty()
        .withMessage('Name cannot be empty. Please enter name'),
    check('project')
        .exists()
        .withMessage('Project cannot be empty. Please choose project')
        .notEmpty()
        .withMessage('Project cannot be empty. Please choose project')
        .custom((value) => {
            ProjectService.getOneByID(value).then((project) => {
                if (!project) throw new Error('Project does not exist');
                return true;
            });
        }),
    check('status').exists().withMessage('Invalid status').notEmpty().withMessage('Invalid status'),
    check('start_date')
        .exists()
        .withMessage('Start date cannot be empty. Please enter start date')
        .notEmpty()
        .withMessage('Start date cannot be empty. Please enter start date'),
    check('end_date')
        .exists()
        .withMessage('End date cannot be empty. Please enter end date')
        .notEmpty()
        .withMessage('End date cannot be empty. Please enter end date'),
    check('member')
        .exists()
        .withMessage('Member cannot be empty. Please choose member')
        .notEmpty()
        .withMessage('Member cannot be empty. Please choose member'),
];
