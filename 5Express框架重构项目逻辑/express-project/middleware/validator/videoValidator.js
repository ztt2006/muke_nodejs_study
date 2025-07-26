const { body, validationResult } = require("express-validator");
const validate = require('./errorBack')
module.exports.videoValidator = validate([
  body("title")
    .notEmpty()
    .withMessage("标题不能为空").bail()
    .isLength({ max: 20 })
    .withMessage("标题长度不能大于20位"),
  body("vodvideoId")
    .notEmpty()
    .withMessage("视频id不能为空").bail()
])
