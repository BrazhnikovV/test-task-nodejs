// подключить главные модули приложения
var express = require('express');
var router = express.Router();
// подключить express-form
var form = require('express-form');
var field = form.field;
// Модель пользователя системы
var Product = require( '../app/models/product' ).Product;
// Генератор случайных картинок
var fs = require('fs');
var img_gen = require('js-image-generator');
// Объект pagination
var pagination = require('../app/components/pagination');
// Объект pages
var pages = {};
// Дефолтное количество продуктов на странице
var default_cnt_products = 1;

/* GET products page. */
router.get( '/', function( req, res, next ) {      
    Product.find({},function ( err, products ) {
        if ( err ) {
            return console.error( err );
        }

        // !!! Необходимо вынести
        res.locals.user = 'Guest';
        if ( req.session.hasOwnProperty( 'user' ) ) {
            res.locals.user = req.session.user;
        }

        let cur_page = 1; 

        if( typeof req.session.cnt_products_on_page == 'undefined' ) {
            req.session.cnt_products_on_page = default_cnt_products;
        }        
        
        pages = pagination.getObj( 
            products.length, 
            cur_page,
            req.session.cnt_products_on_page
        );        
       
        res.render( './pages/products', { 
            title: 'Продукты', 
            products: products.splice( 0, req.session.cnt_products_on_page ),
            pagination: pages
        });                
    });   
});

/* GET products/page page. */
router.get( '/page/*', function( req, res, next ) {      
    
    let arr_route = req.path.split("/");
    let cur_page  = parseInt( arr_route[2] );

    Product.count({}, function( err, cnt_results ) {        

        Product.find( {}, function ( err, products ) {
            if ( err ) {
                return console.error( err );
            }

            pages = pagination.getObj( 
                cnt_results, 
                cur_page,
                req.session.cnt_products_on_page
            );

            // !!! Необходимо вынести
            res.locals.user = 'Guest';
            if ( req.session.hasOwnProperty( 'user' ) ) {
                res.locals.user = req.session.user;
            }
           
            res.render( './pages/products', { 
                title: 'Продукты', 
                products: products,
                pagination: pages
            });
        })
        .skip( ( cur_page -1 ) * req.session.cnt_products_on_page )
        .limit( req.session.cnt_products_on_page );
    });    
});

/* GET products/add page. */
router.get( '/add', function( req, res, next ) {
    res.locals.user = 'Guest';
    if ( req.session.hasOwnProperty( 'user' ) ) {
        res.locals.user = req.session.user;
    }
    
    res.render( './pages/productadd', { 
        title: 'Добавить продукт',
        errors: [],
    });
});

/* POST products/add page. */
router.post( '/add',
    // Form filter and validation middleware 
    form(
        field( "name" ).trim().required().is( /^[a-zA-z\s']+$/ ),
        field( "title" ).trim().required().is( /^[a-zA-z\s']+$/ ),
        field( "description" ).trim().required().is( /^[a-zA-z\s]+$/ )
    ),

    // Express request-handler now receives filtered and validated data 
    function(req, res){
        if ( !req.form.isValid ) {
            res.locals.user = req.session.user; 
            res.status(401).render( 'pages/productadd', { 
                title: 'Добавить продукт', 
                errors: req.form.errors,
            });
        } 
        else {
            Product.find({ username: req.form.name },function ( err, products ) {
                if ( err ) {
                    return console.error(err);
                }

                res.locals.user = 'Guest';
                if ( req.session.hasOwnProperty( 'user' ) ) {
                    res.locals.user = req.session.user;
                }

                if ( products.length ) {
                    res.render( 'pages/productadd', { 
                        title: 'Добавить продукт', 
                        errors: ['Продукт существует.']
                    });                    
                }
                else {
                    img_gen.generateImage(800, 600, 80, function( err, image ) {
                        fs.writeFileSync('public/dist/images/'+req.form.name+'.jpg', image.data );

                        var product = new Product({ 
                            name: req.form.name, 
                            title: req.form.title,
                            description: req.form.description,
                            image: '/dist/images/'+req.form.name+'.jpg'
                        });
    
                        product.save(function ( err, products ) {
                            res.redirect( '/products' );
                        });
                    });                                       
                }
            });            
        }
    }
);

/* POST products/setcountproducts page. */
router.post( '/setcountproducts',
    function(req, res){        
        res.locals.user = req.session.user;
        req.session.cnt_products_on_page = req.body.select_count_products;
        res.redirect( '/products' );
    }
);

/* POST products/delete page. */
router.post( '/delete',
    function(req, res){
        res.locals.user = 'Guest';
        if ( req.session.hasOwnProperty( 'user' ) ) {
            res.locals.user = req.session.user;
        }

        Product.findOneAndRemove({ name: req.body.product_name },function ( err, products ) {
            if ( err ) {
                return console.error(err);
            }
            res.redirect( '/products' );
        });
    }
);

/* POST products/deleteall page. */
router.post( '/deleteall',
    function( req, res ){        
        res.locals.user = 'Guest';
        if ( req.session.hasOwnProperty( 'user' ) ) {
            res.locals.user = req.session.user;
        } 

        Product.remove(function ( err, products ) {
            if ( err ) {
                return console.error(err);
            }
            res.redirect( '/products' );
        });
    }
);

module.exports = router;
