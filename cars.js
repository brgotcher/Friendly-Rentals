var express = require('express');
var router = express.Router();
router.get('/cars', function(req, res){
	var context = {};
	var mysql = req.app.get('mysql');
	mysql.pool.query("SELECT * FROM cars", function(error, results, fields) {
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		context.cars = results;
		res.render('cars', context);
	});
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