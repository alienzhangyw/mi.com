'use strict';

require.config({
    paths: {
        'jquery': 'jquery-1.11.3',
        'jquery-cookie': 'jquery.cookie',
        'goodsCart': 'goodsCart'
    },
    shim: {
        'jquery-cookie': ['jquery']
    }
})

require(['goodsCart'], function (goodsCart) {
    goodsCart.showCart();
    goodsCart.checkFunc();
    goodsCart.changeCart();
})