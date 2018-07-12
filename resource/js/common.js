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
        '</div>' +
        '</div>';
    $(msgHtml).appendTo('body');
    $('body').css('overflow','hidden');
    $('.message_box .box_close').bind('click', function(){
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