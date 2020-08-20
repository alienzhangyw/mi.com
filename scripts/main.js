'use strict';
requirejs.config({
    paths: {
        'jquery': 'jquery-1.11.3',
        'jquery-cookie': 'jquery.cookie',
        'nav': 'nav'
    },
    shim: {
        'jquery-cookie': ['jquery']
    }
})

require(['nav'], function (nav) {
    nav.download();
    nav.banner();
    nav.topNavTab();
    nav.leftNavTab();
    nav.searchTab();
})