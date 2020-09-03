import $ from "./library/jquery.js";
import { cookie } from "./library/cookie.js"

(function() {
    let arr = location.search.split('=');
    // console.log(arr);
    let phone = arr[1].split('&')[0];
    let country = decodeURI(arr[2]);
    // console.log(phone, country);
    $('#submit').on('click', function() {
        let username = $('#username').val();
        let password = $('#psw').val();
        $.ajax({
            type: "post",
            url: "../../interface/namereg.php",
            data: {
                username: username,
                password: password,
                phone: phone,
                country: country
            },
            dataType: "json",
            success: function(res) {
                if (res.status) {
                    alert('注册成功，请登录');
                    cookie.set('username', username);
                    cookie.set('password', password);
                    location.href = "./login.html";
                } else {
                    alert('用户名已存在！');
                    location.href = "./setting.html";
                }
            }
        });
    });
})()