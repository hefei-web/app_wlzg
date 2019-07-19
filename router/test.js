const zy = require("./sms_send");
zy.setConfig = {
    //appKey 登录后可以在 管理中心→账号信息 中进行查看
    appKey: 'APP4c11fb7dfdd94d168a20b2de654346ae',
    //taken 登录后可以在 管理中心→应用管理 中进行查看
    token: 'msn0Ma04J735g1O9',
    //templateId  这个就是你的短信签名了， 登录后可以在 管理中心→短信签名 中进行查看
    templateId: 'mtl2x4p33I806Uto'
};
/**

/*发送短信
/*phone 接受短信的用户手机号码
/*code 发送的验证码数据（怎么生成就自己来了）
/*callback 回调函数
*/
zy.sendSms(
    phone,
    code,
    /**
    /*回调函数 
    /*err 错误信息（如网络连接问题……）
    /*data 所有数据（验证码发送结果存在与body中）
    /*mess 验证码发送结果
    /*（data中存放着所有返回参数，而mess中只存放着验证码发送结果的json字符串。json字符串又通过JSON.parse()来转换成json取值）
    */
    function (err, data, mess) {
        if (err) {
            console.log(err);
        } else {
            //console.log(data);
            //console.log(mess);
            console.log(JSON.parse(data.body).reason);
            console.log(JSON.parse(mess).reason);
        }
    }
);
module.exports = zy;