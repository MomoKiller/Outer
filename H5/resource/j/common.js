// 浏览器环境判断
$.browser = $.browser || {};
function appInstance(){
    var ua = navigator.userAgent.toLowerCase();
}; 
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
        return (new RegExp(/^[a-zA-Z\u4e00-\u9fa5]+$/g).test(this.trim()));
    },
    isIdcardNew: function () {
        return (new RegExp(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(this.trim()));
    }
});

// 黑色小弹框
var _tip,tID;
var tipBox = function (msg){
    if (!msg) return;
    _tip && _tip.remove() && clearTimeout(tID);
    _tip = $('<div class="tips_overlay">'+
                '<div class="tipBox">'+
                    '<div class="msg"><h2><i></i>'+msg+'</h2></div>'+
                '</div>'+
                '</div>').appendTo("body");
    setTimeout(function () {
        _tip.addClass('overlay-in');
        _tip.children(".tipBox").addClass('mask-in');
    },10);
    tID = setTimeout(function(){
        if (!_tip) return;
        _tip.addClass('overlay-out');
        _tip.children(".tipBox").addClass('mask-out');
        _tip.remove();
        _tip = null;
    }, 2000);
};
window.tipBox = tipBox;

// 公用方法
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
};
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};
function getQueryString(name) {//获取浏览器参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};
