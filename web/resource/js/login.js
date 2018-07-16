$(function(){
    var login = {
        api: {

        },
        init: function(){
            login.login();
            login.register();
            login.cityCelect();
        },
        login: function () {
            $('.login_btn').bind('click',function(){    // 登录
                confirmBox('文本测试',function(){

                });
            });
            $('.to_register').bind('click',function(){
                $('.login_box').addClass('box_hidden');
                $('.register_box').removeClass('box_hidden');
            });
        },
        register: function(){
            $('.register_btn').bind('click', function () {  // 注册

            });
            $('.to_login').bind('click',function(){
                $('.register_box').addClass('box_hidden');
                $('.login_box').removeClass('box_hidden');
            });
        },
        cityCelect: function () {
            var d = [{
                key: '上海',
                value: '上海'
            },{
                key: '北京',
                value: '北京'
            }];
            login.dropBox('address_wrap', d);
        },
        // 下拉框
        dropBox: function(domId, data) {
            var dropHtml = '<div class="select_box city_select"><ul>';
            for(var i=0; i< data.length; i++){
                dropHtml += '<li><option value="'+ data[i].key+'">'+ data[i].value +'</option></li>';
            }
            dropHtml += '</ul></div>';
            $('#'+ domId).addClass('posit_relative');
            $('#'+ domId +' input').after(dropHtml);
            $('#'+ domId +' input').bind('click', function () {
                openBox();
            });
            $('#'+ domId + ' a').bind('click', function () {
                if(!$(this).hasClass('drop_back')){
                    openBox();
                }else {
                    closeBox();
                }
            });
            $('.select_box ul li option').bind('click', function () {
                var cityVal = $(this).val();
                $('#'+ domId +' input').val(cityVal);
                closeBox();
            });
            function openBox() {
                $('.select_box').css('display', 'block');
                $('#'+ domId+ ' a').addClass('drop_back');
            }
            function closeBox() {
                $('.select_box').css('display', 'none');
                $('#'+ domId+ ' a').removeClass('drop_back');
            }
        }
    };
    // 初始化
    login.init();
});