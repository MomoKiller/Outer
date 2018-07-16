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
            login.toRegister();
            login.toLogin();
            login.login();
            login.register();
        },
        toRegister: function(){
            $('.login_box .to_register').bind('click', function(){
                $('.login_box').addClass('box_hidden');
                $('.register_box').removeClass('box_hidden');
            });
        },
        toLogin: function () {
            $('.register_box .to_login').bind('click', function () {
                $('.register_box').addClass('box_hidden')
                $('.login_box').removeClass('box_hidden');
            });
        },
        login: function () {    // 登陆
            $('.login_box .login_btn').bind('click', function () {
                var userName = $('#userName').val();
                var password = $('#password').val();
                if(!userName.isName()){
                    tipBox('请输入正确的用户名');
                    return;
                }
                if(!password){
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
        },
        register: function () { // 注册
            $('.register_box .register_btn').bind('click', function () {

            });
        }
    };
    login.init();
});