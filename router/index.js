//引入express模块
const express = require("express");
//引入连接池
const pool = require("../pool");
//创建路由器对象
var router = express.Router();
//添加路由

//获取草稿箱文章列表
router.get("/drfts", (req, res) => {
    var sql =  "SELECT * FROM `travel_drafts` ORDER BY `travel_drafts`.`id` DESC";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
//获取已发布文章列表
router.get("/news", (req, res) => {
    var sql =  "SELECT * FROM `travel_indexnew` ORDER BY `travel_indexnew`.`id` DESC";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);

    })
})
//图集列表
router.get("/picnews", (req, res) => {
    var sql = "SELECT * FROM `travel_indexnew` ORDER BY `travel_indexnew`.`id` DESC";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);

    })
})
//用户登录
router.get("/login", (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    pool.query("select * from travel_admin where username=? and password=?", [username,password], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.send({code:1,result});
        }else{
            res.send({code:-1,msg:"登录失败"});
        }
    })
})
//记录用户登录时间和ip
router.get("/logintime", (req, res) => {
    var lastlogintime = req.query.lastlogintime;
    var lastloginip = req.query.lastloginip;
    var userid = req.query.userid;
    var sql = 'UPDATE travel_admin SET lastlogintime=?,lastloginip=? WHERE userid = ?'
    pool.query(sql, [lastlogintime, lastloginip,userid], function (err, result) {
        if (err) throw err;
        res.send({ code: 1, result });
    })
})
//查询用户名
router.get("/user", (req, res) => {
    var userid = req.query.lid;
    var sql = `select * from travel_admin where userid = ?`;
    pool.query(sql,[userid], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//获取栏目列表
router.get("/cate", (req, res) => {
    var sql = `select * from travel_category`;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//获取评论信息
router.get("/comment", (req, res) => {
    var sql = `select * from travel_comment`;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//删除草稿箱内容
router.get("/deleDrfts", (req, res) => {
    var lid = req.query.lid;
    var sql =  `DELETE FROM travel_drafts WHERE id = ?`;
    pool.query(sql,[lid],(err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//删除已发稿件
router.get("/delenews", (req, res) => {
    var lid = req.query.lid;
    var sql =  `DELETE FROM travel_indexnew WHERE id = ?`;
    pool.query(sql,[lid],(err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//删除栏目
router.get("/deleColumn", (req, res) => {
    var lid = req.query.lid;
    var sql =  `DELETE FROM travel_category WHERE id = ?`;
    pool.query(sql,[lid],(err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//导出路由器对象
module.exports = router;