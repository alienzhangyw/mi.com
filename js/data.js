'use strict';
// 主页数据加载
define(['jquery'], function ($) {
    // 数据下载
    function download() {
        $.ajax({
            type: 'GET',
            url: '../data/data.json',
            success: function (result) {
                // 第一块
                let firstData = result[0];
                let node = $(`
                <div class = 'home-banner-box'>
                    <a href="#">
                        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1a2f39c9fe0804ace1d3707574c7c86f.jpg?thumb=1&w=1226&h=120&f=webp&q=90" alt=""/>
                    </a>
                </div>
                <div class = "home-brick-box home-brick-row-2-box xm-plain-box">
                    <div class = 'box-hd'>
                        <h2 class = 'title'>${firstData.title}</h2>
                        <div class = "more">
                            <a href="#" class = 'more-link'>
                                查看全部
                                <i class = 'iconfont iconfont-arrow-right-big'></i>
                            </a>
                        </div>
                    </div>
                    <div class = 'hox-bd clearfix'>
                        <div class = 'row'>
                            <div class = 'span4'>
                                <ul class = 'brick-promo-list clearfix'>
                                    <li class = 'brick-item brick-item-l'>
                                        <a href="#">
                                            <img src="${firstData.img}" alt=""/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class = 'span16'>
                                <ul class = 'brick-list clearfix'>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>`);
                node.appendTo('.page-main .container');
                firstData.childs.forEach(child => {
                    $(`
                    <li class = 'brick-item brick-item-m brick-item-m-2'>
                        <a href="#">
                            <div class = 'figure figure-img'>
                                <img width="160" height="160" src="${child.img}" alt=""/>
                            </div>
                            <h3 class = 'title'>
                                ${child.title}
                            </h3>
                            <p class = 'desc'>${child.desc}</p>
                            <p class = 'price'>
                                <span class = 'num'>${child.price}</span>元<span>起</span>
                                ${child.del == 0 ? '' : `<del>${child.del}元</del>`}
                            </p>
                        </a>
                    </li>`).appendTo(node.find('.brick-list'));
                });

                // 后面的数据
                for (let i = 1; i < result.length; i++) {
                    let node = $(
                        `<div class = 'home-banner-box'>
                        <a href="#">
                            <img src="${result[i].topImg}" alt=""/>
                        </a>
                    </div>
                    <div class = 'home-brick-box home-brick-row-2-box xm-plain-box'>
                        <div class = 'box-hd clearfix'>
                            <h2 class = 'title'>${result[i].title}</h2>
                            <div class = 'more'>
                                <ul class = 'tab-list'>
                                    <li class = 'tab-active'>热门</li>
                                    <li>${result[i].subTitle}</li>
                                </ul>
                            </div>
                        </div>
                        <div class = 'box-bd'>
                            <div class = 'row'>
                                <div class = 'span4'>
                                    <ul class = 'brick-promo-list clearfix'>
                                        <li class = 'brick-item  brick-item-m'>
                                            <a href="#">
                                                <img src="${result[i].leftChilds[0]}" alt=""/>
                                            </a>
                                        </li>
                                        <li class = 'brick-item  brick-item-m'>
                                            <a href="#">
                                                <img src="${result[i].leftChilds[1]}" alt=""/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class = 'span16'>
                                    <ul class = "brick-list clearfix">
                                    </ul>
                                    <ul class = "brick-list clearfix hide">
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`);
                    node.appendTo('.page-main .container');
                    // 加载热门商品
                    let hotChilds = result[i].hotChilds;
                    hotChilds.forEach((child, i) => {
                        $(`
                        <div>
                            <li class = 'brick-item ${i == 7 ? 'brick-item-s' : 'brick-item-m brick-item-m-2'}'>
                                <a href="#">
                                    <div class = 'figure figure-img'>
                                        <img width="160" height="160" src="${child.img}" alt=""/>
                                    </div>
                                    <h3 class = 'title'>
                                        ${child.title}
                                    </h3>
                                    ${child.desc ? `<p class = 'desc'>${child.desc}</p>` : ''}
                                    <p class = 'price'>
                                        <span class = 'num'>${child.price}</span>元
                                        ${child.del == 0 ? '' : `<del>${child.del}元</del>`}
                                    </p>
                                </a>
                            </li>
                        </div>`).appendTo(node.find('.brick-list').eq(0));
                    });
                    $(`
                    <li class = 'brick-item brick-item-s'>
                        <a href="#">
                            <div class = 'figure figure-more'>
                                <i class = 'iconfont iconfont-circle-arrow-right'></i>
                            </div>
                            <div class = 'more'>
                                浏览更多
                                <small>热门</small>
                            </div>
                        </a>
                    </li>`).appendTo(node.find('.brick-list').eq(0));

                    // 加载子标题商品
                    let leftChilds = result[i].childs;
                    leftChilds.forEach((child, i) => {
                        $(`
                        <div>
                            <li class = 'brick-item ${i == 7 ? 'brick-item-s' : 'brick-item-m brick-item-m-2'}'>
                                <a href="#">
                                    <div class = 'figure figure-img'>
                                        <img width="160" height="160" src="${child.img}" alt=""/>
                                    </div>
                                    <h3 class = 'title'>
                                        ${child.title}
                                    </h3>
                                    ${child.desc ? `<p class = 'desc'>${child.desc}</p>` : ''}
                                    <p class = 'price'>
                                        <span class = 'num'>${child.price}</span>元
                                        ${child.del == 0 ? '' : `<del>${child.del}元</del>`}
                                    </p>
                                </a>
                            </li>
                        </div>`).appendTo(node.find('.brick-list').eq(1));
                    });
                    $(`
                    <li class = 'brick-item brick-item-s'>
                        <a href="#">
                            <div class = 'figure figure-more'>
                                <i class = 'iconfont iconfont-circle-arrow-right'></i>
                            </div>
                            <div class = 'more'>
                                浏览更多
                                <small>${result[i].subTitle}</small>
                            </div>
                        </a>
                    </li>`).appendTo(node.find('.brick-list').eq(1));
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    // 通过事件委托添加移入移出切换标签
    function tabMenu() {
        $('.page-main .container').on('mouseenter', '.more .tab-list li', function () {
            $(this).addClass('tab-active').siblings('li').removeClass('tab-active');
            $(this).closest('.home-brick-box').find('.box-bd .brick-list').addClass('hide').eq($(this).index()).removeClass('hide');
        });
    }

    return {
        download: download,
        tabMenu: tabMenu
    }
})