define(['jquery'], function ($) {
    // 下载数据
    function download() {
        $.ajax({
            url: '../data/slide.json',
            success: function (result) {
                let slideArr = result.data.list.list;
                let listLength = slideArr.length;
                slideArr.forEach((item, index) => {
                    $(`<li class = 'swiper-slide rainbow-item-${index + 1}' style = 'width: 234px; margin-right: 14px;'>
                        <a href="#" target = "_blank">
                            <div class = 'content'>
                            <div class = 'thumb'>
                                <img width="160" height="160" src="${item.pc_img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                            </div>
                                <h3 class = 'title'>${item.goods_name}</h3>
                                <p class = 'desc'>${item.desc}</p>
                                <p class = 'price'>
                                <span>${item.seckill_Price}</span>元
                                <del>${item.goods_price}元</del>
                                </p>
                            </div>
                        </a>
                    </li>`).appendTo('#J_flashSaleList ul');
                });
                slideTab(listLength);
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    // 商品列表滚动
    function slideTab(length) {
        let bPre = $('.swiper-flashsale-prev');
        let bNext = $('.swiper-flashsale-next');
        let list = $('#J_flashSaleList ul');
        let position, iNow;
        let width = 248;
        let count = 4;
        // 位置初始化
        function init() {
            position = 0;
            iNow = 0;
            list.css({
                transform: `translate3d(${position}px, 0px, 0px)`,
                transmissionDuration: '1000ms'
            });
            bPre.addClass('swiper-button-disabled');
            bNext.removeClass('swiper-button-disabled');
        }
        // 绑定前进后退按钮功能
        init();
        bPre.click(function () {
            position += width * count;
            position = Math.min(position, 0);
            list.css({
                transform: `translate3d(${position}px, 0px, 0px)`,
                transmissionDuration: '1000ms'
            });
            iNow = -position / width;
            if (iNow == 0) {
                bPre.addClass('swiper-button-disabled');
            } else {
                bNext.removeClass('swiper-button-disabled');
            }
        })
        bNext.click(function () {
            position -= width * count;
            position = Math.max(position, -width * (length - count));
            list.css({
                transform: `translate3d(${position}px, 0px, 0px)`,
                transitionDuration: '1000ms'
            });
            iNow = -position / width;
            if (iNow + count >= length) {
                bNext.addClass('swiper-button-disabled');
            } else {
                bPre.removeClass('swiper-button-disabled');
            }
        })
        // 启动定时器
        let timer = setInterval(function () {
            if (iNow + count == length) {
                init();
            }
            bNext.click();
        }, 6000);
        // 鼠标移入移出效果
        $('#J_flashSaleList ul li').mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            timer = setInterval(function () {
                if (iNow + count == length) {
                    init();
                }
                bNext.click();
            }, 6000);
        })
    }

    return {
        download: download
    }
});