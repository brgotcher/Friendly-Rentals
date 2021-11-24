var express = require('express');
var router = express.Router();
router.get('/rentals', function(req, res){
	var context = {};
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




module.exports = router;
