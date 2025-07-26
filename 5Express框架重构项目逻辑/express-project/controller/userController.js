const { User, Subscribe } = require("../model/index");
const { createToken } = require("../util/jwt");
const lodash = require("lodash");
const fs = require("fs");
const { promisify } = require("util");
const rename = promisify(fs.rename);


exports.getchannel = async (req, res) => {
  let channelList = await Subscribe.find({
    channel: req.user.userInfo._id,
  }).populate("user");
  channelList = channelList.map((item) => {
    return lodash.pick(item.user, [
      "_id",
      "username",
      "image",
      "subscribeCount",
      "cover",
      "channeldes",
    ]);
  });
  res.status(200).json(channelList);
}

exports.getsubscribe = async (req, res) => {
  let subscribeList = await Subscribe.find({
    user: req.params.userId,
  }).populate("channel");
  subscribeList = subscribeList.map((item) => {
    return lodash.pick(item.channel, [
      "_id",
      "username",
      "image",
      "subscribeCount",
      "cover",
      "channeldes",
    ]);
  });
  res.status(200).json(subscribeList);
};

// 获取用户信息
exports.getuser = async (req, res) => {
  let isSubscribe = false;
  if (req.user) {
    const record = await Subscribe.findOne({
      channel: req.params.userId,
      user: req.user.userInfo._id,
    });
    if (record) {
      isSubscribe = true;
    }
  }
  const user = await User.findById(req.params.userId);
  // user.isSubscribe = isSubscribe;
  const userData = lodash.pick(user, [
    "_id",
    "username",
    "image",
    "subscribeCount",
    "cover",
    "channeldes",
  ]);

  res.status(200).json({
    ...userData,
    isSubscribe,
  });
};

// 取消关注
exports.unsubscribe = async (req, res) => {
  const userId = req.user.userInfo._id;
  const channelId = req.params.userId;
  if (userId === channelId) {
    return res.status(401).json({ error: "不能取消关注自己" });
  }
  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId,
  });
  if (!record) {
    res.status(401).json({ error: "未关注" });
  } else {
    await record.deleteOne();
    const user = await User.findById(channelId);
    user.subscribeCount--;
    await user.save();
    res.status(200).json({ msg: "取消关注成功", user: user });
  }
};

// 关注频道
exports.subscribe = async (req, res) => {
  const userId = req.user.userInfo._id;
  const channelId = req.params.userId;
  if (userId === channelId) {
    return res.status(401).json({ error: "不能关注自己" });
  }
  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId,
  });
  if (!record) {
    await new Subscribe({
      user: userId,
      channel: channelId,
    }).save();
    const user = await User.findById(channelId);
    user.subscribeCount++;
    await user.save();
    res.status(200).json({ msg: "关注成功" });
  } else {
    res.status(401).json({ error: "不能重复关注" });
  }
};

// 注册
exports.register = async (req, res) => {
  console.log(req.body);
  const userModel = new User(req.body);
  const dbBack = await userModel.save();
  const user = dbBack.toJSON();
  delete user.password;
  res.status(201).json(user);
};

// 用户登录
exports.login = async (req, res) => {
  // 客户端数据验证

  // 连接数据库查询
  var dbBack = await User.findOne(req.body);
  if (!dbBack) {
    res.status(402).json({ error: "邮箱或者密码不正确" });
  }

  //
  dbBack = dbBack.toJSON();
  //   dbBack.token = jwt.sign(dbBack, "d6158027-7ecf-4694-a61f-dd78b8f85661");
  dbBack.token = await createToken(dbBack);
  res.status(200).json(dbBack);
};

// 用户修改
exports.update = async (req, res) => {
  const id = req.user.userInfo._id;
  const dbBack = await User.findByIdAndUpdate(id, req.body, { new: true });
  console.log(dbBack);
  res.status(202).json({ user: dbBack });
};

// 用户头像上传
exports.headimg = async (req, res) => {
  console.log(req.file);
  const fileArr = req.file.originalname.split(".");
  const fileType = fileArr[fileArr.length - 1];
  // console.log(fileType);
  try {
    await rename(
      "./public/" + req.file.filename,
      "./public/" + req.file.filename + "." + fileType
    );
    res.status(201).json({ filepath: req.file.filename + "." + fileType });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

exports.list = async (req, res) => {
  console.log(req.user);
  res.send("/user-list");
};

exports.delete = async (req, res) => {};
