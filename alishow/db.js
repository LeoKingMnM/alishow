const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'alishow',
    multipleStatements:true
})
conn.connect();

//导出mysql的链接对象
module.exports = conn;