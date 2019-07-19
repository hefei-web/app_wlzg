//引入mysql模块
const mysql = require("mysql");
//创建连接池对象
var pool = mysql.createPool({
    host: 'w.rdc.sae.sina.com.cn',
    port: '3306',
    user: 'lxoo31yzlk',
    password: 'iml4ly5ly3k44yym352k15lm440zwxiwz0yl4zl0',
    database: 'app_gotravel',
    connectionLimit: 20
})
//导出连接池
module.exports = pool;