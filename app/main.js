// подключить главные модули приложения
var express     = require( 'express' );
//var compression = require('compression');
//var helmet      = require('helmet');
var ejsLocals   = require( 'ejs-locals' );

var app = express();

//app.use( compression() );
//app.use( helmet() );

var pages = require( __dirname + '/controllers/pages' );

// Поключаем механизм для работы с представлениями
app.engine( 'ejs', ejsLocals )
app.set( 'views', __dirname + '/views' )
app.set( 'view engine', 'ejs' )

// Подключаем папку для статики ==> не рабочий вариант
//app.use( express.static( __dirname + '/public' ) );

// Подключаем папку для статики
app.use( express.static( 'public' ) );

// Установим переменную route
app.use(function ( req, res, next ) {
    app.locals.route = req.url;
    next();
});

app.get( '/', function ( req, res ) { 
    res.redirect( '/home' ); 
});

app.get( '/home', pages.home );

app.get( '/about', pages.about );

module.exports = app;