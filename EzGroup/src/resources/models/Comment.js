const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        task: { type: Schema.Types.ObjectId, ref: 'Task' },
        author: { type: Schema.Types.ObjectId, ref: 'Member' },
        body: { type: String, required: true },
        status: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Comment', Comment);
