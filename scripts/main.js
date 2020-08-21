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
    nav.bannerDownload();
    nav.banner();
    nav.topNavDownload();
    nav.topNavTab();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.searchTab();
})