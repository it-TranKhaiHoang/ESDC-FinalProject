const CommentService = require('../services/CommentService');

const CommentController = {
    postCreateComment: (req, res, next) => {
        const { author, body } = req.body;
        const comment = { author, body };
        CommentService.create(comment)
            .then(() => {})
            .catch((err) => {});
    },
};

module.exports = CommentController;
