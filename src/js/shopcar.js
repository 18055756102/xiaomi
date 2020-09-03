import $ from './library/jquery.js';
import { cookie } from './library/cookie.js';

(function() {
    let shop = cookie.get('shop');

    if (shop) {
        shop = JSON.parse(shop); //  有cookie数据 才转JSON

        let idList = shop.map(elm => elm.id).join(); // 获取所有id

        $.ajax({
            type: "get",
            url: "../../interface/getitems.php",
            data: {
                idList: idList
            },
            dataType: "json",
            success: function(res) {
                var template = '';
                res.forEach((elm, i) => {
                    let picture = JSON.parse(elm.pic);

                    // 让ajax获得的数据结果的id 与 cookie中id  一一对应
                    // 索引值不同

                    // 从cookie中去筛选数据
                    let arr = shop.filter(val => val.id == elm.id);

                    template += `
                        <li class="item">
                            <div class="p-box">
                                <input type="checkbox">
                            </div>
                            <div class="p-img">
                                <img src="..${picture[0].src}" alt="">
                            </div>
                            <div class="p-title">
                                ${elm.title}
                            </div>
                            <div class="p-num">
                                <input type="number" value="${arr[0].num}" min="1" max="${elm.num}">
                            </div>
                            <div class="p-price">
                                单价:${elm.price}
                            </div>
                            <div class="p-sum">
                                总价:${(elm.price*arr[0].num).toFixed(2)}
                            </div>
                            <div class="p-del">
                                <a href="javascript:;">删除</a>
                            </div>
                        </li>`;

                });

                $('.itemlist').append(template);
            }
        });

    }
})();