const { check } = require('express-validator');
const MemberService = require('../services/MemberService');
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
];
