const AssignService = require('../services/AssignService');
const { check, validationResult } = require('express-validator');
const TaskService = require('../services/TaskService');
const LogService = require('../services/LogService');
const AssignController = {
    // POST: /assign/create
    postCreateAssign: (req, res, next) => {
        const files = req.files;
        const { id, description } = req.body;
        if (!files) {
            req.flash('error', 'Please choose files');
            return res.redirect(`/project/${req.session.projectID}}`);
        }
        let attachments = [];
        files.map((f) => {
            const url = `/uploads/attachments/member/${f.filename}`;
            attachments.push(url);
        });
        const user = req.session.user;
        const assign = { leader: user.id, task: id, attachments };
        AssignService.create(assign)
            .then((assign) => {
                TaskService.getOneByID(id)
                    .then((task) => {
                        attachments.forEach((item) => {
                            task.attachments.push(item);
                        });
                        task.save();
                        LogService.create({ author: user.id, task: id, body: description })
                            .then(() => {
                                req.flash('success', 'Add attachments successful');
                                return res.redirect(`/project/${req.session.projectID}`);
                            })
                            .catch((err) => {
                                req.flash('error', 'Create new assign failed ' + err);
                                return res.redirect(`/project/${req.session.projectID}`);
                            });
                    })
                    .catch((err) => {
                        req.flash('error', 'Create new assign failed ' + err);
                        return res.redirect(`/project/${req.session.projectID}`);
                    });
            })
            .catch((err) => {
                req.flash('error', 'Create new assign failed ' + err);
                return res.redirect(`/project/${req.session.projectID}`);
            });
    },
};

module.exports = AssignController;
