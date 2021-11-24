var express = require('express');
var router = express.Router();
router.get('/bodies', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	mysql.pool.query("SELECT * FROM bodies", function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.bodies = results;
		res.render('bodies', context);
	});
});

router.post('/bodies', function(req, res){
	var mysql = req.app.get('mysql');

	var sql = "INSERT INTO bodies (type, ratePerDay) VALUES (?, ?)";	
    var inserts = [req.body.type, req.body.ratePerDay];
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/bodies');
		}
	});
});


module.exports = router;