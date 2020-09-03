import $ from '../js/library/jquery.js';

(function() {
    $('#submit').on('click', function() {
        let phone = parseInt($('#phone').val());
        let country = $('#country').text();
        // console.log(phone);
        $.ajax({
            type: "get",
            url: "../../interface/register.php",
            data: {
                phone: phone
            },
            dataType: "json",
            success: function(res) {
                if (res.has) {
                    alert('手机号已注册，请登录');
                    location.href = "./login.html";
                } else {
                    location.href = "./setting.html?phone=" + phone + "&country=" + country;
                }
            }
        });
    })
})()