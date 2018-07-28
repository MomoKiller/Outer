/**
 * Created by pkk on 2018/7/12.
 */

/* 普通弹框 */
function messageBox(msg, title){
    if($('body').hasClass('message_box')){
        $('.message_box').remove();
        $('body').css('overflow','unset');
    }
    var msgHtml = '<div class="message_box">' +
        '<div class="box_modal"></div>' +
        '<div class="box_contain">' +
        '<div class="title">' + (title ? title : '提示信息') + '</div>' +
        '<div class="message">' +
        '<p> '+ msg +'</p>' +
        '</div>' +
        '<a class="box_close">X</a>' +
        '<div class="confirm">' +
        '<a class="cancel_btn">关闭</a>' +
        '</div>' +
        '</div>' +
        '</div>';
    $(msgHtml).appendTo('body');
    $('body').css('overflow','hidden');
    $('.message_box .box_close,.message_box .cancel_btn').bind('click', function(){
        $('body').css('overflow','unset');
        $('.message_box').remove();
    });
}
/* 消息确认框 */
function  confirmBox(msg, call){
    if($('body').hasClass('message_box')){
        $('.message_box').remove();
        $('body').css('overflow','unset');
    }
    var confirmHtml = '<div class="message_box">' +
        '<div class="box_modal"></div>' +
        '<div class="box_contain">' +
        '<div class="title">确认信息</div>' +
        '<div class="message">' +
        '<p> '+ msg +'</p>' +
        '</div> ' +
        '<a class="box_close">X</a>' +
        '<div class="confirm">' +
        '<a class="confirm_btn">确认</a>' +
        '<a class="cancel_btn">取消</a>' +
        '</div>' +
        '</div>' +
        '</div>';
    $(confirmHtml).appendTo('body');
    $('body').css('overflow','hidden');
    $('.message_box .box_close,.message_box .cancel_btn').bind('click', function(){
        $('body').css('overflow','unset');
        $('.message_box').remove();
    });
    $('.message_box .confirm_btn').bind('click',function(){
        $('body').css('overflow','unset');
        $('.message_box').remove();
        call();
    });
}
/* 数组去重 */
function uniqueArr(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}
/* 输入框验证 */
$.extend(String.prototype, {
    trim: function() {
        return this.replace(/(^\s*)|(\s*$)/g, '');
    },
    isMobile: function() {
        return new RegExp(/^(13|14|15|17|18)\d{9}$/).test(this)
    },
    isSmsCode:function(){
        return new RegExp(/^\d{6}$/).test(this);
    },
    isNumber: function() {
        return new RegExp(/^[0-9]*$/).test(this);
    },
    isName: function () {
        return (new RegExp(/^[a-zA-Z\u4e00-\u9fa50-9]+$/g).test(this.trim()));
    },
    isIdcardNew: function () {
        return (new RegExp(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(this.trim()));
    }
});

var apiDepot = {
    'login': '/login',
    'register': '/registe/user'
};