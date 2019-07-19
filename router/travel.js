//引入express模块
const express = require("express");
const session = require("express-session");
//引入连接池
const pool = require("../pool");
//创建路由器对象
var router = express.Router();

//session
router.use(session({
    secret: "128位字符串",
    resave: true,
    saveUninitialized: true
}))

//添加路由
//验证手机号
router.post("/phone", (req, res) => {
    var obj = req.body;
    pool.query("select * from travel_member where cellphone=?", [obj.cellphone], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 1, msg: "手机号已存在", result });
        } else {
            res.send({ code: -1, msg: "手机号可以使用" });
        }
    })
})
//注册
router.post("/reg", (req, res) => {
    var obj = req.body;
    pool.query("INSERT INTO travel_member SET ?", [obj], function (err, result) {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "注册成功", result });
        } else {
            res.send({ code: -1, msg: "注册失败" });
        }
    })
})
//登录
router.post("/login", (req, res) => {
    var obj = req.body;
    pool.query("select * from travel_member where cellphone=? and password=?", [obj.cellphone, obj.password], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 1, msg: "登录成功", result });
            /*   req.session.userid = result[0].userid; */
            //console.log(req.session.userid)
        } else {
            res.send({ code: -1, msg: "登录失败" });
        }
    })
})

//获取用户信息
router.get("/user", (req, res) => {
    var userid = req.query.userid;
    //console.log(userid)
    /*   console.log(req.session.userid)
        if(!userid){
           res.send({code:-1,msg:"请登录"});
           return
       } */
    pool.query("select * from travel_member where userid=?", [userid], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 1, msg: "查询成功", result });
        } else {
            res.send({ code: -2, msg: "查询失败" });
        }
    })
})
//
//修改用户信息
router.post("/changeData", (req, res) => {
    var { userid, email, address, nickname, gender, age, sign, password } = req.body;
    console.log(userid, email, address, nickname, gender, age, sign, password)
    pool.query("UPDATE travel_member SET email=?,address=?,nickname=?,gender=?,age=?,sign=?,password=? where userid=?", [email, address, nickname, gender, age, sign, password, userid], function (err, result) {
        if (err) throw err;
        console.log(result)
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "修改成功", result });
        } else {
            res.send({ code: -1, msg: "修改失败" });
        }
    })
})

//获取首页焦点图

router.get("/carousel", (req, res) => {
    var sql = "SELECT img_url,id,top,title FROM `travel_carousel` WHERE top=1 ORDER BY `travel_carousel`.`id` ASC"
    pool.query(sql, (err, result) => {
        if (err) throw err;
        /*  req.session.uid = result[0].userid; */
        res.send(result)
    })
})

//获取首页景点推荐分页显示
router.get("/theme", (req, res) => {
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    if (!pno) {
        pno = 1
    };
    if (!pageSize) {
        pageSize = 3
    };
    var sql = "SELECT * FROM travel_indexnew WHERE cate=1 ORDER BY `travel_indexnew`.`id` ASC LIMIT ?,?"
    var off = (pno - 1) * pageSize;
    pageSize = parseInt(pageSize);
    pool.query(sql, [off, pageSize], (err, result) => {
        if (err) throw err;
        var obj = { code: 1, message: "查询成功", data: result };
        var sql = `SELECT count(*) AS c FROM travel_indexnew WHERE cate=1`;
        pool.query(sql, (err, result) => {
            if (err) throw err;
            var pageCount = Math.ceil(result[0].c / pageSize);
            obj.pageCount = pageCount;
            res.send(obj)
        })
    })
})
//首页推荐攻略
router.get("/strate", (req, res) => {
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    if (!pno) {
        pno = 1
    };
    if (!pageSize) {
        pageSize = 2
    };
    var sql = "SELECT * FROM travel_indexnew WHERE cate=2  ORDER BY `travel_indexnew`.`id` DESC LIMIT ?,?"
    var off = (pno - 1) * pageSize;
    pageSize = parseInt(pageSize);
    pool.query(sql, [off, pageSize], (err, result) => {
        if (err) throw err;
        var obj = { code: 1, message: "查询成功", data: result };
        var sql = `SELECT count(*) AS c FROM travel_indexnew WHERE cate=2`;
        pool.query(sql, (err, result) => {
            if (err) throw err;
            var pageCount = Math.ceil(result[0].c / pageSize);
            obj.pageCount = pageCount;
            res.send(obj)
        })
    })
})

