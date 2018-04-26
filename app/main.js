var express = require( 'express' ),
    ejsLocals = require('ejs-locals'),
    app = express(),
    pages = require( __dirname + '/controllers/pages' );

// Поключаем механизм для работы с представлениями
app.engine('ejs', ejsLocals)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// Подключаем папку для статики
app.use(express.static( __dirname + '/public' ) );

//app.get('/', function (req, res) {
//    res.send('Hello, Express!')
//});

app.get( '/', function ( req, res ) { 
    res.redirect( '/home' ); 
});

app.get( '/home', pages.home );

app.get( '/about', pages.about );

module.exports = app;