var mongoose = require('mongoose');

const dbPath = 'mongodb://localhost:27017/node-shop';

mongoose.connect(dbPath);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(
      'the database has been connected !'
  )
});