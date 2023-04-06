const Log = require('../models/Log');

const LogService = {
    create: async (data) => {
        return Log.create(data);
    },
    getList: async (condition, options, sortBy) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Log.find(condition).sort(sortBy).skip(skip).limit(limit);
    },
    getOne: async (condition) => {
        return Log.findOne(condition);
    },
    getOneByID: async (id) => {
        return Log.findById(id);
    },
    update: async (id, data) => {
        return Log.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return Log.findByIdAndDelete(id);
    },
};

module.exports = LogService;
