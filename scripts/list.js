'use strict';

require.config({
    paths: {
        'jquery': 'jquery-1.11.3',
        'nav': 'nav',
        'goodsList': 'goodsList'
    }
})

require(['nav', 'goodsList'], function (nav, goodsList) {
    nav.topNavDownload();
    nav.topNavTab();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.searchTab();
    nav.allGoodsTab();

    goodsList.download();
    goodsList.banner();
})