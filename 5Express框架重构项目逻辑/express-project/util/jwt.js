const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { uuid } = require("../config/config.default");
const tojwt = promisify(jwt.sign);
const verify = promisify(jwt.verify);
module.exports.createToken = async (userInfo) => {
  return await tojwt({ userInfo }, uuid, {
    expiresIn: "7d",
  });
};

module.exports.verifyToken = function (required = true) {
  return async (req, res, next) => {
    let token = req.headers.authorization;
    token = token ? token.split(" ")[1] : null;
    if (token) {
      try {
        const userInfo = await verify(token, uuid);
        req.user = userInfo;
        next();
      } catch (error) {
        res.status(402).json({ error: "无效的token" });
      }
    } else if(required) {
      res.status(402).json({ error: "请先登录" });
    }else{
      next()
    }
  };
};
// var token = jwt.sign({foo:'hello'},'555')
// console.log(token);

// var decode = jwt.verify(token,'555')
// console.log(decode);
