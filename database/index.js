// 在 connect/index.js 文件中
//数据库链接配置
let mysql = require('mysql');
let pool = mysql.createPool({
    host: '62.234.20.203', //数据库地址
    user: 'wedding', //用户名
    password: 'wedding', //用户密码
    database: 'wedding', //数据库名称
    port: 3306
});

let mysqlPool = function( sql, values ) {
    // 返回一个 Promise
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, res) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( res )
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
}


module.exports = mysqlPool;
