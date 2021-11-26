var express = require('express');
var router = express.Router();

router.get('/cars', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	context.jsscripts = ["searchcars.js", "deletecar.js"]
	mysql.pool.query("SELECT * FROM cars", function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.cars = results;
		res.render('cars', context);
	});
});

// helper function for searching cars by body type

function getCarsByBodyType(req, res, mysql, context, complete) {
	console.log("GETCARSBYBODYTYPE");
	console.log(req.params.s);
	var searchItems = req.params.s;
	var searchArr = searchItems.split(',');
	for (var i = 0; i < searchArr.length; i++) {
		console.log(searchArr[i]);
		var num = getID(searchArr[i]);
		searchArr[i] = num;
	}
	var query = "SELECT * FROM  cars WHERE bodyID = ''";
	for (var i = 0; i < searchArr.length; i++) {
		query += " OR bodyID = " + searchArr[i];
	}
	console.log(query);
	mysql.pool.query(query, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.cars = results;
		complete();
	})
}

// helper function for searching cars by body type

function getCarsByMake(req, res, mysql, context, complete) {
	console.log("GETCARSBYMAKE");
	console.log(req.params.s);
	var searchItems = req.params.s;
	var searchArr = searchItems.split(',');
	var query = "SELECT * FROM cars WHERE make = ''";
	for (var i = 0; i < searchArr.length; i++) {
		query += " OR make = '" + searchArr[i] + "'";
	}
	console.log(query);
	mysql.pool.query(query, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.cars = results;
		complete();
	})
}

//search cars by body type

router.get('/cars/searchByBody/:s', function(req, res){
	console.log("SEARCH");
	console.log(req.params.s);
	var callbackCount = 0;
	var context = {};
	context.jsscripts = ["searchcars.js"];
	var mysql = req.app.get('mysql');
	getCarsByBodyType(req, res, mysql, context, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 1){
			console.log(context);
			res.render("cars", context);
		}
	}
});

// search cars by make

router.get('/cars/searchByMake/:s', function(req, res){
	console.log(req.params.s);
	var callbackCount = 0;
	var context = {};
	context.jsscripts = ["searchcars.js"];
	var mysql = req.app.get('mysql');
	getCarsByMake(req, res, mysql, context, complete);
	function complete(){
		callbackCount++;
		if (callbackCount >= 1){
			console.log(context);
			res.render("cars", context);
		}
	}
});

// add route for cars

router.post('/cars', function(req, res){
	var mysql = req.app.get('mysql');
	body = req.body.body;
	var sql = "INSERT INTO cars (bodyID, make, model, year, mileage) VALUES ((SELECT bodyID FROM bodies WHERE type='" + body + "'), ?, ?, ?, ?);";
	var inserts = [req.body.make, req.body.model, req.body.year, req.body.mileage];
	console.log(inserts);
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/cars');
		}
	});
});

// Delete route for Cars

router.delete('/cars/:carID', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM cars WHERE carID = ?";
	var inserts = [req.params.carID];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			// res.redirect('/cars');
			res.render("cars");
		}
	});
});

//function getID(body, function(req, res){
	// console.log("getID param: " + body);
	// console.log(typeof(body));
	// var id;
	// switch(body) {
	// 	case "sedan":
	// 		id = 1;
	// 		break;
	// 	case "van":
	// 		id = 2;
	// 		break;
	// 	case "truck":
	// 		id = 3;
	// 		break;
	// 	case "suv":
	// 		id = 4;
	// 		break;
	// 	default:
	// 		id = null;
	// }
	// console.log("After switch: "+ id);
	// return id;

module.exports = router;