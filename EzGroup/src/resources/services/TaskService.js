const Task = require('../models/Task');

const TaskService = {
    create: async (data) => {
        return Task.create(data);
    },
    getList: async (condition, options, sortBy) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Task.find(condition).sort(sortBy).skip(skip).limit(limit);
    },
    getOne: async (condition) => {
        return Task.findOne(condition);
    },
    getOneByID: async (id) => {
        return Task.findById(id);
    },
    update: async (id, data) => {
        return Task.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return Task.findByIdAndDelete(id);
    },
};

module.exports = TaskService;
