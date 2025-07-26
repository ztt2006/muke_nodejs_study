const express = require("express");
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router')
const app = express();

app.use(cors())//跨域中间件
app.use(morgan('dev'))//日志中间件
app.use(express.static('public'))//静态资源中间件

app.use(express.json())//解析json数据
app.use(express.urlencoded({extended:true}))//解析urlencoded数据

app.use('/api/v1',router)

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
