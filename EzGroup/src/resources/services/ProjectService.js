const Project = require('../models/Project');

const ProjectService = {
    create: async (data) => {
        return Project.create(data);
    },
    getList: async (condition, options, sortBy, populate) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Project.find(condition).sort(sortBy).skip(skip).limit(limit).populate(populate).lean();
    },
    getOne: async (condition) => {
        return Project.findOne(condition);
    },
    getOneByID: async (id) => {
        return Project.findById(id).populate('leader').lean();
    },
    update: async (id, data) => {
        return Project.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return Project.findByIdAndDelete(id);
    },
};

module.exports = ProjectService;
