const mongoose = require('mongoose')
const videoLikeSchema = new mongoose.Schema({
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
    like:{
        type:Number,
        enum:[1,-1],
        required:true
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

module.exports = videoLikeSchema