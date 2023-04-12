const Member = require('../models/Member');

const MemberService = {
    create: async (data) => {
        return Member.create(data);
    },
    getList: async (condition, options, sortBy) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        return Member.find(condition).sort(sortBy).skip(skip).limit(limit).lean();
    },
    getOne: async (condition) => {
        return Member.findOne(condition);
    },
    getOneByID: async (id) => {
        return Member.findById(id);
    },
    update: async (id, data) => {
        return Member.findByIdAndUpdate(id, { $set: data });
    },
    delete: async (id) => {
        return Member.findByIdAndDelete(id);
    },
};

module.exports = MemberService;
