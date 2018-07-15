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
        },
        toRegister: function(){
            $('.login_box .to_register').bind('click', function(){
                $('.login_box').addClass('box_hidden');
                $('.register_box').removeClass('box_hidden');
            });
        }
    };
    login.init();
});