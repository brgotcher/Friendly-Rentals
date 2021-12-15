var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'us-cdbr-east-05.cleardb.net',
  user            : 'b4360afd4a200c',
  password        : '6835c230',
  database        : 'heroku_d0305d9085ac52c'
});
module.exports.pool = pool;
