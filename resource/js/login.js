$(function(){
    var login = {
        api: {

        },
        init: function(){
            login.login();
            login.toRegister();
            login.register();
            login.toLogin();
        },
        // 登录
        login: function () {
            $('.login_btn').bind('click',function(){
                confirmBox('文本测试',function(){
                    alert(1);
                });
            });
        },
        // 去注册
        toRegister: function(){
            $('.to_register').bind('click',function(){
                $('.login_box').addClass('box_hidden');
                $('.register_box').removeClass('box_hidden');
            });
        },
        // 注册
        register: function(){

        },
        // 去登录
        toLogin: function(){
            $('.to_login').bind('click',function(){
                $('.register_box').addClass('box_hidden');
                $('.login_box').removeClass('box_hidden');
            });
        }
    };
    // 初始化
    login.init();
});