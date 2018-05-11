// подключить главные модули приложения
var express = require('express');
var router = express.Router();

// Массив соответсвий названий крошек и url
var breadcrumbs_names = {
    products: 'продукты',
    users:    'пользователи',
    about:    'о нас',
    home:     'гланая',
    add:      'добавить',
    page:     'страница'
};

/* GET all pages. */
router.get('*',function (req, res, next) {
    if ( req.path.search( /\.*.\./i ) === -1 ) {  

        var array_split = req.path.split("/");
        array_split.splice(0, 1);
        let array_urls = array_split;

        res.locals.breadcrumbs = [];
        
        if ( array_urls[0] === '' ) {
            res.locals.breadcrumbs.push({ link: false, name: 'home' });
        }
        else {
            for ( let i = 0; i < array_urls.length; i++ ) {

                var name = '';
                var link = false;

                if ( Number.isInteger(parseInt(array_urls[i])) ) {
                    name = array_urls[i];
                }
                else {
                    name = breadcrumbs_names[array_urls[i]];
                }
                
                if ( array_urls.hasOwnProperty( i + 1 ) ) {                    
                    if ( array_urls[i] === 'page' ) {
                        continue;
                    }   
                    link = true;                                       
                }
                res.locals.breadcrumbs.push({ link: link, name: name, url: '/' + array_urls[i] });
            }    
            res.locals.breadcrumbs.unshift({ link: true, name: 'home', url: '/' });                        
        }
    }
    next();
});

module.exports = router;
