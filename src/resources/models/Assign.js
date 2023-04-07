const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const upload = require("../middleware/multer");
const { getStorage, ref } = require('firebase/storage');

const Assign = new Schema({
    leader: { type: Schema.Types.ObjectId, ref: 'Member' },
    task: { type: Schema.Types.ObjectId, ref: 'Task' },
    attachments: { type: String, required: true },
    status: { type: String, required: true },
});

module.exports = mongoose.model('Assign', Assign);
