// подключить главные модули приложения
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    if ( req.session.hasOwnProperty( 'user' ) ) {
        res.locals.user = req.session.user;
        res.render( './pages/home', { 
            title: 'Home', 
            errors: [],
        });
    }
    else {
        res.locals.user = 'Guest';
        res.render( './pages/home', { 
            title: 'Home', 
            errors: [],
        });
    }
});

module.exports = router;
