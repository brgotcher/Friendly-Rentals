var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
//app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
//app.use('/customerpreferences', require('./customerpreferences.js'));
// app.use('/people_certs', require('./people_certs.js'));
// app.use('/people', require('./people.js'));
// app.use('/planets', require('./planets.js'));
app.use('/', express.static('public'));

const customerpreferences = require('./customerpreferences.js');
const cars = require('./cars.js');
const customers = require('./customers.js');
app.use(customerpreferences);
app.use(cars);
app.use(customers);

app.get('/', function(req,res){
	res.render('home');
});

app.get('/cars', function(req,res){
  res.render('cars');
});

app.get('/customers', function(req,res) {
  res.render('customers');
});

app.get('/rentals', function(req, res) {
  res.render('rentals');
});

app.get('/maintenance', function(req, res) {
  res.render('maintenance');
});

app.get('/bodies', function(req, res) {
  res.render('bodies');
});

// app.get('/customerpreferences', function(req, res) {
//   var context = {};
//   mysql.pool.query('SELECT * FROM preferences', function(err, rows, fields) {
//     if(err){
//       next(err);
//       return;
//     }
//     //context.results = JSON.stringify(rows);
//     context.results = rows;
//     res.render('customerpreferences', context);
//   });
// });

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});