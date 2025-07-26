/**
 * 默认配置
 */

module.exports.uuid = "d6158027-7ecf-4694-a61f-dd78b8f85661";

module.exports.mogopath = 'mongodb://localhost:27017/express-video'

/**
 * 阿里云 VOD 配置
 * 出于安全考虑，请使用环境变量设置以下敏感信息，不要硬编码在代码中
 * 
 * 运行应用前，请设置以下环境变量：
 * - ALIYUN_ACCESS_KEY_ID: 阿里云 AccessKey ID
 * - ALIYUN_ACCESS_KEY_SECRET: 阿里云 AccessKey Secret
 * 
 * 本地开发示例 (Windows CMD):
 * set ALIYUN_ACCESS_KEY_ID=您的AccessKey
 * set ALIYUN_ACCESS_KEY_SECRET=您的AccessSecret
 * 
 * Linux/Mac:
 * export ALIYUN_ACCESS_KEY_ID=您的AccessKey
 * export ALIYUN_ACCESS_KEY_SECRET=您的AccessSecret
 */