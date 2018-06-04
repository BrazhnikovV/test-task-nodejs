// подключить главные модули приложения
var express = require('express');
var router = express.Router();
// подключить express-form
var form = require('express-form');
var field = form.field;
// Модель пользователя системы
var User = require( '../app/models/user' ).User;

/* GET login page. */
router.get('/', function(req, res, next) {
    if ( req.session.hasOwnProperty( 'user' ) ) {      
        res.locals.user = req.session.user;  
        res.redirect( '/' );
    }
    else {
        res.locals.user = 'Guest';
        res.render( './pages/login', { 
             title: '', errors: []
        });
    } 
});

/* POST login page. */
router.post( '/',
    // Form filter and validation middleware 
    form(
        field( "username" ).trim().required().is( /^[a-zA-z]+$/ ),
        field( "password" ).trim().required().is( /^[0-9]+$/ )
    ),

    // Express request-handler now receives filtered and validated data 
    function(req, res){
        res.locals.breadcrumbs = {};
        if ( !req.form.isValid ) {
            res.render( 'pages/login', { 
                title: req.form.errors, 
                errors: req.form.errors,
                user: 'Guest'
            });
        } 
        else {
            User.find({ username: req.form.username },function ( err, results ) {
                if ( err ) {
                    return console.error(err);
                }

                if ( results.length ) {
                    req.session.user = req.form.username;
                    req.user = req.form.username;
                    res.redirect( '/' );                
                }
                else {
                    res.locals.user = 'Guest';
                    res.render( 'pages/login', { 
                        title: req.form.errors, 
                        errors: ['Пользователь не найден.']
                    });
                }
            });            
        }
    }
);

module.exports = router;
