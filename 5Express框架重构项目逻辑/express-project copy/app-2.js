const express = require("express");

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express();

const PORT = process.env.PORT || 3000;

// 应用程序级中间件
// app.use((req,res,next)=>{

// })


app.get('/user',(req,res,next)=>{
  console.log(req.method);
  next()
},function(req,res,next){
  console.log('666')
  next()
})


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
