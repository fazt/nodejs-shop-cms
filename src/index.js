const express = require('express');
const path = require('path');
const engine = require('ejs-mate');

// Intializations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/dashboard/pages', require('./routes/dashboard_pages'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Start the Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
