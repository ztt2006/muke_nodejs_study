// 1：导入http模块
var http = require("http");

var router = require("./router");
// 2：创建服务器
// 获取到服务器的实例对象
var server = http.createServer();

server.listen(8080, function () {
  console.log("http://127.0.0.1:8080");
});

server.on("request", function (req, res) {
  //   console.log(req.method);
  router(req,res);
});
