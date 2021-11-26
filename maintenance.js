var express = require('express');
var router = express.Router();
router.get('/maintenance', function(req, res){
	var context = {};
	context.jsscripts = ["deletemaintenance.js"];
	var mysql = req.app.get('mysql');
	mysql.pool.query("SELECT * FROM maintenance", function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.maintenance = results;
		res.render('maintenance', context);
	});
});

router.post('/maintenance', function(req, res){
	var mysql = req.app.get('mysql');

	var sql = "INSERT INTO maintenance (carID, service, date, mCost) VALUES (?, ?, ?, ?)";	
    var inserts = [req.body.carID, req.body.service, req.body.date, req.body.mCost];
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/maintenance');
		}
	});
});

router.delete('/maintenance/:maintID', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM maintenance WHERE maintID = ?";
	var inserts = [req.params.maintID];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.render("maintenance");
		}
	});
});


module.exports = router;
