const Comment  = require("../models/Comment");

const CommentService = {
    create: async (data) => {
        return Comment.create(data);
    },
    getList: async (condition, options, sortBy) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Comment.find(condition)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
    },
    getOne: async (id) => {
        return Comment.findById(id);
    },
    update: async (id, data) => {
        return Comment.findByIdAndUpdate(id, {$set: data});
    },
    delete: async (id) => {
        return Comment.findByIdAndDelete(id);
    }
};

module.exports = CommentService;