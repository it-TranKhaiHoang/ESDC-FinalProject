const ProjectService = require('../services/ProjectService');
const TaskService = require('../services/TaskService');
const CommentService = require('../services/CommentService');
const moment = require('moment');
const md5 = require('md5');
const MemberService = require('../services/MemberService');
const ProjectController = {
    getProjectManagement: (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';
        return ProjectService.getList({}, {}, {}, 'leader').then((projects) => {
            let listProject = [];
            projects.forEach((item) => {
                const project = {
                    id: item._id,
                    name: item.name,
                    start_date: moment(item.start_date).format('LLLL'),
                    end_date: moment(item.end_date).format('LLLL'),
                    status: item.status,
                    leader_fullname: item.leader.fullname,
                    leader_email: md5(item.leader.email),
                };
                listProject.push(project);
            });
            res.render('pages/projectManagement', {
                layout: 'admin',
                page: 'Project management',
                success,
                error,
                data: listProject,
                email: req.session.email,
                fullname: req.session.fullname,
                position: req.session.position,
            });
        });
    },
    postCreateProject: (req, res, next) => {
        const { leader, name } = req.body;
        const project = { leader, name, status: 'created' };
        ProjectService.create(project)
            .then(() => {
                req.flash('success', 'Create new project successfully');
                res.redirect('/project/management');
            })
            .catch((err) => {
                req.flash('error', 'Create new project fail');
                res.redirect('/project/management');
            });
    },

    getList: (req, res, next) => {
        return ProjectService.getList({}, {}, {}, 'leader')
            .then((projects) => {
                if (projects.length > 0) {
                    res.status(200).json(projects);
                } else {
                    res.status(404).json({ message: 'Not found' });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    },
    getDetail: (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';
        ProjectService.getOneByID(req.params.id)
            .then(async (project) => {
                if (project) {
                    TaskService.getList({ project: project._id }, {}, {}, 'members').then(async (tasks) => {
                        let todoTask = [];
                        let progressTask = [];
                        let doneTask = [];
                        let listMembersID = [];
                        tasks.forEach((item) => {
                            const members = item.members;
                            let listMembers = [];
                            members.forEach((m) => {
                                listMembersID.push(m._id);
                                listMembers.push({
                                    id: m._id,
                                    fullname: m.fullname,
                                    position: m.position,
                                });
                            });
                            const task = {
                                id: item._id,
                                name: item.name,
                                status: item.status,
                                description: item.description,
                                members: listMembers,
                                start_date: item.start_date,
                                end_date: item.end_date,
                                attachments: item.attachments,
                                comments: item.comments,
                                logs: item.logs,
                            };
                            if (task.status == 'todo') todoTask.push(task);
                            else if (task.status == 'progressing' || task.status == 'pending') progressTask.push(task);
                            else if (task.status == 'complete') doneTask.push(task);
                        });
                        req.session.projectID = project._id;
                        let comments = await CommentService.getList({}, {}, { createdAt: -1 }, 'author');
                        let MemberNotInProject = await MemberService.getList(
                            { _id: { $nin: listMembersID }, position: 'member' },
                            {},
                            {},
                        );
                        let members = [];
                        MemberNotInProject.forEach((m) => {
                            members.push({
                                id: m._id,
                                fullname: m.fullname,
                                position: m.position,
                                email: m.email,
                                status: m.status,
                            });
                        });
                        res.render('pages/index', {
                            layout: 'admin',
                            project,
                            error,
                            success,
                            name: project.name,
                            id: project._id,
                            todoTask,
                            progressTask,
                            doneTask,
                            email: req.session.email,
                            fullname: req.session.fullname,
                            position: req.session.position,
                            comments,
                            comment_count: comments.length,
                            members,
                        });
                    });
                }
            })
            .catch((err) => {});
    },
    getListByMember: (req, res, next) => {
        return ProjectService.getList({}, {}, {}, 'leader').then((projects) => {
            let listProject = [];
            projects.forEach((item) => {
                const project = {
                    id: item._id,
                    name: item.name,
                    start_date: moment(item.start_date).format('LLLL'),
                    end_date: moment(item.end_date).format('LLLL'),
                    status: item.status,
                    leader_fullname: item.leader.fullname,
                    leader_email: item.leader.email,
                };
                listProject.push(project);
            });
            res.render('pages/projectManagement', {
                layout: 'admin',
                page: 'Project management',
                success,
                error,
                data: listProject,
                email: req.session.email,
                fullname: req.session.fullname,
                position: req.session.position,
            });
        });
    },
};

module.exports = ProjectController;
