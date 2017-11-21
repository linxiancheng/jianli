// 获取可视范围的高度
var h  = document.body.clientHeight;
// 获取body元素
var __body = document.getElementById('body');
// 动态设置body的高度
__body.style.height = h + 'px';
//获取当前translate3d中y的值
var y = getComputedStyle(__body).transform.replace(/[^0-9\-,]/g,'').split(',')[5];
// 开关
var btn = true;
// 鼠标滚动事件
var scrollFunc = function (e) {  
   var e = e || window.event;  
   var ind = document.getElementsByClassName('body_box');
  
    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件  
           
        if (e.wheelDelta > 0 ) { //当滑轮向上滚动时 
            toT(ind)
        }  
        if (e.wheelDelta < 0 ) { //当滑轮向下滚动时
            toB(ind)
        } 
    
    }
}  
//给页面绑定滑轮滚动事件  
if (document.addEventListener) {//firefox  
    document.addEventListener('DOMMouseScroll', scrollFunc, false);  
}  
//滚动滑轮触发scrollFunc方法  //ie 谷歌  
window.onmousewheel = document.onmousewheel = scrollFunc;  
var nav_ul = document.getElementById('ment_nav');
var nav_li = nav_ul.getElementsByTagName('li');

function onBtn(){
    btn = true;
}
//页面滚动控制
function toT(e){
    var a = e ||  [];
    y += h;
    if(y>0){
        y = 0;
    } 
    var ind = Math.abs( y / h);//获得当前页面显示的索引
    for(var l = 0; l<nav_li.length;l++){
        nav_li[l].className = ' ';
    }
    nav_li[ind].className = 'hover';
   body.style.transform = 'translate3d(0px,'+ y +'px, 0px)';  
}
function toB(e){
    var a = e ||  [];
    y -= h; 
    if(y< (a.length * h)){
        y = -a.length * h + h;
    } 
    var ind = Math.abs( y / h);
    for(var l = 0; l<nav_li.length;l++){
        nav_li[l].className = ' ';
    }
   var j = ind*h;
   console.log(ind)
   console.log(__body.offsetHeight )
   console.log(j)
    nav_li[ind].className = 'hover';
    body.style.transform = 'translate3d(0px,'+ y +'px, 0px)'; 
} 
// 导航行点击显示位置设置
var h_a = document.getElementById('header').getElementsByTagName('li');
// for(var i = 0;i<h_a.length;i++){
//     h_a[i].index = i;
//     h_a[i].onclick=function(){
//       var j=this.index;
//       var p = -j*h;
//       body.style.transform = 'translate3d(0px,'+ p +'px, 0px)'; 
//     }
// }

//触摸事件
function k_touch() {
    var ind = document.getElementsByClassName('body_box');
    var exp_box = document.getElementsByClassName('exp_box');
    var exp_span = document.getElementsByClassName('exp_big_boxs')[0].getElementsByTagName('span');
    console.log(exp_box)
    console.log(exp_span[1])
    var _start = 0,
          _end = 0, 
          _top = 0,
       _bottom = 0,
          _ind = 0,
    _body= document.getElementById("body"),
    _content = document.getElementById("experience");
    _content.addEventListener("touchstart", touchStart, false);
    _content.addEventListener("touchmove", touchMove, false);
    _content.addEventListener("touchend", touchEnd, false);
    _body.addEventListener("touchstart", touchStart, false);
    _body.addEventListener("touchmove", touchMove, false);
    _body.addEventListener("touchend", touchEnd, false);
    function touchStart(event) {
        var touch = event.targetTouches[0];
        _start = touch.pageX;
        _top = touch.pageY;
      
    }
    function touchMove(event) {
        var touch = event.targetTouches[0];
        _end = (_start - touch.pageX);
        _bottom = (_top - touch.pageY);
    }


    function touchEnd(event) {
        console.log(_start)
        console.log(_end)
        console.log('--------------------------')
        console.log(_top)
        console.log(_bottom)
        //经历控制
        if (_end < -50) {
            _end=0;
           
            
        }else if(_end > 50){
            _end=0;
       
        }
        //触摸页面控制
        if (_bottom < -50) {
             _bottom=0;
             toB(ind);
             
         }else if(_bottom > 50){
             _bottom=0;
             toT(ind);
         }

    }
}
k_touch();


//jq写法

$(function(){
    //导航点击显示对应页面
    var a_li = $('#header nav ul li');
    a_li.click(function(){
    $(this).addClass('hover').siblings().removeClass('hover');
     var a = $(this).find('a')
     var ind = $(this).index();
     var h = $('.body_box').height();
     var p = -ind*h;
     $('#body').css({
         "transform" : 'translate3d(0px,'+ p +'px, 0px)'
     })
     
    })
    //经验控制
    var exp_box = $('.exp_box');
    var exp_big_boxs = $('.exp_big_boxs');
    var src = '';
    for(var i = 0; i < exp_box.length;i++){
        src += '<span></span>'
    }
    exp_big_boxs.append(src);
    boxs_span = $('.exp_big_boxs span');
    boxs_span.eq(0).addClass('cur')
    boxs_span.click(function(){
        var ind = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        exp_box.eq(ind).addClass('block').siblings().removeClass('block');
    })

    // 关于我
    $('.info span').click(function(e){
        $('.info').hide();
    });
    $('.touxiang').click(function(e){
        $('.info').fadeToggle();
    });
    $('.info').click(function(e){
        e.stopPropagation();//阻止事件冒泡
    });
})