//攻略热门美食
router.get("/food", (req, res) => {
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    if (!pno) {
        pno = 1
    };
    if (!pageSize) {
        pageSize = 6
    };
    var sql = "SELECT * FROM travel_indexnew WHERE cate=3  ORDER BY `travel_indexnew`.`id` DESC LIMIT ?,?"
    var off = (pno - 1) * pageSize;
    pageSize = parseInt(pageSize);
    pool.query(sql, [off, pageSize], (err, result) => {
        if (err) throw err;
        var obj = { code: 1, message: "查询成功", data: result };
        var sql = `SELECT count(*) AS c FROM travel_indexnew WHERE cate=3`;
        pool.query(sql, (err, result) => {
            if (err) throw err;
            var pageCount = Math.ceil(result[0].c / pageSize);
            obj.pageCount = pageCount;
            obj.count = result[0].c;
            res.send(obj)
        })
    })
})

//文章评论列表
router.get("/comment", (req, res) => {
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    var siteid = req.query.siteid;
    if (!pno) {
        pno = 1
    };
    if (!pageSize) {
        pageSize = 3
    };
    var sql = "SELECT * FROM travel_comment WHERE siteid=?  ORDER BY `travel_comment`.`commentid` DESC LIMIT ?,?"
    var off = (pno - 1) * pageSize;
    pageSize = parseInt(pageSize);
    pool.query(sql, [siteid, off, pageSize], (err, result) => {
        if (err) throw err;
        var obj = { code: 1, message: "查询成功", data: result };
        var sql = `SELECT count(*) AS c FROM travel_comment WHERE siteid=?`;
        pool.query(sql, [siteid], (err, result) => {
            if (err) throw err;
            var pageCount = Math.ceil(result[0].c / pageSize);
            obj.pageCount = pageCount;
            obj.count = result[0].c;
            res.send(obj)
        })
    })
})

//添加评论
router.post("/subComment", (req, res) => {
    var obj = req.body;
    pool.query("INSERT INTO travel_comment SET ?", [obj], function (err, result) {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "评论成功", result });
        } else {
            res.send({ code: -1, msg: "评论失败" });
        }
    })
})

//删除评论
router.get("/deleteComment", (req, res) => {
    var commentid = req.query.commentid;
    pool.query("DELETE FROM travel_comment WHERE commentid = ?", [commentid], function (err, result) {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "删除成功", result });
        } else {
            res.send({ code: -1, msg: "删除失败" });
        }
    })
})

//用户评论列表
router.get("/userComment", (req, res) => {
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    var userid = req.query.userid;
    if (!pno) {
        pno = 1
    };
    if (!pageSize) {
        pageSize = 5
    };
    var sql = "SELECT * FROM travel_comment WHERE userid=?  ORDER BY `travel_comment`.`commentid` DESC LIMIT ?,?"
    var off = (pno - 1) * pageSize;
    pageSize = parseInt(pageSize);
    pool.query(sql, [userid, off, pageSize], (err, result) => {
        if (err) throw err;
        var obj = { code: 1, message: "查询成功", data: result };
        var sql = `SELECT count(*) AS c FROM travel_comment WHERE userid=?`;
        pool.query(sql, [userid], (err, result) => {
            if (err) throw err;
            var pageCount = Math.ceil(result[0].c / pageSize);
            obj.pageCount = pageCount;
            obj.count = result[0].c;
            res.send(obj)
        })
    })
})


//获取文章点赞数

router.get("/liked", (req, res) => {
    var sql = "SELECT likenum,unlikenum FROM `travel_indexnew` WHERE id=?"
    pool.query(sql, (err, result) => {
        if (err) throw err;
        /* req.session.uid = result[0].userid; */
        res.send(result)
    })
})

