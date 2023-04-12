const TaskService = require('../services/TaskService');
const LogService = require('../services/LogService');
const AssignService = require('../services/AssignService');
const Assign = require('../models/Assign');
const CommentService = require('../services/CommentService');
const API_URL = process.env.API_URL || 'http://localhost:5000/api/';
const MemberService = require('../services/MemberService');
const fetch = require('node-fetch');
const Task = require('../models/Task');
const ProjectService = require('../services/ProjectService');
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
                const user = req.session.user;
                LogService.create({ author: user.id, task: t._id, body: 'Create new task' })
                    .then(() => {
                        AssignService.create({ leader: leader, task: t._id, attachments: attachments })
                            .then(async () => {
                                let user = await MemberService.getOneByID(leader);
                                
                                let mail_option = {
                                    receiver: user.email,
                                    subject: `[${user.fullname}] Task Distributed`,
                                    html: `<p>You just have been distributed task <strong>[${t.name}]</strong> by <strong>[${user.fullname}]</strong></p>
                                        <p>Link: http://localhost:8080/project/${id}</p>    
                                    `,
                                };
                                let body = JSON.stringify(mail_option);
                                req.mail_body = body;

                                fetch(API_URL + 'mail/send-email', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: body,
                                })

                                req.flash('success', 'Create new task successfully');
                                res.redirect(`/project/${id}`);

                                // req.flash('success', 'Create new task successfully');
                                // res.redirect(`/project/${id}`);
                            })
                            .catch((err) => {
                                console.log(err);
                                req.flash('error', 'Create new assign fail');
                                res.redirect(`/project/${id}`);
                            });
                    })
                    .catch((err) => {
                        req.flash('error', 'Create new log fail');
                        res.redirect(`/project/${id}`);
                    });
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
        const id = req.params.id;
        TaskService.update(id.split(' ')[0], { status: 'complete' })
            .then((task) => {
                const user = req.session.user;
                LogService.create({ author: user.id, task: task._id, body: 'Complete task' })
                    .then(() => {
                        req.flash('success', 'Update status successful');
                        return res.redirect(`/project/${req.session.projectID}`);
                    })
                    .catch((err) => {
                        req.flash('error', 'Create new log fail');
                        res.redirect(`/project/${req.session.projectID}`);
                    });
            })
            .catch(() => {
                req.flash('error', 'Update status failed');
                return res.redirect(`/project/${req.session.projectID}`);
            });
    },
    getProgressing: (req, res, next) => {
        const id = req.params.id;
        TaskService.update(id.split(' ')[0], { status: 'progressing' })
            .then((task) => {
                const user = req.session.user;
                LogService.create({ author: user.id, task: task._id, body: 'Progressing task' })
                    .then(() => {
                        req.flash('success', 'Update status successful');
                        return res.redirect(`/project/${req.session.projectID}`);
                    })
                    .catch((err) => {
                        req.flash('error', 'Create new log failed');
                        return res.redirect(`/project/${req.session.projectID}`);
                    });
            })
            .catch(() => {
                req.flash('error', 'Update status failed');
                return res.redirect(`/project/${req.session.projectID}`);
            });
    },
    getPending: async (req, res, next) => {
        const id = req.params.id;
        TaskService.update(id.split(' ')[0], { status: 'pending' })
            .then(async (task) => {
                const user = req.session.user;
                let project = await ProjectService.getOneByID(task.project);
                
                let email = project.leader.email;
                let mail_option = {
                    receiver: email,
                    subject: 'Task submission',
                    html: `<p><strong>[${user.fullname}]</strong> just have marked as done task <strong>[${task.name}]</strong> from you</p>
                          <p>Link: http://localhost:8080/project/${project._id}</p>    
                    `,
                };
                let body = JSON.stringify(mail_option);
                req.mail_body = body;
                fetch(API_URL + 'mail/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: body,
                })

                LogService.create({ author: user.id, task: task._id, body: 'Submit task' })
                    .then(() => {
                        req.flash('success', 'Update status successful');
                        return res.redirect(`/project/${req.session.projectID}`);
                    })
                    .catch((err) => {
                        req.flash('error', 'Create new log failed');
                        return res.redirect(`/project/${req.session.projectID}`);
                    });
            })
            .catch(() => {
                req.flash('error', 'Update status failed');
                return res.redirect(`/project/${req.session.projectID}`);
            });
    },
    getUnqualified: (req, res, next) => {
        const id = req.params.id;
        TaskService.update(id.split(' ')[0], { status: 'progressing' })
            .then((task) => {
                const user = req.session.user;
                LogService.create({ author: user.id, task: task._id, body: 'Submit task' })
                    .then(() => {
                        req.flash('success', 'Update status successful');
                        return res.redirect(`/project/${req.session.projectID}`);
                    })
                    .catch((err) => {
                        req.flash('error', 'Create new log failed');
                        return res.redirect(`/project/${req.session.projectID}`);
                    });
            })
            .catch(() => {
                req.flash('error', 'Update status failed');
                return res.redirect(`/project/${req.session.projectID}`);
            });
    },
    getCancel: (req, res, next) => {
        const id = req.params.id;
        TaskService.update(id.split(' ')[0], { status: 'cancel' })
            .then((task) => {
                const user = req.session.user;
                LogService.create({ author: user.id, task: task._id, body: 'Cancel task' })
                    .then(() => {
                        req.flash('success', 'Update status successful');
                        return res.redirect(`/project/${req.session.projectID}`);
                    })
                    .catch((err) => {
                        req.flash('error', 'Create new log fail');
                        res.redirect(`/project/${req.session.projectID}`);
                    });
            })
            .catch(() => {
                req.flash('error', 'Update status failed');
                return res.redirect(`/project/${req.session.projectID}`);
            });
    },
    getTaskByMember: async (req, res, next) => {
        const error = req.flash('error');
        const success = req.flash('success');
        const user = req.session.user;
        TaskService.getList({ members: user.id }, {}, {}, 'members').then(async (tasks) => {
            let todoTask = [];
            let progressTask = [];
            let doneTask = [];

            tasks.forEach(async (item) => {
                const task = {
                    id: item._id,
                    name: item.name,
                    project: item.project,
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
                else if (task.status == 'progressing' || task.status == 'pending') progressTask.push(task);
                else if (task.status == 'done') doneTask.push(task);
            });

            let comments = await CommentService.getList({}, {}, { createdAt: -1 }, 'author');

            res.render('pages/memberTasks', {
                layout: 'admin',
                page: 'Task list',
                success,
                error,
                todoTask,
                progressTask,
                doneTask,
                uid: req.session.user.id,
                email: req.session.email,
                fullname: req.session.fullname,
                position: req.session.position,
                comments,
                comment_count: comments.length,
            });
        });
    },
    postAddMember: (req, res, next) => {
        const { taskID } = req.body;
        // res.json(taskID);
        // TaskService.getOneByID(taskID)
        //     .then((task) => {
        //         if (task) {
        //             task.members.push(memberID);
        //             task.save();
        //             req.flash('success', 'Add member successful');
        //             return res.redirect(`/project/${req.session.projectID}`);
        //         }
        //     })
        //     .catch((err) => {
        //         req.flash('error', 'Add member failed ' + err);
        //         return res.redirect(`/project/${req.session.projectID}`);
        //     });
    },
};

module.exports = TaskController;
