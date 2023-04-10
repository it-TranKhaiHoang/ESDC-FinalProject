const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        project: { type: Schema.Types.ObjectId, ref: 'Project' },
        author: { type: Schema.Types.ObjectId, ref: 'Member' },
        body: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Comment', Comment);
