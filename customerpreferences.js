
	var express = require('express');
	var router = express.Router();

	router.get('/customerpreferences', function(req,res){
		var context = {};
		var mysql = req.app.get('mysql');
		mysql.pool.query("SELECT * FROM preferences", function(error, results, fields) {
			if(error){
				res.write(JSON.stringify(error));
				res.end();
			}
			context.customerpreferences = results;
			res.render('customerpreferences', context);
		});
	});

	router.post('/customerpreferences', function(req, res){
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO preferences (customerID, bodyID) VALUES (?, ?)";
		var inserts = [req.body.customerID, req.body.bodyID];
		sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
			if(error){
				res.write(JSON.stringify(error));
				res.end();
			} else {
				res.redirect('/customerpreferences');
			}
		});
	});

	router.delete('/customerpreferences/:ids', function(req, res){
		console.log("delete customer preferences")
		var mysql = req.app.get('mysql');
		var sql = "DELETE FROM preferences WHERE carID = ? AND customerID = ?";
		var inserts = [req.params.carID];
		console.log(inserts);
		sql = mysql.pool.query(sql, inserts, function(error, results, fields){
			if(error){
				res.write(JSON.stringify(error));
				res.end();
			} else {
				// res.redirect('/cars');
				res.render("customerpreferences");
			}
		});
	});

	module.exports = router;