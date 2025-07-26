const mongoose = require('mongoose')
const {mogopath} = require('../config/config.default')

async function main(){
    await mongoose.connect(mogopath)
}

main().then(res=>{
    console.log('连接成功');
    
}).catch(err=>{
    console.log('连接失败');
    
})

module.exports = {
    User:mongoose.model('User',require('./userModel')),
    Video:mongoose.model('Video',require('./videoModel')),
    Subscribe:mongoose.model('Subscribe',require('./subscribeModel')),
    VideoComment:mongoose.model('VideoComment',require('./videocommentModel')),
    VideoLike:mongoose.model('VideoLike',require('./videolikeModel'))
}
