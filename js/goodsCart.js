'use strict';

define(['jquery', 'jquery-cookie'], function ($) {
    function recommend() {
        // 加载推荐商品
        $.ajax({
            type: 'GET',
            url: './data/goodsCarList.json',
            success: function (result) {
                let arr = result.data;
                arr.forEach(item => {
                    $(`
                    <li class="J_xm-recommend-list span4">    
                        <dl> 
                            <dt> 
                                <a href="#"> 
                                    <img src="${item.image}" alt="${item.name}"> 
                                </a> 
                            </dt> 
                            <dd class="xm-recommend-name"> 
                                <a href="#"> 
                                    ${item.name}
                                </a> 
                            </dd> 
                            <dd class="xm-recommend-price">${item.price}元</dd> 
                            <dd class="xm-recommend-tips">${item.comments}人好评    
                                <a href="#" class="btn btn-small btn-line-primary J_xm-recommend-btn" style="display: none;" id="${item.goodsid}">加入购物车</a>  
                            </dd> 
                            <dd class="xm-recommend-notice">

                            </dd> 
                        </dl>  
                    </li>`).appendTo('.cart-recommend .row')
                });
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    }

    function recommendHover() {
        // 推荐商品加购
        $('.cart-recommend .row').on('mouseenter', '.J_xm-recommend-list', function () {
            $(this).find('.xm-recommend-tips .btn').css('display', 'block');
        });
        $('.cart-recommend .row').on('mouseleave', '.J_xm-recommend-list', function () {
            $(this).find('.xm-recommend-tips .btn').css('display', 'none');
        });
        $('.cart-recommend .row').on('click', '.J_xm-recommend-list .btn', function () {
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
            loadCart();
            return false;
        });
    }

    // 加载购物车内商品
    function loadCart() {
        $('#J_cartBox .J_cartGoods').html('');
        // 分两次按顺序加载两个来源的数据
        new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: './data/goodsCarList.json',
                success: function (result) {
                    resolve(result.data);
                },
                error: function (msg) {
                    reject(msg);
                }
            });
        }).then(arr1 => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: 'GET',
                    url: './data/goodsList2.json',
                    success: function (result) {
                        // 两份数据合并
                        let newArr = arr1.concat(result);
                        resolve(newArr);
                    },
                    error: function (msg) {
                        reject(msg);
                    }
                });
            })
        }).then(arr => {
            let cart = JSON.parse($.cookie('cart'));
            let newArr = arr.filter(item => {
                return cart.hasOwnProperty(item.product_id) || cart.hasOwnProperty(item.goodsid);
            });
            newArr.forEach(item => {
                item.id = item.product_id ? item.product_id : +item.goodsid;
                item.num = cart[item.id];
                $(`
                <div class="item-row clearfix" id="${item.id}"> 
                    <div class="col col-check">  
                        <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="${item.id}_0_buy" data-status="1">√</i>  
                    </div> 
                    <div class="col col-img">  
                        <a href="//item.mi.com/${item.id}.html" target="_blank"> 
                            <img alt="" src="${item.image}" width="80" height="80"> 
                        </a>  
                    </div> 
                    <div class="col col-name">  
                        <div class="tags">   
                        </div>     
                        <div class="tags">  
                        </div>   
                        <h3 class="name">  
                            <a href="//item.mi.com/${item.id}.html" target="_blank"> 
                                ${item.name} 
                            </a>  
                        </h3>        
                    </div> 
                    <div class="col col-price"> 
                        ${item.price}元 
                        <p class="pre-info">  </p> 
                    </div> 
                    <div class="col col-num">  
                        <div class="change-goods-num clearfix J_changeGoodsNum"> 
                            <a href="javascript:void(0)" class="J_minus"><i class="iconfont"></i></a> 
                            <input tyep="text" name="${item.id}_0_buy" value="${item.num}" data-num="${item.num}" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum"> 
                            <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                        </div>  
                    </div> 
                    <div class="col col-total"> 
                        ${(item.price * item.num).toFixed(1)}元
                        <p class="pre-info">  </p> 
                    </div> 
                    <div class="col col-action"> 
                        <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                    </div> 
                </div>`).appendTo('#J_cartBox .J_cartGoods');
            });
            calcPrice();
        })
    }

    // 展示购物车
    function showCart() {
        if (!$.cookie('cart')) {
            $('.cart-empty').removeClass('hide');
            $('#J_cartBox').addClass('hide');
        } else {
            $('.cart-empty').addClass('hide');
            $('#J_cartBox').removeClass('hide');
            recommend();
            recommendHover();
            loadCart();
        }
    }

    // 全选按钮和单选按钮添加点击
    function checkFunc() {
        $('#J_cartBox').on('click', '#J_selectAll', function () {
            let allChecks = $('#J_cartBox .J_cartGoods').find('.J_itemCheckbox');
            if ($(this).hasClass('icon-checkbox-selected')) {
                $(this).add(allChecks).removeClass('icon-checkbox-selected');
            } else {
                $(this).add(allChecks).addClass('icon-checkbox-selected');
            }
            calcPrice();
        });

        $('#J_cartBox').on('click', '.J_itemCheckbox', function () {
            if ($(this).hasClass('icon-checkbox-selected')) {
                $(this).removeClass('icon-checkbox-selected');
            } else {
                $(this).addClass('icon-checkbox-selected');
            }
            calcPrice();
        })
    }

    // 计算已选商品价格
    function calcPrice() {
        let allChecks = $('#J_cartBox .J_cartGoods').find('.item-row');
        let isAll = true; // 假设都选中
        let total = 0; // 商品总价
        let count = 0; // 被选中的数量
        let totalCount = 0; // 所有商品的总数
        allChecks.each((index, item) => {
            if (!$(item).find('.J_itemCheckbox').hasClass('icon-checkbox-selected')) {
                isAll = false;
            } else {
                total += parseFloat($(item).find('.col-price').html().trim()) * parseInt($(item).find('.col-num input').val());
                count += parseInt($(item).find('.col-num input').val());
            }
            totalCount += parseInt($(item).find('.col-num input').val());
        });

        $('#J_selTotalNum').html(count);
        $('#J_cartTotalNum').html(totalCount);
        $('#J_cartTotalPrice').html(total.toFixed(1));

        if (isAll) {
            $('#J_cartBox #J_selectAll').addClass('icon-checkbox-selected');
        } else {
            $('#J_cartBox #J_selectAll').removeClass('icon-checkbox-selected');
        }
    }

    // 购物车商品增减或删除
    function changeCart() {
        $('#J_cartBox').on('click', '.col-action .J_delGoods', function () {
            if (confirm(this.dataset.msg)) {
                let id = $(this).closest('.item-row').remove().attr('id');
                let cart = JSON.parse($.cookie('cart'));
                delete cart[id];
                Object.keys(cart).length == 0 ? $.cookie('cart', null) : $.cookie('cart', JSON.stringify(cart), { expires: 7 });
            }
            calcPrice();
            return false;
        })

        $('#J_cartBox').on('click', '.J_minus, .J_plus', function () {
            let id = $(this).closest('.item-row').attr('id');
            let cart = JSON.parse($.cookie('cart'));
            if (this.className === 'J_minus') {
                cart[id] == 1 ? alert('数量已经为1，不能再减少！') : cart[id]--;
            } else {
                cart[id]++;
            }
            $(this).siblings('input').val(cart[id]);
            let price = parseFloat($(this).closest('.col-num').siblings('.col-price').html().trim());
            $(this).closest('.col-num').siblings('.col-total').html((price * cart[id]).toFixed(1) + '元');
            calcPrice();
            $.cookie('cart', JSON.stringify(cart), { expires: 7 });
            return false;
        })
    }

    return {
        showCart: showCart,
        checkFunc: checkFunc,
        changeCart: changeCart
    }
})