let timeTrans = function(ns) {  
    var d = new Date(ns);  
    var dformat = [ d.getFullYear(), d.getMonth() + 1, d.getDate() ].join('-');  
    return dformat;  
} 

let timeAlls = function(ns) {  
    // new Date().getTime() 获取时间戳精确到毫秒,13位
    // new Date().getTime() 获取时间戳精确到毫秒,13位
    let date = new Date(ns)
    let Y = date.getFullYear(); //获取系统的年；
    let M = date.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
    let D = date.getDate(); //获取系统日
    let H = date.getHours(); //获取系统时间
    let m = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes(); //分
    let s = date.getSeconds(); //秒
    M = M < 10 ? '0' + M : M
    D = D < 10 ? '0' + D : D
    H = H < 10 ? '0' + H : H
    s = s < 10 ? '0' + s : s
    return Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':' + s
} 

module.exports = {
    timeTrans:timeTrans,
    timeAlls:timeAlls
};
