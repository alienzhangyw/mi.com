'use strict';
requirejs.config({
    paths: {
        'jquery': 'jquery-1.11.3',
        'jquery-cookie': 'jquery.cookie',
        'nav': 'nav',
        'slide': 'slide',
        'data': 'data'
    },
    shim: {
        'jquery-cookie': ['jquery']
    }
})

require(['nav', 'slide', 'data'], function (nav, slide, data) {
    nav.bannerDownload();
    nav.banner();
    nav.topNavDownload();
    nav.topNavTab();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.searchTab();

    slide.download();
    slide.countDown();

    data.download();
    data.tabMenu();
})