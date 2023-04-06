const Project  = require("../models/Project");

const ProjectService = {
    create: async (data) => {
        return Project.create(data);
    },
    getList: async (condition, options, sortBy) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Project.find(condition)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
    },
    getOne: async (id) => {
        return Project.findById(id);
    },
    update: async (id, data) => {
        return Project.findByIdAndUpdate(id, {$set: data});
    },
    delete: async (id) => {
        return Project.findByIdAndDelete(id);
    }
};

module.exports = ProjectService;