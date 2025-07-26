const mongoose = require('mongoose')
const videoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    vodvideoId:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.ObjectId,
        required:true,
        ref:'User'
    },
    cover:{
        type:String,
        required:false
    },
    commentCount:{
        type:Number,
        default:0
    },
    likeCount:{
        type:Number,
        default:0
    },
    dislikeCount:{
        type:Number,
        default:0
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

module.exports = videoSchema