// подключить главные модули приложения
var express = require('express');
// Модель продуктов системы
var Product = require( '../../app/models/product' ).Product;
// Количество продуктов на странице
var count_prods_on_page = 1;
// Объект pagination
var pagination = {};


module.exports = function(req, res, next) {
    console.log('<<<<<<<<<<<<< ===== I ===== >>>>>>>>>>>>>>>');
    Product.count({}, function( err, result ) {               
        pagination.cnt_records = result;
        res.locals.pagination = pagination;
        console.log(res.locals); 
    });
    next();
};
