var express = require('express');
var router = express.Router();

router.get('/bodies', function(req, res){
	var context = {};
	context.jsscripts = ["deletebody.js"];
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

// Delete route for bodies

router.delete('/bodies/:bodyID', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM bodies WHERE bodyID = ?";
	var inserts = [req.params.bodyID];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			// res.redirect('/cars');
			res.render("bodies");
		}
	});
});

module.exports = router;