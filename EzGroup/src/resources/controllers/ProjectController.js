const ProjectService = require('../services/ProjectService');

const ProjectController = {
    getProjectManagement: (req, res, next) => {
        const error = req.flash('error') || '';
        const success = req.flash('success') || '';
        res.render('pages/projectManagement', {
            layout: 'admin',
            page: 'Project management',
            success,
            error,
        });
    },
    postCreateProject: (req, res, next) => {
        const { leader, name, start_date, end_date } = req.body;
        const project = { leader, name, start_date, end_date, status: 'created' };
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
        ProjectService.getOneByID(req.params.id)
            .then((project) => {
                if (project) {
                    res.render('pages/index', { layout: 'admin', project, name: project.name });
                }
            })
            .catch((err) => {});
    },
};

module.exports = ProjectController;
