const { check } = require('express-validator');
const MemberService = require('../services/MemberService');
module.exports = [
    check('email')
        .exists()
        .withMessage('Email cannot be empty. Please enter an email')
        .notEmpty()
        .withMessage('Email cannot be empty. Please enter an email')
        .isEmail()
        .withMessage('Invalid full name')
        .custom((value) => {
            const email = value;
            MemberService.getOne({ email: email }).then((member) => {
                if (member) throw new Error('This email already exists. Please choose another email');
                return true;
            });
        }),
    check('role').exists().withMessage('Role cannot be empty').notEmpty().withMessage('Role cannot be empty'),
];