//内容详情页
router.get("/article", (req, res) => {
    var id = req.query.id;
    var sql = `select * from travel_indexnew where id=?`;
    pool.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 1, message: "查询成功", data: result })
        }
    })
})

//判断文章是否收藏
router.get("/hasCollect", (req, res) => {
    var obj = req.query;
    pool.query("select * from travel_collect where siteid=? and userid=?", [obj.siteid, obj.userid], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 1, msg: "已收藏", result });
        } else {
            res.send({ code: -1, msg: "未收藏" });
        }
    })
})

//加入收藏
router.get("/subCollect", (req, res) => {
    var obj = req.query;
    pool.query("INSERT INTO travel_collect SET ?", [obj], function (err, result) {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "评论成功", result });
        } else {
            res.send({ code: -1, msg: "评论失败" });
        }
    })
})
//取消收藏
router.get("/deleteCollect", (req, res) => {
    var obj = req.query;
    console.log(obj)
    pool.query("DELETE FROM travel_collect WHERE siteid = ? and userid=?", [obj.siteid, obj.userid], function (err, result) {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "取消成功", result });
        } else {
            res.send({ code: -1, msg: "取消失败" });
        }
    })
})

//用户收藏夹
router.get("/userCollect", (req, res) => {
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    var userid = req.query.userid;
    if (!pno) {
        pno = 1
    };
    if (!pageSize) {
        pageSize = 5
    };
    var sql = "SELECT * FROM travel_collect WHERE userid=?  ORDER BY `travel_collect`.`collectid` DESC LIMIT ?,?"
    var off = (pno - 1) * pageSize;
    pageSize = parseInt(pageSize);
    pool.query(sql, [userid, off, pageSize], (err, result) => {
        if (err) throw err;
        var obj = { code: 1, message: "查询成功", data: result };
        var sql = `SELECT count(*) AS c FROM travel_collect WHERE userid=?`;
        pool.query(sql, [userid], (err, result) => {
            if (err) throw err;
            var pageCount = Math.ceil(result[0].c / pageSize);
            obj.pageCount = pageCount;
            obj.count = result[0].c;
            res.send(obj)
        })
    })
})

//热门景点
router.get("/hot", (req, res) => {
    var sql = `select * from travel_indexnew where hot=1 ORDER BY travel_indexnew.id DESC`;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 1, message: "查询成功", data: result })
        }
    })
})

//搜索
router.get("/search", (req, res) => {
    var obj = req.query;
    var keyword = `%${obj.keyword}%`;
    var sql = `SELECT * FROM travel_indexnew WHERE content like ? or title like ?`
    pool.query(sql, [keyword, keyword], (err, result) => {
        if (err) { throw err }
        if (result.length > 0) {
            res.send({ code: 1, message: "查询成功", data: result })
        } else {
            res.send({ code: 0, message: "查询失败", data: result })
        }
    })
})

/* router.get("/search", (req, res) => {
    var obj = req.query;
    console.log(obj)
    pool.query('SELECT * FROM travel_search where keyword=?', [obj.keyword], (err, result) => {
        if (err) { throw err }
        console.log(result)
        console.log(123)
        if (result.length<0) {
            console.log(123)
            pool.query('INSERT INTO travel_search SET ?', [obj], (err, result) => {
                if (err) { throw err }
                console.log(result)
            })
        }
    })
    var keyword = `%${obj.keyword}%`;
    var sql = `SELECT * FROM travel_indexnew WHERE content like ? or title like ?`
    pool.query(sql, [keyword, keyword], (err, result) => {
        if (err) { throw err }
        if (result.length > 0) {
            res.send({ code: 1, message: "查询成功", data: result })
        } else {
            res.send({ code: 0, message: "查询失败", data: result })
        }
    })
}) */

//搜索历史
 router.get("/history", (req, res) => {
    sql = `SELECT * FROM travel_search ORDER BY travel_search.searchid DESC`
    pool.query(sql, (err, result) => {
        if (err) { throw err }
        if (result.length > 0) {
            res.send({ code: 1, message: "查询成功", data: result })
        } else {
            res.send({ code: 0, message: "查询失败", data: result })
        }
    })
})


//导出路由器对象
module.exports = router;