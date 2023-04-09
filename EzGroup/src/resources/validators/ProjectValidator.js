const { check } = require('express-validator');
const MemberService = require('../services/MemberService');

module.exports = [
    check('name')
        .exists()
        .withMessage('Name cannot be empty. Please enter name')
        .notEmpty()
        .withMessage('Name cannot be empty. Please enter name'),
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
    check('leader')
        .exists()
        .withMessage('Leader cannot be empty. Please choose leader')
        .notEmpty()
        .withMessage('Leader cannot be empty. Please choose leader')
        .custom((value) => {
            MemberService.getOneByID(value).then((member) => {
                if (!member) throw new Error('Leader does not exist');
                return true;
            });
        }),
];
