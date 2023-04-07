const AssignService = require('../services/AssignService');

const AssignController = {
    // POST: /assign/create
    postCreateAssign: (req, res, next) => {
        const { leader, task } = req.body;
    },
};

module.exports = AssignController;
