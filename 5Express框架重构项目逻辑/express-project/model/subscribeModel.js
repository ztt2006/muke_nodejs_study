const mongoose = require('mongoose')
const subscribeSchema = new mongoose.Schema({
    user:{
        type:mongoose.ObjectId,
        required:true,
        ref:'User'
    },
    channel:{
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

module.exports = subscribeSchema