const TaskService = require('../services/TaskService');
const LogService = require('../services/LogService');
const Log = require('../models/Log');
const mongoose = require('mongoose');
const TaskController = {
    getCreateTask: (req, res, next) => {
        res.render('pages/createTask', { layout: 'admin' });
    },
    postCreateTask: (req, res, next) => {
        const { name, start_date, end_date, leader, status, description, id } = req.body;
        const files = req.files;
        if (!files) {
            req.flash('error', 'Please choose files');
            return res.redirect(`/project/${id}`);
        }
        let attachments = [];
        files.map((f) => {
            const url = `/uploads/attachments/${name}/${f.filename}`;
            attachments.push(url);
        });
        const task = {
            project: id,
            name,
            status,
            description,
            members: [leader],
            start_date,
            end_date,
            comments: [],
            logs: [],
            attachments,
        };
        TaskService.create(task)
            .then((t) => {
                //const ObjectId = mongoose.Types.ObjectId;
                req.flash('success', 'Create new task successfully');
                // console.log({ author: new ObjectId(req.session.id), task: t._id, body: 'Create new task' });
                res.redirect(`/project/${id}`);
            })
            .catch((err) => {
                req.flash('error', 'Create new task fail');
                res.redirect(`/project/${id}`);
            });
    },
    getDetail: (req, res, next) => {
        TaskService.getOneByID(req.params.id)
            .then((task) => {
                if (!task) return res.json({ msg: 'Not found' });
                res.json(task);
            })
            .catch((err) => {
                res.json({ error: err });
            });
    },
};

module.exports = TaskController;
