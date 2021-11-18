var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_gotcherb',
  password        : '7646',
  database        : 'cs340_gotcherb'
});
module.exports.pool = pool;
