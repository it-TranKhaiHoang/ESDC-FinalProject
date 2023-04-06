const { check } = require('express-validator');
const MemberService = require('../services/MemberService');

module.exports = [
    check('name')
        .exists()
        .withMessage('Name cannot be empty. Please enter name')
        .notEmpty()
        .withMessage('Name cannot be empty. Please enter name'),
    check('key')
        .exists()
        .withMessage('Key cannot be empty. Please enter key')
        .notEmpty()
        .withMessage('Key cannot be empty. Please enter key'),
    check('type')
        .exists()
        .withMessage('Type cannot be empty. Please enter type')
        .notEmpty()
        .withMessage('Type cannot be empty. Please enter type'),
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
