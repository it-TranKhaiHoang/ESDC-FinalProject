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
    check('status').exists().withMessage('Status cannot be empty').notEmpty().withMessage('Status cannot be empty'),
    check('password')
        .exists()
        .withMessage('Password cannot be empty')
        .notEmpty()
        .withMessage('Password cannot be empty'),
    check('position')
        .exists()
        .withMessage('Position cannot be empty')
        .notEmpty()
        .withMessage('Position cannot be empty'),
];
