// 1：导入http模块
var http = require("http");
var fs = require("fs");
var url = require("url");
// 2：创建服务器
// 获取到服务器的实例对象
var server = http.createServer();

server.listen(8080, function () {
  console.log("http://127.0.0.1:8080");
});

server.on("request", function (req, res) {
  //   console.log(req.method);
  if (req.method === "GET") {
    // console.log(req.url);
    // 请求头传参
    console.log(url.parse(req.url, true).query.id);

    if (req.url === "/") {
      fs.readFile("./index.html", "utf-8", function (err, data) {
        res.write(data);
        res.end();
      });
    } else {
      fs.readFile("./1.jpg", function (err, data) {
        res.end(data);
      });
    }
  } else if (req.method === "POST") {
    // 请求体中传参
    // console.log('ppp');

    var data = "";
    req.on("data", function (d) {
      // console.log(d);
      data += d;
    });
    req.on("end", function () {
      console.log(require("querystring").parse(data));
    });
    res.end();
  }
});
