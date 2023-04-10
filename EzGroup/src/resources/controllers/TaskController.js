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
    getList: (req, res, next) => {
        TaskService.getList({ project: project._id }, {}, {}, 'members').then((tasks) => {
            let todoTask = [];
            let progressTask = [];
            let doneTask = [];
            tasks.forEach((item) => {
                const task = {
                    id: item._id,
                    name: item.name,
                    status: item.status,
                    description: item.description,
                    members: item.members,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    attachments: item.attachments,
                    comments: item.comments,
                    logs: item.logs,
                };
                if (task.status == 'todo') todoTask.push(task);
                else if (task.status == 'progress') progressTask.push(task);
                else doneTask.push(task);
            });
            res.json(todoTask, progressTask, doneTask);
        });
    },
    getComplete: (req, res, next) => {
        TaskService.update(req.params.id, { status: 'complete' })
            .then((task) => {
                req.flash('success', 'Update status successful');
                return res.redirect(`/project/${req.session.projectID}`);
            })
            .catch(() => {
                req.flash('error', 'Update status failed');
                return res.redirect(`/project/${req.session.projectID}`);
            });
    },
    getProgressing: (req, res, next) => {},
    getPending: (req, res, next) => {},
    getCancel: (req, res, next) => {
        TaskService.update(req.params.id, { status: 'cancel' })
            .then((task) => {
                req.flash('success', 'Update status successful');
                return res.redirect(`/project/${req.session.projectID}`);
            })
            .catch(() => {
                req.flash('error', 'Update status failed');
                return res.redirect(`/project/${req.session.projectID}`);
            });
    },
};

module.exports = TaskController;
