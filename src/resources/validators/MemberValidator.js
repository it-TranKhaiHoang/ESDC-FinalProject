const { check } = require('express-validator');
const MemberService = require('../services/MemberService');
module.exports = [
    check('email')
        .exists()
        .withMessage('Email cannot be empty')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Invalid full name')
        .custom((value) => {
            const authorID = value;
            MemberService.getOne(authorID).then((author) => {
                if (author) throw new Error('This email already exists. Please choose another email');
                return true;
            });
        }),
    check('role').exists().withMessage('Role cannot be empty').notEmpty().withMessage('Role cannot be empty'),
];
