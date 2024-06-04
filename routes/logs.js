let express = require('express');
let router = express.Router();
let mysqlPool = require('../database');
let timeFun = require('../utils/time');
router.post('/add/', async (req, res) => {
    let { content,types,name } = req.body
    var cTime =  timeFun.timeAlls(new Date())
    var uId = 'logs'
    var imgIndex = '0'
    var type = types
    var name = name
    var sql = `insert into WISH (uId,type,imgIndex,name,content,cTime) values ('${uId}','${type}','${imgIndex}','${name}','${content.toString()}','${cTime}')`;
    mysqlPool(sql).then(result=>{
        res.json({
            code:200,
            data: result,
            success: true,
            message: "成功",
        })
    }).catch(err=>{
        res.json({
            code: 501,
            success : false,
            message: err,
        })
    })
})

module.exports = router;
