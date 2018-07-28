$(function(){
    var login = {
        api: {
            'login': '/login',
            'register': '/registe/user'
        },
        init: function(){
            login.login();
        },
        login: function () {
            $('.login_btn').bind('click',function(){    // 登录
                var userName = $('#userName').val();
                var password = $('#password').val();
                if(!userName.isName()){
                    $('#userName').focus();
                    messageBox('请输入正确的用户名');
                    return;
                }
                if(!password){
                    $('#password').focus();
                    messageBox('请输入您的密码');
                    return;
                }
                var d = {
                    'userName': userName,
                    'password': password            // hex_sha1(password)
                };
                $.post(apiDepot.login, d, function (result) {
                    var data = JSON.parse(result);
                    if(data && data.rtnCode){
                        if(data.rtnCode == '0000'){
                            location.href = 'index.html';
                        }else {
                            messageBox(data.rtnMsg);
                        }
                    }else {
                        messageBox('系统错误');
                    }
                });
            });
            $('.to_register').bind('click',function(){
                $('.login_box').addClass('box_hidden');
                $('.register_box').removeClass('box_hidden');
            });
        }
    };

    var register = {
        init: function(){
            register.register();
            register.cityCelect();
            register.sendIdentyCode();
        },
        register: function(){
            $('.register_btn').bind('click', function () {  // 注册
                var userName = $('#rUserName').val();
                var password = $('#rPassword').val();
                var phone    = $('#rPhone').val();
                var identyCode  = $('#rvCode').val();
                var city     = $('#address').val();
                var company  = $('#comAddress').val();
                var job      = $('#rJob').val();
                if(!userName.isName()){
                    $('#rUserName').focus();
                    messageBox('请输入正确的用户名');
                    return;
                }
                if(!password){
                    $('#rPassword').focus();
                    messageBox('请输入您的密码');
                    return;
                }
                if(!phone.isMobile()){
                    $('#rPhone').val('').focus();
                    messageBox('请输入正确的手机号');
                    return;
                }
                //if(!identyCode.isSmsCode()){
                //    $('#rIdentyCode').val('').focus();
                //    messageBox('请输入正确的验证码');
                //    return;
                //}
                var d = {
                    'userName': userName,
                    'userPassword': password,                   // hex_sha1(password),
                    'userMobile': phone,
                    //'identyCode': identyCode,
                    'userAddress': city,
                    'company': company,
                    'jobPosition': job
                };
                $.post(apiDepot.register, d, function(result){
                    var data = JSON.parse(result);
                    if(data && data.rtnCode){
                        if(data.rtnCode == '0000'){
                            //location.href = 'index.html';
                            confirmBox('注册成功！是否去登录？',function(){
                                $('.register_box').addClass('box_hidden');
                                $('.login_box').removeClass('box_hidden');
                            });
                        }else {
                            messageBox(data.rtnMsg);
                        }
                    }else {
                        messageBox('系统错误');
                    }
                });
            });
            $('.to_login').bind('click',function(){
                $('.register_box').addClass('box_hidden');
                $('.login_box').removeClass('box_hidden');
            });
        },
        // 城市下拉
        cityCelect: function () {
            $('#address').val(returnCitySN.cname.replace('市',''));
            $('#address_wrap').addClass('posit_relative');
            $('#address').bind('click', function (e) {
                openBox();
                stopPropagation(e);
            }).bind('keyup', function(){
                register.getKeyCity(citys, '#address');
            });

            $('#address_wrap a').bind('click', function (e) {
                if(!$(this).hasClass('drop_back')){
                    openBox();
                    stopPropagation(e);
                }else {
                    closeBox();
                }
            });
            function openBox() {
                register.dropBox('address_wrap', citys);
                $('#address_wrap .add_btn').addClass('drop_back');
            }
            function closeBox() {
                $('.select_box').remove();
                $('#address_wrap .add_btn').removeClass('drop_back');
            }
            function stopPropagation(e) {
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            }
            $(document).bind('click',function(){
                closeBox();
            });
        },
        dropBox: function(domId, data) {
            $('.select_box').remove();
            var dropHtml =  '<div class="select_box city_select"><ul>';
            for(var i=0; i< data.length; i++){
                dropHtml += '<li><a data-value="'+ data[i][1]+'">'+ data[i][1] +'<span>'+ data[i][2] +'</span></a></li>';
            }
            dropHtml += '</ul></div>';
            $('#'+ domId +' input').after(dropHtml);
            $('.select_box ul li a').bind('click', function () {
                var cityVal = $(this).attr('data-value');
                $('#'+ domId +' input').val(cityVal);
                closeBox();
            });
            function closeBox() {
                $('.select_box').remove();
                $('#'+ domId+ ' a').removeClass('drop_back');
            }
        },
        getKeyCity: function(arr, sele){
            var str = $(sele).val();
            var lastArr=[];
            var lastArr1=[];
            var lastArr2=[];
            var lastArr3 = [];
            for(var i=0; i< arr.length; i++){
                if(arr[i][3].indexOf(str.toUpperCase()) > -1){  // 拼音简称
                    lastArr1.push(citys[i]);
                }
                if(arr[i][1].indexOf(str) > -1){                // 汉字
                    lastArr2.push(arr[i])
                }
                if(arr[i][2].indexOf(str.toUpperCase()) > -1){  // 全拼
                    lastArr3.push(arr[i])
                }
            }
            lastArr = uniqueArr(lastArr1.concat(lastArr2).concat(lastArr3));
            register.dropBox('address_wrap', lastArr);
        },
        // 发送验证码
        sendIdentyCode: function(){
            var spaceTime = 120;
            function countSec(){
                setTimeout(function(){
                    if(spaceTime > 0){
                        countSec();
                        $('.register_box .send_btn').unbind();
                    }else {
                        $('.register_box .send_btn').text('发送验证码');
                        $('.register_box .send_btn').removeClass('sending');
                        register.sendIdentyCode();
                    }
                },1000);
                $('.register_box .send_btn').text(spaceTime + 's后重试');
                spaceTime --;
            }
            $('.register_box .send_btn').bind('click', function () {
                $('.register_box .send_btn').addClass('sending');
                countSec();
            });
        }
    };
    // 初始化
    login.init();
    register.init();
});