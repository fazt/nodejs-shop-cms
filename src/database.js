const mongoose = require('mongoose');

const { DBURI } = require('./config/database');

mongoose.connect(DBURI, {
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));
