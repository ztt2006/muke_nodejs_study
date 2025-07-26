const { body, validationResult } = require("express-validator");
const {User} = require('../../model/index')
const validate = require('./errorBack')
module.exports.register = validate([
  body("username")
    .notEmpty()
    .withMessage("用户名不能为空").bail()
    .isLength({ min: 3 })
    .withMessage("用户名长度不能小于3位"),
  body("email")
    .notEmpty()
    .withMessage("邮箱不能为空").bail()
    .isEmail()
    .withMessage("邮箱格式不正确").bail()
    .custom(async (value)=>{
        const user = await User.findOne({email:value})
        if(user){
            return Promise.reject("邮箱已存在")
        }
    }).bail(),
  body("password")
    .notEmpty()
    .withMessage("密码不能为空").bail()
    .isLength({ min: 6 })
    .withMessage("密码长度不能小于6位"),
  body("phone")
    .notEmpty()
    .withMessage("手机号不能为空").bail()
    .isMobilePhone()
    .withMessage("手机号格式不正确")
    .custom(async (value)=>{
        const user = await User.findOne({phone:value})
        if(user){
            return Promise.reject("手机号已存在")
        }
    }).bail(),
])

module.exports.login = validate([
    body("email")
    .notEmpty()
    .withMessage("邮箱不能为空").bail()
    .isEmail()
    .withMessage("邮箱格式不正确").bail()
    .custom(async (value)=>{
        const user = await User.findOne({email:value})
        if(!user){
            return Promise.reject("邮箱不存在")
        }
    }).bail(),
    body("password")
    .notEmpty()
    .withMessage("密码不能为空").bail()
])

module.exports.update = validate([
  body("email")
  .custom(async (value)=>{
      const emailValidate = await User.findOne({email:value})
      if(emailValidate){
          return Promise.reject("邮箱已存在")
      }
  }).bail(),
  body("username")
  .custom(async (value)=>{
      const usernameValidate = await User.findOne({username:value})
      if(usernameValidate){
          return Promise.reject("用户名已存在")
      }
  }).bail(),
  body("phone")
  .custom(async (value)=>{
      const phoneValidate = await User.findOne({phone:value})
      if(phoneValidate){
          return Promise.reject("手机号已存在")
      }
  }).bail(),
])

