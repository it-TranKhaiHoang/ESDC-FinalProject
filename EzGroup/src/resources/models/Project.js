const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Project = new Schema(
    {
        leader: { type: Schema.Types.ObjectId, ref: 'Member' },
        name: { type: String, required: true },
        status: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Project', Project);
