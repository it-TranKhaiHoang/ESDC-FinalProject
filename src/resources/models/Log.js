const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Log = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Member' },
    msg: { type: String },
});

module.exports = mongoose.model('Log', Log);
