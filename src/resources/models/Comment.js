const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        task: { type: Schema.Types.ObjectId, ref: 'Task' },
        author: { type: Schema.Types.ObjectId, ref: 'Member' },
        body: { type: String },
        status: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Comment', Comment);
