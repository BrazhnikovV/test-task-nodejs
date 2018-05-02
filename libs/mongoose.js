// Подключаем mongoose
const mongoose = require('mongoose');
// Подключаем конфиг приложения
var config = require( '../config' );

mongoose.connect(config.get('mongoose:uri'),config.get('mongoose:options'));

module.exports = mongoose;

//var mongodb = require('mongodb');
//var url = "mongodb://localhost:27017/users";
/*
mongodb.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
*/