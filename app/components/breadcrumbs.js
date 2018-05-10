// подключить главные модули приложения
var express = require('express');
var router = express.Router();

//
var breadcrumbs_names = {
    products: 'продукты',
    users: 'пользователи',
    about: 'о нас',
    home: 'гланая',
    add: 'добавить',
    page: 'страница'
};

/* GET all pages. */
router.get('*',function (req, res, next) {
    if ( req.path.search( /\.*.\./i ) === -1 ) {        
        let parsed_url = req.path.split("/");
        if ( parsed_url.length === 2 ) {
            if ( parsed_url[1] === "" ) {
                res.locals.breadcrumbs = ['<li class="breadcrumb-item active" aria-current="page"><i class="fas fa-home"></i>гланая</li>'];
            }
            else {
                res.locals.breadcrumbs = {
                    0 : '<li class="breadcrumb-item"><a href="/"><i class="fas fa-home"></i>гланая</a></li>',
                    1 : '<li class="breadcrumb-item active" aria-current="page">' 
                    + 
                        breadcrumbs_names[parsed_url[1]] 
                    + '</li>' 
                };
            }
        }

        if ( parsed_url.length === 3 ) {
            res.locals.breadcrumbs = {
                0 : '<li class="breadcrumb-item"><a href="/"><i class="fas fa-home"></i>гланая</a></li>',
                1 : '<li class="breadcrumb-item"><a href="/' 
                + 
                    parsed_url[1] + '">' + breadcrumbs_names[parsed_url[1]] 
                + '</a></li>',
                2 : '<li class="breadcrumb-item active" aria-current="page">' 
                + 
                    breadcrumbs_names[parsed_url[2]]
                + '</li>'
            };
        }

        if ( parsed_url.length === 4 ) {
            res.locals.breadcrumbs = {
                0 : '<li class="breadcrumb-item"><a href="/"><i class="fas fa-home"></i>гланая</a></li>',
                1 : '<li class="breadcrumb-item"><a href="/' 
                + 
                    parsed_url[1]
                + '">' 
                + 
                    breadcrumbs_names[parsed_url[1]]
                + '</a></li>',
                2 : '<li class="breadcrumb-item active" aria-current="page">' 
                + 
                    breadcrumbs_names[parsed_url[2]]
                + '</li>',
                3 : '<li class="breadcrumb-item active" aria-current="page">' 
                + 
                    parsed_url[3]
                + '</li>'
            };
        }
    }
    next();
});

module.exports = router;
