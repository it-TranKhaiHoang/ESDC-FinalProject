const CommentService = require('../services/CommentService');

const CommentController = {
    postCreateComment: (req, res, next) => {
        const { author, body } = req.body;
        const comment = { author, body };
        CommentService.create(comment)
            .then(() => {})
            .catch((err) => {});
    },
    getListCommentByProject: (req, res, next) => {
        CommentService.getList({project: req.session.projectID}, {}, {createdAt: -1}, 'author')
        .then((comments) => {
            if (comments.length == 0) return res.json({ msg: 'Empty' });
            res.json(comments);
        })
        .catch((err) => {
            return res.json({ msg: 'error' });
        });
    },
};

module.exports = CommentController;
