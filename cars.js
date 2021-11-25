var express = require('express');
var router = express.Router();

router.get('/cars', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	context.jsscripts = ["searchcars.js"]
	mysql.pool.query("SELECT * FROM cars", function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.cars = results;
		res.render('cars', context);
	});
});

function getCarsByBodyType(req, res, mysql, context, complete) {
	var searchItems = mysql.pool.escape(req.params.s);
	for (var i = 0; i < searchItems.length; i++) {
		var num = getID(searchItems[i]);
		searchItems[i] = num;
	}
	var query = "SELECT * FROM  cars WHERE bodyID = '' ";
	for (var i = 0; i < searchItems.length; i++) {
		query += "OR bodyID = " + searchItems[i];
	}
	mysql.pool.query(query, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.cars = results;
		complete();
	})
}

router.get('/search/:s', function(req, res){
	var callbackCount = 0;
	var context = {};
	context.jsscripts = ["searchcars.js"];
	var mysql = req.app.get('mysql');
	getCarsByBodyType(req, res, mysql, context, complete);
	function copmlete(){
		callbackCount++;
		if(callbackCount >= 2){
			res.render("people", context);
		}
	}
});

router.post('/cars', function(req, res){
	var mysql = req.app.get('mysql');

	var sql = "INSERT INTO cars (bodyID, make, model, year, mileage) VALUES (?, ?, ?, ?, ?)";
	var inserts = [getID(req.body.body), req.body.make, req.body.model, req.body.year, req.body.mileage];
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/cars');
		}
	});
});



function getID(body) {
	var id;
	switch(body) {
		case "sedan":
			id = 1;
			break;
		case "van":
			id = 2;
			break;
		case "truck":
			id = 3;
			break;
		case "suv":
			id = 4;
			break;
		default:
			id = null;
	}
	return id;
}

module.exports = router;