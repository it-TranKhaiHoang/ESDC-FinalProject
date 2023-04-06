const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Member = new Schema({
    fullname: { type: String },
    nickname: { type: String },
    job: { type: String },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
});

module.exports = mongoose.model('Member', Member);
