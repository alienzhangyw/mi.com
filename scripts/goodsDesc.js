'use strict';

define(['jquery', 'jquery-cookie'], function ($) {
    // 获取当前要加载详情的商品的数据
    function valueByName(search, name) {
        let start = search.indexOf(name + '=');
        if (start === -1) {
            return null;
        } else {
            let end = search.indexOf('&', start);
            if (end === -1) {
                end = search.length;
            }

            let str = search.substring(start, end);
            let arr = str.split('=');
            return arr[1];
        }
    }

    function download() {
        let product_id = valueByName(location.search, 'product_id');

        $.ajax({
            type: 'GET',
            url: './data/goodsList.json',
            success: function (result) {
                let goodsMsg = result.find(item => item.product_id == product_id);
                let node = $(`
                <!-- 导航 -->
                <div id = 'J_proHeader' data-name="${goodsMsg.name}">
                    <div class = 'xm-product-box'>
                        <div id = 'J_headNav' class = 'nav-bar'>
                            <div class = 'container J_navSwitch'>
                                <h2 class = 'J_proName'>${goodsMsg.name}</h2>
                                <div class = 'con'>
                                    <div class = 'left'>
                                        <span class = 'separator'>|</span>
                                        <a href="#">${goodsMsg.title}</a>
                                    </div>
                                    <div class = 'right'>
                                        <a href="#">概述</a>
                                        <span class = 'separator'>|</span>
                                        <a href="#">参数</a>
                                        <span class = 'separator'>|</span>
                                        <a href="#">F码通道</a>
                                        <span class = 'separator'>|</span>
                                        <a href="#">用户评价</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 商品详情数据展示 -->
                <div class = 'xm-buyBox' id = 'J_buyBox'>
                    <div class = 'box clearfix'>
                        <!-- 商品数据 -->
                        <div class = 'pro-choose-main container clearfix'>
                            <div class = 'pro-view span10'>
                                <!-- img-con fix 设置图片浮动 -->
                                <div id = 'J_img' class = 'img-con' style = 'left: 338px; margin: 0px;'>
                                    <div class = 'ui-wrapper' style="max-width: 100%;">
                                        <!-- 图片 -->
                                        <div class = 'ui-viewport' style="width: 100%; overflow: hidden; position: relative; height: 560px;">
                                            <div id = 'J_sliderView' class = 'sliderWrap' style = 'width: auto; position: relative;'>
                                            
                                            </div>
                                        </div>
                                        <!-- 显示第几张图片的下标 -->
                                        <div class = 'ui-controls ui-has-pager ui-has-controls-direction'>
                                            <div class = 'ui-pager ui-default-pager'>
                                                
                                            </div>
                                            <div class = 'ui-controls-direction'>
                                                <a class="ui-prev" href="">上一张</a>
                                                <a class="ui-next" href="">下一张</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = 'pro-info span10'>
                                <!-- 标题 -->
                                <h1 class = 'pro-title J_proName'>
                                    <span class = 'img'></span>
                                    <span class = 'name'>${goodsMsg.name}</span>
                                </h1>
                                <!-- 提示 -->
								<p class = 'sale-desc' id = 'J_desc'>
                                    ${goodsMsg.product_desc_ext}
                                </p>
                                <div class = 'loading J_load hide'>
                                    <div class = 'loader'></div>
                                </div>
                                <!-- 主体 -->
                                <div class = 'J_main'>
                                    <!-- 经营主题 -->
                                    <p class = 'aftersale-company' id = 'J_aftersaleCompany' type = '1' desc = 'null'>小米自营</p>
                                    <!-- 价格 -->
                                    <div class = 'pro-price J_proPrice'>
                                        <span class = 'price'>
											${goodsMsg.price_max}元
                                            <del>${goodsMsg.market_price_max}元</del>
                                        </span>
                                        <span class="seckill-notic hide"><em></em><i></i><span><span></span></span></span>
                                    </div>
                                    <!-- 常态秒杀倒计时 -->
                                    <div class = 'pro-time J_proSeckill'>
                                        <div class="pro-time-head">
                                            <em class="seckill-icon"></em> 
                                            <i>秒杀</i>
                                            <span class="time J_seckillTime">距结束 03 时 24 分 46 秒</span>
                                        </div>
                                        <div class = 'pro-time-con'>
                                            <span class = 'pro-time-price'>
                                                ￥
                                                <em class = 'J_seckillPrice'>${goodsMsg.price_min}</em>
                                                <del>
                                                    ￥
                                                    <em class = 'J_seckillPriceDel'>${goodsMsg.market_price_min}</em>
                                                </del>
                                            </span>
                                        </div>
                                    </div>
                                        <!-- 已经选择产品 -->
                                        <div class = 'pro-list' id = 'J_proList'>
                                            <ul>
                                                <li>${goodsMsg.name} ${goodsMsg.value}  
                                                    <del>${goodsMsg.market_price_min}元</del>  
                                                    <span>  ${goodsMsg.price_min} 元 </span> 
                                                </li>
                                                <li class="totlePrice" data-name="seckill">   
                                                    秒杀价   ：${goodsMsg.price_min}元  
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- 购买按钮 -->
                                        <ul class="btn-wrap clearfix" id="J_buyBtnBox">     
                                            <li>  
                                                <a href="#" class="btn btn-primary btn-biglarge J_login" id = "${goodsMsg.product_id}">加入购物车</a>  
                                            </li>   
                                            <li>  
                                                <a href="./goodsCar.html" class="btn-gray btn-like btn-biglarge"> 
                                                    <i class="iconfont default"></i>查看购物车 
                                                </a>  
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
                node.insertAfter("#app div .header");

                // 加载轮播图图片
                let aImages = goodsMsg.images;
                if (aImages.length == 1) {
                    $(`<img class = 'slider done' 
                        src="${aImages[0]}" 
                        style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: block;" 
                        alt=""/>`).appendTo(node.find("#J_sliderView"));

                    //隐藏上一张、下一张操作
                    node.find(".ui-controls").hide();
                } else {
                    for (var i = 0; i < aImages.length; i++) {
                        $(`<div class = 'ui-pager-item'>
                                <a href="#" data-slide-index = "0" class = 'ui-pager-link ${i == 0 ? "active" : ""}'>1</a>
                            </div>`).appendTo(node.find(".ui-pager"));

                        $(`<img class = 'slider done' 
                        src="${aImages[i]}" 
                        style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: ${i == 0 ? "block" : "none"};" 
                        alt=""/>`).appendTo(node.find("#J_sliderView"));
                    }
                }

                // 加入购物车按钮的功能
                node.find(".J_login").click(function () {
                    // 获取当前商品id加入购物车
                    // cookie缓存商品id和数量{id1: num, id2: num}
                    let id = this.id;
                    let first = $.cookie('cart') == null ? true : false;
                    if (first) {
                        let cart = { [id]: 1 };
                        $.cookie('cart', JSON.stringify(cart), { expires: 7 });
                    } else {
                        let cart = JSON.parse($.cookie('cart'));
                        if (cart.hasOwnProperty(id)) {
                            cart[id]++;
                        } else {
                            cart[id] = 1;
                        }
                        $.cookie('cart', JSON.stringify(cart), { expires: 7 });
                    }
                    return false;
                })
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    // 图片轮播效果
    function banner() {
        let iNow = 0;
        let aBtns = null;
        let aImgs = null;
        let timer = null;

        timer = setInterval(function () {
            iNow++;
            tab();
        }, 3000);

        $('#app div').on('click', '.ui-controls .ui-pager .ui-pager-item a', function () {
            iNow = $(this).parent().index();
            tab();
            return false;
        });

        $('#app div').on('mouseenter', '#J_img', function () {
            clearInterval(timer);
        });
        $('#app div').on('mouseleave', '#J_img', function () {
            timer = setInterval(function () {
                iNow++;
                tab();
            }, 3000);
        });

        $('#app div').on('click', '.ui-prev, .ui-next', function () {
            if (this.className == 'ui-prev') {
                iNow--;
                if (iNow == -1) {
                    if (!aImgs) {
                        aImgs = $('#J_sliderView').find('img');
                    }
                    iNow = aImgs.size() - 1;
                }
            } else {
                iNow++;
            }
            tab();
            return false;
        })

        function tab() {
            if (!aImgs) {
                aImgs = $('#J_sliderView').find('img');
            }
            if (!aBtns) {
                aBtns = $('#J_img').find('.ui-controls .ui-pager .ui-pager-item a');
            }
            if (aImgs.size() == 1) {
                clearInterval(timer);
            } else {
                if (iNow == aImgs.size()) {
                    iNow = 0;
                }
                aBtns.removeClass('active').eq(iNow).addClass('active');
                aImgs.hide().eq(iNow).show();
            }
        }
    }

    return {
        download: download,
        banner: banner
    }
})