const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Project = new Schema({
    name: { type: String, required: true },
    key: { type:  String, required: true },
    type: { type: String, required: true },
    leader: { type: Schema.Types.ObjectId, ref: 'Member'},
    
},
{
    timestamps: true
})

module.exports = mongoose.model('Project', Project);