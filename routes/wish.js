let express = require('express');
let router = express.Router();
let mysqlPool = require('../database/index');
let timeFun = require('../utils/time');
function pageCount (totalnum,limit){
    return totalnum > 0 ? ((totalnum < limit) ? 1 : ((totalnum % limit) ? (parseInt(totalnum / limit) + 1) : (totalnum / limit))) : 0;
}
//查询
router.get('/get',  async (req, res)=> {
    let { pageNo,pageSize} = req.query
    const startIndex = (pageNo - 1) * pageSize;
    const queryString = `SELECT * FROM WISH ORDER BY cTime LIMIT ${startIndex}, ${pageSize}`;
    const countSql = 'select count(*) count from WISH ORDER BY cTime'
    Promise.all([mysqlPool(queryString),mysqlPool(countSql)]).then((result)=>{
        let data = result[0]
        let count = result[1][0].count
        res.json({
            code: 200,
            success : true,
            message: '',
            data: data,
            total:count,
            pages:pageCount(count,pageSize),
        })
    }).catch(err=>{
        res.json({
            code: 501,
            success : false,
            message: '',
        })
    })
});
router.post('/add', async (req, res) => {
    let { name,content,uId,type,imgIndex} = req.body

    var cTime = req.body.cTime || timeFun.timeAlls(new Date())
    var sql = `insert into WISH (uId,type,imgIndex,name,content,cTime) values ('${uId}','${type}','${imgIndex}','${name}','${content}','${cTime}')`;
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
            message: '',
        })
    })
})
//修改
router.post( '/change/name', function (req, res) {
    let { name,uId} = req.body
    // 要整个的表单数据
    var sql = `update WISH set name = '${name}' where id = '${uId}'`;
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
            message: '',
        })
    })
})
// //添加
//
// //删除
// router.get('/delete', function (req, res) {
//     var id = parseInt(req.query.id);
//     var sql = `delete from WISH where id='${id}'`;
//     connection.query(sql, function (err, result) {
//         if (err) {
//             console.log('err:', err.message);
//         }
//         res.status(200)
//         res.json({
//             data: result,
//             success: true,
//             msg: "成功",
//         })
//     });
// })
module.exports = router;
