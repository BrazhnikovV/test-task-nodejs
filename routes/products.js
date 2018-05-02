// подключить главные модули приложения
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    if ( req.session.hasOwnProperty( 'user' ) ) {
        res.locals.user = req.session.user;
        res.render( './pages/products', { 
            title: 'Продукты', 
            errors: [],
        });
    }
    else {
        res.locals.user = 'Guest';
        res.render( './pages/products', { 
            title: 'Продукты', 
            errors: [],
        });
    }
});

module.exports = router;
