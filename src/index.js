const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const session = require('express-session');
const validator = require('express-validator');
const morgan = require('morgan');

// Intializations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(validator());

// Global Variables
app.locals.errors = null;
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/dashboard/pages', require('./routes/dashboard_pages'));
app.use('/dashboard/categories', require('./routes/dashboard_categories'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Start the Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
