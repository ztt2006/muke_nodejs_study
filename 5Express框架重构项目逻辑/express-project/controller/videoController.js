const { Video, VideoComment, VideoLike,Subscribe } = require("../model/index");
const mongoose = require("mongoose");

exports.likelist = async (req,res)=>{
  const {pageNum=1,pageSize=10} = req.body
  const userId = req.user.userInfo._id
  const likeList = await VideoLike.find({like:1,user:userId}).skip((pageNum-1)*pageSize).limit(pageSize).populate('video','_id title vodvideoId user')
  const total = await VideoLike.countDocuments({like:1,user:userId})
  res.status(200).json({likeList,total})
}


exports.dislikevideo = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user.userInfo._id;
  const videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(401).json({ err: "视频不存在" });
  }
  let isdislike = true;
  const likeInfo = await VideoLike.findOne({ video: videoId, user: userId });
  if (likeInfo && likeInfo.like == -1) {
    await likeInfo.deleteOne();
  } else if (likeInfo && likeInfo.like == 1) {
    likeInfo.like = -1;
    await likeInfo.save();
    isdislike = false;
  } else {
    await new VideoLike({
      video: videoId,
      user: userId,
      like: -1,
    }).save();
    isdislike = false;

  }

  videoInfo.likeCount = await VideoLike.countDocuments({
    video: videoId,
    like: 1,
  });
  videoInfo.dislikeCount = await VideoLike.countDocuments({
    video: videoId,
    like: -1,
  });
  await videoInfo.save();
  res.status(200).json({
    ...videoInfo.toJSON(),
    isdislike,
  });
};

exports.likevideo = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user.userInfo._id;
  const videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(401).json({ err: "视频不存在" });
  }
  let islike = true;
  const likeInfo = await VideoLike.findOne({ video: videoId, user: userId });
  if (likeInfo && likeInfo.like == 1) {
    await likeInfo.deleteOne();
    islike = false;
  } else if (likeInfo && likeInfo.like == -1) {
    likeInfo.like = 1;
    await likeInfo.save();
    islike = true;
  } else {
    await new VideoLike({
      video: videoId,
      user: userId,
      like: 1,
    }).save();
  }

  videoInfo.likeCount = await VideoLike.countDocuments({
    video: videoId,
    like: 1,
  });
  videoInfo.dislikeCount = await VideoLike.countDocuments({
    video: videoId,
    like: -1,
  });
  await videoInfo.save();
  res.status(200).json({
    ...videoInfo.toJSON(),
    islike,
  });
};

exports.deletecomment = async (req, res) => {
  const { videoId, commentId } = req.params;
  const videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(401).json({ err: "视频不存在" });
  }
  const commentInfo = await VideoComment.findById(commentId);
  if (!commentInfo) {
    return res.status(401).json({ err: "评论不存在" });
  }

  if (!commentInfo.user.equals(req.user.userInfo._id)) {
    return res.status(401).json({ err: "无权限删除" });
  }
  await VideoComment.findByIdAndDelete(commentId);
  videoInfo.commentCount--;
  await videoInfo.save();
  res.status(200).json({ msg: "删除成功" });
};

exports.commentlist = async (req, res) => {
  const { videoId } = req.params;
  const { pageNum = 1, pageSize = 10 } = req.body;
  const commentlist = await VideoComment.find({ video: videoId })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createAt: -1 })
    .populate("user", "_id username image");
  const total = await VideoComment.countDocuments({ video: videoId });
  res.status(200).json({ commentlist, total });
};

exports.comment = async (req, res) => {
  const { videoId } = req.params;
  const videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(401).json({ err: "视频不存在" });
  }
  const comment = await new VideoComment({
    content: req.body.content,
    video: videoId,
    user: req.user.userInfo._id,
  }).save();
  videoInfo.commentCount++;
  await videoInfo.save();
  res.status(200).json({ msg: "评论成功", comment });
};

exports.videolist = async (req, res) => {
  const { pageNum = 1, pageSize = 10 } = req.body;
  const videolist = await Video.find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createAt: -1 })
    .populate("user", "_id username cover");
  const total = await Video.countDocuments();
  res.status(200).json({ videolist, total });
};

exports.video = async (req, res) => {
  const { videoId } = req.params;
  let videoInfo = await Video.findById(videoId).populate(
    "user",
    "_id username cover"
  );
  videoInfo = videoInfo.toJSON()
  videoInfo.islike = false
  videoInfo.isdislike = false
  videoInfo.isSubscribe = false
  if(req.user && req.user.userInfo){
    const userId = req.user.userInfo._id
    const likeInfo = await VideoLike.findOne({video:videoId,user:userId,like:1})
    const dislikeInfo = await VideoLike.findOne({video:videoId,user:userId,like:-1})
    if(likeInfo){
      videoInfo.islike = true
    }
    if(dislikeInfo){
      videoInfo.isdislike = true
    }
    if(await Subscribe.findOne({user:userId,channel:videoInfo.user._id})){
      videoInfo.isSubscribe = true
    }
    
  }
  res.status(200).json({ videoInfo });
};

exports.createvideo = async (req, res) => {
  const body = req.body;
  body.user = req.user.userInfo._id;
  const video = new Video(body);
  try {
    const dbback = await video.save();
    res.status(201).json({ dbback });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};
