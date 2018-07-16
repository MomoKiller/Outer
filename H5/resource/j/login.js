/**
 * Created by pkk on 2018/7/14.
 */
$(function(){
    var login = {
        api:{
            'login': '',
            'register': ''
        },
        init: function(){
            login.login();
            login.register();
        },
        login: function () {    // 登陆
            $('.login_box .login_btn').bind('click', function () {
                var userName = $('#userName').val();
                var password = $('#password').val();
                if(!userName.isName()){
                    $('#userName').focus();
                    tipBox('请输入正确的用户名');
                    return;
                }
                if(!password){
                    $('#password').focus();
                    tipBox('请输入您的密码');
                    return;
                }
                var d = {
                    'userName': userName,
                    'password': hex_sha1(password)
                };
                $.getJSON(login.api.login, d, function (data) {
                    if(data){
                        location.href = 'index.html';
                    }
                });
            });
            $('.login_box .to_register').bind('click', function(){
                $('.login_box').addClass('box_hidden');
                $('.register_box').removeClass('box_hidden');
            });
        },
        register: function () { // 注册
            $('.register_box .register_btn').bind('click', function () {
                var userName = $('#rUserName').val();
                var password = $('#rPassword').val();
                var phone    = $('#rPhone').val();
                var identyCode  = $('#rIdentyCode').val();
                var city     = $('#rCity').val();
                var address  = $('#rAddress').val();
                var job      = $('#rJob').val();
                if(!userName.isName()){
                    $('#rUserName').focus();
                    tipBox('请输入正确的用户名');
                    return;
                }
                if(!password){
                    $('#rPassword').focus();
                    tipBox('请输入您的密码');
                    return;
                }
                if(!phone.isMobile()){
                    $('#rPhone').val('').focus();
                    tipBox('请输入正确的手机号');
                    return;
                }
                if(!identyCode.isSmsCode()){
                    $('#rIdentyCode').val('').focus();
                    tipBox('请输入正确的验证码');
                    return;
                }
                var d = {
                    'userName': userName,
                    'password': hex_sha1(password),
                    'phone': phone,
                    'identyCode': identyCode,
                    'city': city,
                    'address': address,
                    'job': job
                };
                $.getJSON(login.api.register, d, function (data) {
                    if(data){
                        // 注册成功
                    }
                });

            });
            $('.register_box .to_login').bind('click', function () {
                $('.register_box').addClass('box_hidden')
                $('.login_box').removeClass('box_hidden');
            });
        }
    };
    login.init();
});