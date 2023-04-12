const ProjectService = require('../services/ProjectService');
const TaskService = require('../services/TaskService');
const CommentService = require('../services/CommentService');
const moment = require('moment');
const API_URL = process.env.API_URL || 'http://localhost:5000/api/';
const md5 = require('md5');
const fetch = require('node-fetch');
const MemberService = require('../services/MemberService');
const ProjectController = {
    getProjectManagement: async (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';
        const user = req.session.user || '';
        let listProjects = [];
        if (user.position != 'leader') {
            let tasks = await TaskService.getList(
                {},
                {},
                {},
                {
                    path: 'project',
                    populate: {
                        path: 'leader',
                    },
                },
            );
            tasks.forEach((task) => {
                let listMember = task.members;
                let isIncluded = listProjects.some((obj) => JSON.stringify(obj) === JSON.stringify(task.project));
                listMember.forEach((member) => {
                    if (member == user.id && !isIncluded) {
                        listProjects.push(task.project);
                    }
                });
            });
        } else {
            listProjects = await ProjectService.getList({}, {}, {}, 'leader');
        }
        res.render('pages/projectManagement', {
            layout: 'admin',
            page: 'Project management',
            success,
            error,
            data: listProjects,
            email: user.email || '',
            fullname: user.fullname || '',
            position: user.position || '',
        });
    },
    postCreateProject: async (req, res, next) => {
        const { leader, name } = req.body;
        const project = { leader, name, status: 'created' };
        ProjectService.create(project)
            .then(async (project) => {
                let user = await MemberService.getOneByID(leader);
                let mail_option = {
                    receiver: user.email,
                    subject: 'Project Initialization',
                    html: `<p>You just have become leader of project <strong>[${project.name}]<>/strong</p>
                          <p>Link: http://localhost:8080/project/${project._id}</p>    
                    `,
                };
                let body = JSON.stringify(mail_option);
                req.mail_body = body;
                fetch(API_URL + 'mail/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: body,
                });

                req.flash('success', 'Create new project successfully');
                res.redirect('/project/management');
            })
            .catch((err) => {
                console.log(err);
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
    getDetail: async (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';
        const user = req.session.user || '';
        await ProjectService.getOneByID(req.params.id)
            .then(async (project) => {
                if (project) {
                    TaskService.getList({ project: project._id }, {}, {}, 'members').then(async (tasks) => {
                        let todoTask = [];
                        let progressTask = [];
                        let doneTask = [];
                        let listMembersID = [];
                        tasks.forEach((item) => {
                            let listMember = item.members;
                            let isMemberTask;
                            listMember.forEach((member) => {
                                if (member._id == user.id) isMemberTask = true;
                            });
                            if (item.status == 'todo')
                                todoTask.push({
                                    ...item,
                                    uid: user.id,
                                    position: user.position,
                                    isMemberTask: isMemberTask,
                                });
                            else if (item.status == 'progressing' || item.status == 'pending')
                                progressTask.push({
                                    ...item,
                                    uid: user.id,
                                    position: user.position,
                                    isMemberTask: isMemberTask,
                                });
                            else if (item.status == 'complete')
                                doneTask.push({
                                    ...item,
                                    uid: user.id,
                                    position: user.position,
                                    isMemberTask: isMemberTask,
                                });
                        });
                        req.session.projectID = project._id;
                        let comments = await CommentService.getList({}, {}, { createdAt: -1 }, 'author');

                        let MemberNotInProject = await MemberService.getList(
                            { _id: { $nin: listMembersID }, position: 'member' },
                            {},
                            {},
                        );

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
                            uid: user.id || '',
                            email: user.email || '',
                            fullname: user.fullname || '',
                            position: user.position || '',
                            comments,
                            comment_count: comments.length,
                            members: MemberNotInProject,
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
