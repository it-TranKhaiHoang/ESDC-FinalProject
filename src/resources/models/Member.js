const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Member = new Schema({
    fullname: { type: String },
    position: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    status: {type: String, required: true}
});

module.exports = mongoose.model('Member', Member);
