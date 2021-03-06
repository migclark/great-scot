var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();
// Common config
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
  saveUninitialized: true,
  secret: 'as9e3e' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

console.log('process.env.NODE_ENV = '+process.env.NODE_ENV);

// Dev only config
if(process.env.NODE_ENV == 'dev') {
  console.log('Using development settings.');
  app.use(errorHandler());
}
// Prod only config
if(process.env.NODE_ENV == 'prod') {
  console.log('Using production settings.');
}


// routes
app.get('/', function(request, response) {
  var categories = [
    { name: 'Action', tagline: 'Trending'},
    { name: 'Drone', tagline: 'Popular'},
    { name: 'Family', tagline: 'Popular'},
    { name: 'Fashion', tagline: 'Popular'},
    { name: 'Food', tagline: 'Popular'},
    { name: 'Portrait', tagline: 'Popular'},
    { name: 'Product', tagline: 'Popular'},
    { name: 'Property', tagline: 'Popular'},
    { name: 'Swim', tagline: 'Popular'},
    { name: 'Wedding', tagline: 'Popular'}
  ];
  response.render('pages/index', {
    categories: categories
  });
});
app.get('/category/:category', function(request, response) {
  var category = {name: request.params.category, tagline: request.params.category};
  response.render('pages/category', {
    category: category
  });
});
app.get('/signup', function(request, response) {
  response.render('pages/signup');
});
app.get('/profile', function(request, response) {
  response.render('pages/profile');
});
app.get('/terms', function(request, response) {
  response.render('pages/terms');
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port', app.get('port'));
});
