//引入express模块
const express = require("express");
//引入cors
const cors = require("cors")
//引入body-parser模块
const bodyParser = require("body-parser");
//引入路由器
const indexRouter = require("./router/index");
const editRouter = require("./router/edit");
const travelRouter = require("./router/travel");
//创建web服务器
var server = express();
//监听端口
server.listen(5050);
//设置cors请求头地址
/* server.use(cors({
    origin: ["http://127.0.0.1:8080",
        "http://localhost:8080", "http://127.0.0.1:5500", "http://127.0.0.1:3000"],
    credentials: true
})) 
 */
//托管静态资源
server.use(express.static("public"));
server.use(express.static("uploadImgs"));

//将post请求转换为对象
server.use(bodyParser.urlencoded({
    extended: false
}))



//挂载路由
server.use("/index", indexRouter);
server.use("/edit", editRouter);
server.use("/travel", travelRouter);

