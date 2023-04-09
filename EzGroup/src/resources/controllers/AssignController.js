const AssignService = require('../services/AssignService');
const { check, validationResult } = require('express-validator');
const AssignController = {
    // POST: /assign/create
    postCreateAssign: (req, res, next) => {
        const file = req.file;
        const { leader, task } = req.body;
        if (file) {
            const url = `/uploads/attachments/${task}/${file.filename}`;
            const assign = {
                leader,
                task,
                attachments: url,
                status: 'Pending',
            };
            res.json({ msg: 'upload successfully', assign });
        } else {
            res.json({ err: 'File not found' });
        }
    },
};

module.exports = AssignController;
