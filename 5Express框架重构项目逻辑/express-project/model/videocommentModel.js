const mongoose = require('mongoose')
const videoCommentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    video:{
        type:mongoose.ObjectId,
        required:true,
        ref:'Video'
    },
    user:{
        type:mongoose.ObjectId,
        required:true,
        ref:'User'
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = videoCommentSchema