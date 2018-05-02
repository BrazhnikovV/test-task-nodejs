// подключить главные модули приложения
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    if ( req.session.hasOwnProperty( 'user' ) ) {
        res.render( './pages/about', { 
            title: 'About', errors: []
        });
    }
    else {
        res.redirect( '/login' );
    } 
});

module.exports = router;
