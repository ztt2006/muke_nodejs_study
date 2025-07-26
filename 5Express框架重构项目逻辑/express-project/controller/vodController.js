var RPCClient = require('@alicloud/pop-core').RPCClient;

function initVodClient(accessKeyId, accessKeySecret,) {
    var regionId = 'ap-southeast-1';   // 修改为与存储位置匹配的区域
    var client = new RPCClient({//填入AccessKey信息
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
        endpoint: 'http://vod.' + regionId + '.aliyuncs.com',
        apiVersion: '2017-03-21'
    });

    return client;
}

exports.getvod = async (req, res) => {
  // 从环境变量获取 AccessKey
  const accessKeyId = process.env.ALIYUN_ACCESS_KEY_ID;
  const accessKeySecret = process.env.ALIYUN_ACCESS_KEY_SECRET;
  
  // 检查是否有环境变量
  if (!accessKeyId || !accessKeySecret) {
    return res.status(500).json({ error: '缺少阿里云 VOD 访问凭证，请设置环境变量' });
  }
  
  // 使用环境变量初始化客户端
  let client = initVodClient(accessKeyId, accessKeySecret);

  const vodback = await client.request("CreateUploadVideo", {
    Title: 'test vod',
    FileName: 'filename.mp4',
    // StorageLocation: 'outin-dac50b8a697211f0a61200163e18b13f.oss-ap-southeast-1.aliyuncs.com',
  }, {})
  res.status(200).json({vod:vodback})
};
