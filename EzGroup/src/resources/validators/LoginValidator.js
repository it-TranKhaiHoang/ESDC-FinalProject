const { check } = require('express-validator');
const Member = require('../models/Member');
const bcrypt = require('bcryptjs');

module.exports = [
    check('email')
        .exists()
        .withMessage('Invalid Email')
        .notEmpty()
        .withMessage('Invalid Email')
        .isEmail()
        .withMessage('Invalid Email'),
    check('password')
        .exists()
        .withMessage('Invalid Password')
        .notEmpty()
        .withMessage('Invalid Password')
        .isLength({ min: 6 })
        .withMessage('Invalid Password')
        .custom((value, { req }) => {
            const email = req.body.email;
            return Member.findOne({ email: email })
                .then((member) => {
                    if (!member) {
                        throw new Error('Email Not Found');
                    } else {
                        return bcrypt.compareSync(value, member.password);
                    }
                })
                .then((match) => {
                    if (match) {
                        return true;
                    } else {
                        throw new Error('Incorrect Password');
                    }
                });
        }),
];
