const Assign = require('../models/Assign');

const AssignService = {
    create: async (data) => {
        return Assign.create(data);
    },
    getList: async (condition, options, sortBy, populate) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Assign.find(condition).sort(sortBy).skip(skip).limit(limit).populate(populate);
    },
    getOne: async (condition) => {
        return Assign.findOne(condition);
    },
    getOneByID: async (id) => {
        return Assign.findById(id);
    },
    update: async (id, data) => {
        return Assign.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return Assign.findByIdAndDelete(id);
    },
};

module.exports = AssignService;
