'use strict';
// 处理首页导航部分
define(['jquery'], function ($) {
    function download () {
        // 数据下载
        $.ajax({
            type: 'GET',
            url: '../data/nav.json',
            success: function (result) {
                // banner图加载
                let bannerArr = result.banner;
                bannerArr.forEach(banner => {
                    $(`<a href='${banner.url}'>
                    <img class='swiper-laze swiper-lazy-loaded' src='../images/banner/${banner.img}' alt=''></a>`)
                        .appendTo('#J_homeSwiper .swiper-slide');
                    $(`<a href="#" class = 'swiper-pagination-bullet swiper-pagination-bullet-active'></a>`)
                        .appendTo('#J_homeSwiper .swiper-pagination');
                });

                // 加载顶部导航栏
                let topArr = result.topNav;
                topArr.push({ title: "服务" }, { title: "社区" });
                topArr.forEach((tab, i) => {
                    $(`<li data-index="${i}" class="nav-item">
                        <a href="javascript: void(0);" class="link">
                            <span class="text">${tab.title}</span>
                        </a>
                    </li>`).appendTo('.site-header .header-nav .nav-list');

                    let node = $(`<ul class = 'children-list clearfix' style = "display: ${i == 0 ? 'block' : 'none'}"></ul>`);
                    node.appendTo('#J_navMenu .container');
                    if (tab.childs) {
                        let childArr = tab.childs;
                        for (let j = 0; j < childArr.length; j++) {
                            $(`<li>
                                <a href='#'>
                                    <div class='figure figure-thumb'>
                                        <img src='${childArr[j].img}' alt=''>
                                    </div>
                                    <div class='title'>${childArr[j].a}</div>
                                    <p class='price'>${childArr[j].i}</p>
                                </a>
                            </li>`).appendTo(node);
                        }
                        node.find('li:first-of-type').addClass('first');
                    }
                });


                // 实现侧边导航栏
                let sideArr = result.sideNav;
                sideArr.forEach(tab => {
                    let node = $(`<li class = 'category-item'>
                        <a href="/index.html" class = 'title'>
                            ${tab.title}
                            <em class = 'iconfont-arrow-right-big'></em>
                        </a>
                        <div class="children clearfix">
                        </div>
                    </li>`);
                    node.appendTo("#J_navCategory #J_categoryList");

                    //取出其中的子节点
                    let childArr = tab.child;
                    let col = Math.ceil(childArr.length / 6);
                    node.find("div.children").addClass("children-col-" + col);
                    for (let i = 0, newUl; i < childArr.length; i++) {
                        if (i % 6 == 0) {
                            newUl = $(`<ul class="children-list children-list-col children-list-col-${Math.floor(i / 6)}"></ul>`);
                            newUl.appendTo(node.find("div.children"));
                        }
                        $(`<li>
                            <a href="#" class="link clearfix">
                                <img src="${childArr[i].img}" width="40" height="40" alt="" class="thumb">
                                <span class="text">${childArr[i].title}</span>
                            </a>
                        </li>`).appendTo(newUl);
                    }
                });
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    // 实现轮播图的轮播效果
    function banner() {
        let iNow = 0; // 当前显示的图片的下标
        let aImgs = null; // 记录图片
        let aBtns = null; // 记录小圆圈

        let timer = setInterval(function () {
            iNow++;
            tab();
        }, 3500);

        // 封装切换函数
        function tab() {
            if (!aImgs) {
                aImgs = $('#J_homeSwiper .swiper-slide').find('a');
            }
            if (!aBtns) {
                aBtns = $('#J_homeSwiper .swiper-pagination').find('a');
            }
            if (iNow == 5) {
                iNow = 0;
            }
            // 图片切换
            aImgs.hide().css('opacity', 0.2).eq(iNow).show().animate({ opacity: 1 }, 500);
            // 小圆圈切换
            aBtns.removeClass('swiper-pagination-bullet-active').eq(iNow).addClass('swiper-pagination-bullet-active');
        }

        // 鼠标移入和移出效果
        $('#J_homeSwiper, .swiper-button-prev, .swiper-button-next').mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            timer = setInterval(function () {
                iNow++;
                tab();
            }, 3500);
        });

        // 点击小圆圈切换对应图片
        $('#J_homeSwiper .swiper-pagination').on('click', 'a', function () {
            iNow = $(this).index();
            tab();
            return false;
        })

        // 左右切换
        $('.swiper-button-prev, .swiper-button-next').click(function () {
            if (this.className == 'swiper-button-prev') {
                iNow--;
                if (iNow == -1) {
                    iNow = 4;
                }
            } else {
                iNow++;
            }
            tab();
        })

    }

    // 侧边导航选项卡切换效果
    function leftNavTab() {
        $('#J_categoryList').on('mouseenter', '.category-item', function () {
            $(this).addClass('category-item-active');
        })
        $('#J_categoryList').on('mouseleave', '.category-item', function () {
            $(this).removeClass('category-item-active');
        })
    }

    // 顶部导航添加移入移出效果
    function topNavTab() {
        $('.header-nav .nav-list').on('mouseenter', '.nav-item', function () {
            $(this).addClass('nav-item-active');
            let index = $(this).index() - 1;
            if (index >= 0 && index <= 6) {
                $('#J_navMenu').css({ display: 'block' }).removeClass('slide-up').addClass('header-nav-menu-active slide-down');
                $('#J_navMenu .container').find('ul').eq(index).css('display', 'block').siblings('ul').css('display', 'none');
            }
        });
        $('.header-nav .nav-list').on('mouseleave', '.nav-item', function () {
            $(this).removeClass('nav-item-active');
            $('#J_navMenu').removeClass('slide-down').addClass('slide-up');
        });
        $('#J_navMenu').mouseenter(function () {
            $(this).css({ display: 'block' }).removeClass('slide-up').addClass('slide-down');
        });
        $('#J_navMenu').mouseleave(function () {
            $(this).css({ display: 'block' }).removeClass('slide-down').addClass('slide-up');
        });
    }

    // 搜索框
    function searchTab() {
        $('#search').focus(function () {
            $(this).parent().addClass('search-form-focus');
            $('#J_keywordList').removeClass('hide');
        }).blur(function () {
            $(this).parent().removeClass('search-form-focus');
            $('#J_keywordList').addClass('hide');
        });
    }

    return {
        download: download,
        banner: banner,
        leftNavTab: leftNavTab,
        topNavTab: topNavTab,
        searchTab: searchTab,
    }
});