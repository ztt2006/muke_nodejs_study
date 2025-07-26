const express = require("express");
const router = require('./router/index')
const routerVideo = require('./router/video')
// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express();

// app.all('/xx',(req,res)=>{
//   console.log(req.method);
//   res.send('/xx')
// })

// app.get('/us?er',(req,res)=>{
//   res.send(`${req.method}---${req.url}`)
// })

// app.get('/user/:id/video/:vid',(req,res)=>{
//   console.log(req.params);
//   res.send(`${req.method}---${req.url}`)
// })



const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
