// подключить главные модули приложения
var express = require('express');
var router = express.Router();
// подключить express-form
var form = require('express-form');
var field = form.field;

/* GET login page. */
router.get('/', function(req, res, next) {
    if ( req.session.hasOwnProperty( 'user' ) ) {
        res.redirect( '/' );
    }
    else {
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
        if ( !req.form.isValid ) {
            res.render( 'pages/login', { 
                title: req.form.errors, 
                errors: req.form.errors
            });
        } 
        else {
            User.find({ username: req.form.username },function ( err, results ) {
                if ( err ) {
                    return console.error(err);
                }

                if ( results.length ) {
                    req.session.user = req.form.username;
                    res.redirect( '/' );                
                }
                else {                    
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
