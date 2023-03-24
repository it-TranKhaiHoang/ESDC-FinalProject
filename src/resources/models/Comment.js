const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Member'},
    body: { type: String }
    
},
{
    timestamps: true
})

module.exports = mongoose.model('Comment', Comment);