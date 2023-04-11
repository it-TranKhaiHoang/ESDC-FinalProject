const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Assign = new Schema(
    {
        leader: { type: Schema.Types.ObjectId, ref: 'Member' },
        task: { type: Schema.Types.ObjectId, ref: 'Task' },
        attachments: [{ type: String, required: true }],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Assign', Assign);
