/**
 * Created by pkk on 2018/7/22.
 */

$(function(){
    var $pageIndex = 1;
    var product = {
        api: {
            
        },
        init: function () {
            var _this = product;
            _this.searchBox();
            _this.tabColumn();
            _this.productClass();
            _this.listDisplay();
        },
        // 搜索框
        searchBox: function(){

        },
        // TAB分栏
        tabColumn: function(){

        },
        // 产品分类
        productClass: function(){
            // 筛选事件
            $('.product_class .address_wrap .filter_close').bind('click', function(){
                if($('.product_class .class_detail').is(':hidden')){
                    $('.product_class .address_wrap .filter_close').html('收起筛选<i class="up"></i>');
                }else {
                    $('.product_class .address_wrap .filter_close').html('展开筛选<i></i>');
                }
                $('.product_class .class_detail').toggle();
            });
            // 更多
            $('.product_class .class_detail .class_r .btn_r').bind('click', function(){
                if($(this).parents().eq(1).find('.class_c ul').hasClass('show')){
                    $(this).parents().eq(1).find('.class_c ul').removeClass('show');
                }else {
                    $(this).parents().eq(1).find('.class_c ul').addClass('show');
                }
                if($(this).parents().eq(1).find('.class_c ul').height() > 60){
                    $(this).html('收起<i class="up"></i>');
                }else {
                    $(this).html('更多<i></i>');
                }
                $(this).parents().eq(1).find('.class_c ul').scrollTop(0);
            });
            // 全选
            $('.product_class .class_detail .class_r .btn_l').bind('click', function(){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $(this).parents().eq(1).find('.class_c ul li').removeClass('active');
                }else {
                    $(this).addClass('active');
                    $(this).parents().eq(1).find('.class_c ul li').addClass('active');
                }
            });
            // 单选
            $('.product_class .class_detail .class_c ul li').bind('click', function(){
                var isAll = false;
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                    $(this).parents().eq(2).find('.class_r .btn_l').removeClass('active');
                    isAll = false;
                }else {
                    $(this).addClass('active');
                    var liLength = $(this).parent().find('li').length;
                    for(var i=0; i<liLength; i++){
                        if(!$(this).parent().find('li').eq(i).hasClass('active')){
                            isAll = false;
                            break;
                        }else {
                            isAll = true;
                        }
                    }
                    if(!isAll){
                        $(this).parents().eq(2).find('.class_r .btn_l').removeClass('active');
                    }else {
                        $(this).parents().eq(2).find('.class_r .btn_l').addClass('active');
                    }
                }
            });
        },
        // 列表展示
        listDisplay: function(){
            $('.grid_list').mousedown(function (e){
                var windowWidth = window.innerWidth || document.documentElement.clientWidth;
                var startX = e.pageX - $(this).offset().left;
                var gridWidth = $(this).width();
                var patch = (windowWidth -1200)/2-8 + startX ;
                var term1 = 1200 - gridWidth;                       // 移动界值1
                $(document).mousemove(function (event){
                    var ox=event.clientX;
                    var l=ox-patch;
                    if(l>0 && l< -2*term1){
                        l=l/2;
                    }else if(l>= -2*term1){
                        //l=-term1/2;
                        l=0;
                    }else if(l>3*term1 && l<term1){
                        l = (l+term1)/2;
                    }else if(l<3*term1){
                        l = term1;
                    }
                    $('.grid_list').css({marginLeft:l});
                })
            });
            $(document).mouseup(function (){
                var gridLeft = parseFloat($('.grid_list').css('marginLeft'));
                var gridWidth = $('.grid_list').width();
                var term1 = 1200 - gridWidth;                      // 移动界值1
                if(gridLeft>=0 && gridLeft < -term1){
                    $('.grid_list').css({marginLeft:'0'});
                }else if(gridLeft <=term1 && gridLeft > 2*term1){
                    $('.grid_list').css({marginLeft:term1});
                }
                $(this).unbind("mousemove");
            });
            // 加载表格
            // 选择
            $('.grid_list .list_td li .choice_r a').bind('click', function(){
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                }else {
                    $(this).addClass('active');
                }
            });
            // 分页
            product.page($pageIndex,36);
        },
        // 分页
        page: function(index, total){
            var index = parseInt(index);
            var total = parseInt(total);
            // 配置项
            var pageCondition = {
                'maxPage': 5,       // 展示 5 个分页按钮
                'num': 5            // 一页显示条数
            };
            var pageLength = Math.ceil(total/pageCondition.num);    //进一法取整
            var helfPageLength = parseInt(pageCondition.maxPage/2);
            var pageHtml = '<i class="btn_l" title="上一页"></i><ul>';
            if(pageLength <= pageCondition.maxPage){
                for(var i=0; i<pageLength; i++){
                    if(index == (i+1)){
                        pageHtml += '<li class="active">'+ (i+1) +'</li>';
                    }else {
                        pageHtml += '<li>'+ (i+1) +'</li>';
                    }
                }
            }
            if(pageLength > pageCondition.maxPage){
                if(index-helfPageLength < 1){
                    for(var j=0;j<pageCondition.maxPage;j++){
                        if(index == (j+1)){
                            pageHtml += '<li class="active">'+ (j+1) +'</li>';
                        }else {
                            pageHtml += '<li>'+ (j+1) +'</li>';
                        }
                    }
                }
                if(index-helfPageLength >= 1 && index <= pageLength-helfPageLength){
                    for(var k=(index-helfPageLength-1); k< (index + helfPageLength); k++){
                        if(index == (k+1)){
                            pageHtml += '<li class="active">'+ (k+1) +'</li>';
                        }else {
                            pageHtml += '<li>'+ (k+1) +'</li>';
                        }
                    }
                }
                if(index > pageLength-helfPageLength){
                    for(var k=(pageLength-pageCondition.maxPage); k< pageLength; k++){
                        if(index == (k+1)){
                            pageHtml += '<li class="active">'+ (k+1) +'</li>';
                        }else {
                            pageHtml += '<li>'+ (k+1) +'</li>';
                        }
                    }
                }
            }
            pageHtml += '</ul><i class="btn_r" title="下一页"></i>';
            $('#pageWrap').html(pageHtml);
            // 事件
            $('.page_wrap ul li').bind('click', function(){
                $pageIndex = parseInt($(this).text());
                // 加载表格
                product.listDisplay();
            });
            $('.page_wrap .btn_l').bind('click', function(){
                var pageVal = parseInt($('.page_wrap ul li.active').text());
                if(pageVal > 1){
                    $pageIndex = parseInt($('.page_wrap ul li.active').text()) -1;
                    // 加载表格
                    product.listDisplay();
                }
            });
            $('.page_wrap .btn_r').bind('click', function(){
                var pageVal = parseInt($('.page_wrap ul li.active').text());
                if(pageVal < pageLength){
                    $pageIndex = parseInt($('.page_wrap ul li.active').text()) +1;
                    // 加载表格
                    product.listDisplay();
                }
            });
        }
    };
    product.init();
});
