const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Log = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Member' },
    task: { type: Schema.Types.ObjectId, ref: 'Task' },
    body: { type: String },
    status: { type: String },
});

module.exports = mongoose.model('Log', Log);
