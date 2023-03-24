const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema({
    name: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project'},
    type: { type: String, required: true },
    status: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'Member'}],
    labels: [{ type: String }],
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    reporter: { type: Schema.Types.ObjectId, ref: 'Member'},
    attachments: [{ type: String }],
    linked: { type: String },
    comments: { type: Schema.Types.ObjectId, ref: 'Comment'},
    logs: { type: Schema.Types.ObjectId, ref: 'Log' }
},
{
    timestamps: true
})

module.exports = mongoose.model('Task', Task);