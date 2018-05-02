// подключить главные модули приложения
var express = require('express');
var router = express.Router();

/* GET logout page. */
router.get('/', function(req, res, next) {
    if ( req.session.hasOwnProperty( 'user' ) ) {
        req.session.destroy();
        res.redirect( '/' );
    }
    else {
        res.status(500).render( 'error', { title: 'Error 500' });
    } 
});

module.exports = router;
