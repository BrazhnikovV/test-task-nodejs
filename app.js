var express = require('express');
var app = express();

/*
app.set(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.set('development', function(){
    app.use(express.errorHandler());
});
*/

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/about', function (req, res) {
  res.send('about');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});