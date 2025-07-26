const express = require("express");
const router = require('./router/index')
const routerVideo = require('./router/video')
// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express();
app.use('/user',router)
app.use('/video',routerVideo)


app.use((req,res,next)=>{
  res.status(404).send('404 Not Found')
})


app.use((err,req,res,next)=>{
  res.status(500).send('500 Internal Server Error')
})

const PORT = process.env.PORT || 3000;

// 路由级别中间件


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
