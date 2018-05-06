// подключить главные модули приложения
var express = require( 'express' );
var router = express.Router();
// подключить сессии от express
var express_session = require( 'express-session' );
// подключить body_parser
var body_parser = require( 'body-parser' );
// подключить cookie_parser
var cookie_parser = require( 'cookie-parser' );
// подключить cookie_parser
var mongo_store = require('connect-mongo')( express_session );
// подключить mongoose
var mongoose = require( '../libs/mongoose' );
// Подключаем конфиг приложения
var config = require( '../config' );
// Подключить зжатие данных
var compression = require('compression');
// Подключить защиту заголовков
var helmet = require('helmet');
// Подключить ejs-locals для лэйаута
var ejsLocals = require( 'ejs-locals' );
// Подключить роутеры
var home   = require( '../routes/home' );
var login  = require( '../routes/login' );
var about  = require( '../routes/about' );
var users  = require( '../routes/users' );
var logout = require( '../routes/logout' );
var products  = require( '../routes/products' );

// Создание главного объекта приложения
var app = express();
app.use( body_parser() );

// Создание сессии пользователя
app.use( express_session({
    secret: config.get( 'session:secret' ),
    key: config.get( 'session:key' ),
    cookie: config.get( 'session:cookie' ),
    store: new mongo_store({
        mongooseConnection: mongoose.connection
    })
 }));

// Подключаем папку для статики
app.use( express.static( 'public' ) );
// Включаем сжатие
app.use( compression() );
// Включаем защиту
app.use( helmet() );

//var pages = require( __dirname + '/controllers/pages' );

// Поключаем механизм для работы с представлениями
app.engine( 'ejs', ejsLocals );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

// Обрабатываем заданные для приложения роуты 
app.get( '/', home );
app.use( '/login', login );
app.use( '/about', about );
app.use( '/users', users );
app.use( '/products', products );
app.use( '/logout', logout );

// Обработать 404-ю ошибку
app.use(function(req, res, next) {
    res.locals.user = 'Guest';
    res.status(404).render( 'error', { title: 'Error 404' });
});

// Обработать все остальные ошибки
app.use(function( err, req, res, next ) {
    console.error( err.stack );
    res.locals.user = 'Guest';
    res.status( 500 ).render( 'error', { 
        title: 'Error 505',
    });
});

module.exports = app;