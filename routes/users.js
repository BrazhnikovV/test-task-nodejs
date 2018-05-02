var express = require('express');
var router = express.Router();
// подключить express-form
var form = require('express-form');
var field = form.field;
// Модель пользователя системы
var User = require( '../app/models/user' ).User;

/* GET users listing. */
router.get('/', function(req, res, next) {        
    if ( req.session.hasOwnProperty( 'user' ) ) {              
        User.find({},function ( err, results ) {
            if ( err ) {
                return console.error(err);
            }

            res.locals.user = req.session.user;
            res.render( './pages/users', { 
                  title: 'Пользователи', 
                  errors: [],
                  users: results
            });
        });
    }
    else {
        res.locals.user = 'Guest';  
        res.redirect( '/' );        
    } 
});

/* GET users/add listing. */
router.get('/add', function(req, res, next) {
    if ( req.session.hasOwnProperty( 'user' ) ) {              
        res.locals.user = req.session.user;
        res.render( './pages/useradd', { 
            title: 'Добавить пользователя', 
            errors: []
        });
    }
    else {
        res.locals.user = 'Guest';  
        res.redirect( '/' );        
    } 
});

/* POST login page. */
router.post( '/add',
    // Form filter and validation middleware 
    form(
        field( "username" ).trim().required().is( /^[a-zA-z]+$/ ),
        field( "password" ).trim().required().is( /^[0-9]+$/ )
    ),

    // Express request-handler now receives filtered and validated data 
    function(req, res){
        if ( !req.form.isValid ) {
            res.locals.user = req.session.user; 
            res.status(401).render( 'pages/useradd', { 
                title: 'Добавить пользователя', 
                errors: req.form.errors,
            });
        } 
        else {
            User.find({ username: req.form.username },function ( err, results ) {
                if ( err ) {
                    return console.error(err);
                }

                if ( results.length ) {
                    res.locals.user = req.session.user;
                    res.render( 'pages/useradd', { 
                        title: 'Добавить пользователя', 
                        errors: ['Пользователь существует.']
                    });                    
                }
                else {
                  var user = new User({ 
                    username: req.form.username, 
                    password: req.form.password
                  });

                  user.save(function ( err, results ) {
                      res.redirect( '/users' );
                  });                  
                }
            });            
        }
    }
);

module.exports = router;
