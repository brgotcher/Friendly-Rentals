var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('public'));
//app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/', express.static('public'));

const customerpreferences = require('./customerpreferences.js');
const cars = require('./cars.js');
const customers = require('./customers.js');
const bodies = require('./bodies.js');
const rentals = require('./rentals.js');
const maintenance = require('./maintenance.js');
app.use(customerpreferences);
app.use(cars);
app.use(customers);
app.use(bodies);
app.use(rentals);
app.use(maintenance);

app.get('/', function (req, res) {
  console.log("test");
  res.render('home');
});

app.get('/cars', function (req, res) {
  res.render('cars');
});

app.get('/customers', function (req, res) {
  res.render('customers');
});

app.get('/rentals', function (req, res) {
  res.render('rentals');
});

app.get('/maintenance', function (req, res) {
  res.render('maintenance');
});

app.get('/bodies', function (req, res) {
  res.render('bodies');
});


app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
