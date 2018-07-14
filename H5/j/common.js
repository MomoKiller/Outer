var serviceUrl = 'beta.ule.com';
var currentDate;
var instanceKey = {     // 邮掌柜 222 大网APP 104 邮乐小店 239
    'uzg': 222,
    'ule': 104,
    'ylxd': 239
};
// 浏览器环境判断
$.browser = $.browser || {};
function appInstance(){
    var ua = navigator.userAgent.toLowerCase(), os, version;
	if (ua.indexOf('uleapp/') > 0) {
		version = ua.sliceAfter('uleapp/').split('_')[3];
		os = ua.sliceAfter('uleapp/').sliceBefore('_');
		if(ua.sliceAfter('uleapp/').split('_')[1] == 'ule'){
			var uappType = {ule: true, ylxd: false, ysh:false};
		}else if(ua.sliceAfter('uleapp/').split('_')[1] == 'ysh'){
			var uappType = {ule: false, ylxd: false, ysh:true};
		}else{
			var uappType = {ule: false, ylxd: true, ysh:false};
		}
		var appobj = $.extend({ios: os == 'ios',android: os == 'android',version: version}, uappType);
		return appobj;
	}else if (ua.indexOf('ulxdapp/') > 0) {
		version = ua.sliceAfter('ulxdapp/').split('_')[3];
		os = ua.sliceAfter('ulxdapp/').sliceBefore('_');
		return {
			ylxd: true,
			wx: false,
			ios: os == 'ios',
			android: os == 'android',
			version: version
        };
	}else if (ua.indexOf('uzgapp/') > 0) {
		version = ua.sliceAfter('uzgapp/').split('_')[3];
		os = ua.sliceAfter('uzgapp/').sliceBefore('_');
		return {
			uzg: true,
			wx: false,
			ios: os == 'ios',
			android: os == 'android',
			version: version
		};
	}else {
		return {
			ule: false,
			uzg: false,
			ylxd: false,
			wx: ua.match(/micromessenger/i),
			ios: ua.match(/(iphone|ipod|ipad);?/i),
			android: ua.match(/android/i)
		};
    }
}; 
$.extend(String.prototype, {
    trim: function() {
        return this.replace(/(^\s*)|(\s*$)/g, '');
    },
    trimAll: function() {
        return this.replace(/\s/g, '');
    },
    sliceAfter: function(str) {
        return (this.indexOf(str) >= 0) ? this.substring(this.indexOf(str) + str.length, this.length) : '';
    },
    sliceBefore: function(str) {
        return (this.indexOf(str) >= 0) ? this.substring(0, this.indexOf(str)) : '';
    },
    substitute: function(data) {
        if (data && typeof(data) == 'object') {
            return this.replace(/\{([^{}]+)\}/g, function(match, key) {
                var value = data[key];
                return (value !== undefined) ? '' + value : '';
            });
        } else {
            return this.toString();
        }
    },
    escapeReg: function() {
        return this.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
    },
    getQueryJson: function() {
        if (this.indexOf('?') < 0) return {};
        var query = this.substr(this.indexOf('?') + 1),
            params = query.split('&'),
            len = params.length,
            result = {},
            key,
            value,
            item,
            param;
        for (var i = 0; i < len; i++) {
            param = params[i].split('=');
            key = param[0];
            value = param[1];
            item = result[key];
            if ('undefined' == typeof item) {
                result[key] = value;
            } else if (Object.prototype.toString.call(item) == '[object Array]') {
                item.push(value);
            } else {
                result[key] = [item, value];
            }
        }
        return result;
    },  
    getQueryValue: function (name) {
        var reg = new RegExp("(^|&|\\?|#)" + name.escapeReg() + "=([^&]*)(&|\x24)", "");
        var match = this.match(reg);
        return (match) ? match[2] : '';
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
    },
    // 扬州特惠票正则表达式
    isYZIcard: function (){
        return (new RegExp(/^3210\d{2}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(this.trim()));
    }
});
window.addEventListener('pageshow', function(e) {
    // 通过persisted属性判断是否存在 BF Cache
    if (e.persisted) {
        location.reload();
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
// 获取渠道号-存放cookie
var $salesChannel;
function getSaleChannel(){
    $.browser = appInstance();
    $salesChannel = instanceKey.ule;
    if($.browser.ule){ //大网
        $salesChannel = instanceKey.ule;
    }
    if($.browser.ylxd){ //邮乐小店
        $salesChannel = instanceKey.ylxd;
    }
    if($.browser.uzg){  // 邮掌柜
        $salesChannel = instanceKey.uzg;
    }
    if(getQueryString('sellerOnlyid')){
        $salesChannel = instanceKey.ylxd;
    }
    setCookie('salesChannel', $salesChannel);
    return $salesChannel;
}
// 用户ID
var $sellerOnlyid;
function getUserId(){
    $sellerOnlyid = getQueryString('sellerOnlyid');
    $.ajax({
        type:"get",
        async:true,
        url:'//my.'+ serviceUrl +'/usr/getIndexCookies.do',
        dataType:"jsonp",
        jsonp: "jsonCallBack",//服务端用于接收callback调用的function名的参数
        success : function(obj){
            if(obj.useronlyid){
                $sellerOnlyid = $sellerOnlyid ? $sellerOnlyid : obj.useronlyid;
                setCookie('sellerOnlyid', $sellerOnlyid);
            }
        },
        error: function(jqXHR, errorStatus, errorThrown) {
            alert('请求服务失败');
        }
    });
    // return $sellerOnlyid;
};
function fillZero(n){
    return n < 10 ? '0' + n : n + '';
}
// 获取服务器时间
function getServiceTime(){
    $.getJSON('//pub.'+ serviceUrl +'/clock/datetime?type=2&callback=?',function(data){
        var d = new Date(data['time']);
        currentDate = d.getFullYear() + '-' + fillZero(d.getMonth() + 1) + '-' + fillZero(d.getDate());
    })
};
// 判断是否

$(function(){
    getUserId();
    getSaleChannel();
});