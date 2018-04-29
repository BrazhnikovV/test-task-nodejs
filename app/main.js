// подключить главные модули приложения
var express     = require( 'express' );
// подключить body_parser
var body_parser = require('body-parser');
//var compression = require('compression');
//var helmet      = require('helmet');
var ejsLocals   = require( 'ejs-locals' );

// подключить express-form
var form = require('express-form');
var field = form.field;

var app = express();

app.use(body_parser());
//app.use( compression() );
//app.use( helmet() );

var pages = require( __dirname + '/controllers/pages' );

// Поключаем механизм для работы с представлениями
app.engine( 'ejs', ejsLocals );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

// Подключаем папку для статики
app.use( express.static( 'public' ) );

app.get( '/', pages.home );

app.get( '/login', function (req, res) {
    res.render( 'pages/login', { title: '', errors: [] });
});

app.get( '/home', pages.home );

app.get( '/about', pages.about );

// Обработать POST на адрес /login
app.post( '/login',
    // Form filter and validation middleware 
    form(
        field("username").trim().required().is(/^[a-z]+$/),
        field("password").trim().required().is(/^[0-9]+$/)
    ),
   
    // Express request-handler now receives filtered and validated data 
    function(req, res){
        if ( !req.form.isValid ) {
            res.render( 'pages/login', { 
                title: req.form.errors, 
                errors: req.form.errors
            });
        } 
        else {
            res.render( 'pages/login', { });         
        }
    }
);

// Обработать 404-ю ошибку
app.use(function(req, res, next) {
    res.status(404).render('error', { title: 'Error 404' });
});

app.use(function( err, req, res, next ) {
    console.error( err.stack );
    res.status(500).render('error', { title: 'Error 505' });
});

module.exports = app;