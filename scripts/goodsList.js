'use strict';

define(['jquery'], function ($) {
    // 数据下载
    function download() {
        $.ajax({
            type: 'GET',
            url: '../data/goodsList2.json',
            success: function (result) {
                // 创建大图商品
                $(`
                <div data-v-61428f58 class = 'section'>
                    <div data-v-61428f58 class = 'components-list-box'>
                        <div data-v-a2d6c756 class="channel-product-imgText">
                            <div data-v-a2d6c756 class = 'channel-product-top'>
                                <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                                    <div data-v-a2d6c756 class = 'figure'>
                                        <a href="goodsDesc.html?product_id=${result[0].product_id}">
                                            <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${result[0].image}" alt=""/>
                                        </a>
                                    </div>
                                    <div data-v-a2d6c756 class = 'content'>
                                        <h3 data-v-a2d6c756 class = 'title'>
                                            <a data-v-a2d6c756 href="goodsDesc.html?product_id=${result[0].product_id}">
                                                ${result[0].name}
                                            </a>
                                        </h3>
                                        <p data-v-a2d6c756 class = 'desc'>${result[0].desc}</p>
                                        <p data-v-a2d6c756 class = 'price'>
                                            <strong data-v-a2d6c756>${result[0].price}</strong>元
                                            <span data-v-a2d6c756>起</span>
                                            <del data-v-a2d6c756>${result[0].del}元</del>
                                        </p>
                                        <p data-v-a2d6c756 class = 'link'>
                                            <a data-v-a2d6c756 href="goodsDesc.html?product_id=${result[0].product_id}">立即购买</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`).appendTo('.app-body');

                // 创建小图商品
                for (let i = 1, row; i < result.length; i++) {
                    if (i % 2 != 0) {
                        row = $(`
                        <div data-v-61428f58 class = 'section'>
                            <div data-v-61428f58 class = 'components-list-box'>
                                <div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
                                    <div data-v-45ef62b1 class = 'row'>
                                    </div>
                                </div>
                            </div>
                        </div>`);
                        row.appendTo('.app-body');
                    }
                    $(`
                    <div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                        <div data-v-45ef62b1 class = 'figure'>
                            <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}" class = 'exposure'>
                                <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${result[i].image}" alt=""/>
                            </a>
                        </div>
                        <h3 data-v-45ef62b1 class = 'title'>
                            <a data-v-45ef62b1 href="goodsDesc.html?product_id=${result[i].product_id}">
                                ${result[i].name}
                            </a>
                        </h3>
                        <p data-v-45ef62b1 class = 'desc'>${result[i].desc}</p>
                        <p data-v-45ef62b1 class = 'price'>
                            <strong data-v-45ef62b1>${result[i].price}</strong>元
                            <span data-v-45ef62b1>起</span>
                            <del data-v-45ef62b1>${result[i].del}元</del>
                        </p>
                    </div>`).appendTo(row.find('.row'));
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    // 实现列表页轮播图
    function banner() {
        // 获取所有图
        let oDiv = $('.swiper-container .swiper-wrapper');
        // 获取按钮
        let aBtns = $('.swiper-container .swiper-pagination a');
        // 设置当前显示图片的下标
        let iNow = 0;
        let timer = null;

        // 按钮添加点击
        aBtns.click(function () {
            iNow = $(this).index();
            tab();
            return false;
        })

        timer = setInterval(function () {
            iNow++;
            tab();
        }, 2000);

        // 切换函数
        function tab() {
            aBtns.removeClass('swiper-pagination-bullet-active').eq(iNow).addClass('swiper-pagination-bullet-active');
            if (iNow == aBtns.size()) {
                aBtns.eq(0).addClass('swiper-pagination-bullet-active');
            }
            oDiv.animate({ left: -oDiv.width() * iNow }, 1000, function () {
                if (iNow == aBtns.size()) {
                    iNow = 0;
                    oDiv.css('left', 0);
                }
            });
        }

        // 左右切换
        $('.swiper-button-prev, .swiper-button-next').click(function () {
            if (this.className == 'swiper-button-prev') {
                iNow--;
                if (iNow == -1) {
                    iNow = aBtns.size() - 1;
                }
            } else {
                iNow++;
            }
            tab();
        })

        // 给整个轮播图控件添加移入移出
        $('.swiper-container').mouseenter(function () {
            clearInterval(timer);
        })
        $('.swiper-container').mouseleave(function () {
            timer = setInterval(function () {
                iNow++;
                tab();
            }, 2000);
        })
    }

    return {
        download: download,
        banner: banner
    }
})