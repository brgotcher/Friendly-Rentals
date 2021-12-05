var express = require('express');
var router = express.Router();
router.get('/rentals', function(req, res){
	var context = {};
	context.jsscripts=["deleterental.js", "searchrentals.js"];
	var mysql = req.app.get('mysql');
	mysql.pool.query("SELECT * FROM cars", function (error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.cars = results;
	});
	mysql.pool.query("SELECT * FROM customers", function (error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.customers = results;
	});
	mysql.pool.query("SELECT * FROM rentals", function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.rentals = results;
		res.render('rentals', context);
	});
});

// helper function for searching rentals by last name

function getRentalsByLastName(req, res, mysql, context, complete) {
	console.log(req.params.s);
	var lastName = req.params.s;
	var query = "SELECT * FROM  rentals WHERE customerID = (SELECT customerID FROM customers WHERE customerLast = '" + lastName + "')";
	// for (var i = 0; i < searchArr.length; i++) {
	// 	console.log(searchArr[i]);
	// 	var num = getID(searchArr[i]);
	// 	searchArr[i] = num;
	// }
	// for (var i = 0; i < searchArr.length; i++) {
	// 	query += " OR bodyID = " + searchArr[i];
	// }
	console.log(query);
	mysql.pool.query(query, function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.rentals = results;
		complete();
	})
}

//search rentals by customer last name

router.get('/rentals/searchByLastName/:s', function(req, res){
	console.log("SEARCH");
	console.log(req.params.s);
	var callbackCount = 0;
	var context = {};
	context.jsscripts = ["deleterentals.js", "searchrentals.js"];
	var mysql = req.app.get('mysql');
	mysql.pool.query("SELECT * FROM cars", function (error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.cars = results;
	});
	mysql.pool.query("SELECT * FROM customers", function (error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.customers = results;
	});
	getRentalsByLastName(req, res, mysql, context, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 1){
			console.log(context);
			res.render("rentals", context);
		}
	}
});

router.post('/rentals', function(req, res){
	var mysql = req.app.get('mysql');

	var sql = "INSERT INTO rentals (carID, customerID, start, end, creditCardNum, expDate, cvv, cardZip, totalCost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
	var inserts = [
        req.body.carID, req.body.customerID, req.body.start, 
        req.body.end, req.body.creditCardNum, req.body.expDate, 
        req.body.cvv, req.body.cardZip, req.body.totalCost
    
    ];
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.redirect('/rentals');
		}
	});
});

router.delete('/rentals/:rentalID', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM rentals WHERE rentalID = ?";
	var inserts = [req.params.rentalID];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		} else {
			res.render("rentals");
		}
	});
});




module.exports = router;
