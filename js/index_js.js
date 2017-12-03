$(function(){
   
//ajax获取数据显示页面内容
$.ajax({
    url: "js/resume.json",
    cache: false,
    success: function(html){
        var data = html.resume[0];
        console.log(data);
        // 1
        var src_index= '';
        src_index += ' <div class="index_box_b">';
        src_index +='<p>我叫'+ data.name +'</p>';
        src_index +='<p>一名在努力前进的小前端</p>';
        src_index +='<p>个人博客：<a href="'+ data.call[0].github +'" target="_Blank">'+ data.call[0].github +'</a></p>';
        src_index +='<p>你未必粗类拔萃，但一定要与众不同 —— 致自己</p>';
        src_index +=' </div>';
        $('#index .index_box').append(src_index);
        // 2
        var src_about = '';
        src_about += '<div class="about_box_b">';
        src_about +=  '<p>'+ data.about.introduce +'</p>';
        src_about +=  '</div>';
        src_about +=  '<div class="info">';
        src_about +=   '<h3>基本资料</h3>';
        src_about +=   '<p>姓名：'+ data.name +'</p>';
        src_about +=   '<p>出生：'+ data.ages +'</p>';
        src_about +=   '<p>毕业学校：'+ data.school.school_name +'</p>';
        src_about +=   '<p>专业：'+ data.school.major +'</p>';
        src_about +=   '<p>学历：'+ data.school.lei +'</p>';
        src_about +=   '<p>应聘职位：web前端</p>';
        src_about +=   '<span>X</span>';
        src_about +=' </div>';
        $('#about .about_box').append(src_about);



    }
  });



//获取高度
   var h  = $(window).height();
   var nam = 0;
//设置高度
   $('.body_box').height(h);

   var body = $('#body');
   var body_box = $('#body .body_box');
   var nav_li = $('#ment_nav li')
//导航条点击设置
    nav_li.click(function(){
      
       //获取当前点击索引
       var ind = $(this).index();
       nam = ind;
       //设置点击当前添加hover样式，兄弟节点删除
       $(this).addClass('hover').siblings().removeClass('hover');
       //设置内容显示位置
       var p = ind * h;
       body.css({
        "transform" : 'translate3d(0px,'+ -p +'px, 0px)'
       })
   })
//触摸控制显示


//头像点击显示详情
function fade(e){
    $('.info').fadeToggle();
};
$('.info span').bind('click',fade);
$('.touxiang').click(function(e){
    $('.info').fadeToggle();
});
$('.info').click(function(e){
    //阻止事件冒泡
    e.stopPropagation();
});
//经验控制
var exp_box = $('.exp_box');
var exp_big_boxs = $('.exp_big_boxs');
var src = '';
for(var i = 0; i < exp_box.length;i++){
    src += '<span></span>'
}
exp_big_boxs.append(src);
boxs_span = $('.exp_big_boxs span');
boxs_span.eq(0).addClass('cur');
boxs_span.click(function(){
    var ind = $(this).index();
    $(this).addClass('cur').siblings().removeClass('cur');
    exp_box.eq(ind).addClass('block').siblings().removeClass('block');
})

var _start = 0,
      _end = 0;
body.bind("touchstart", touchStart);
body.bind("touchmove", touchMove);
body.bind("touchend", touchEnd);

function touchStart(event) {
    var touch = event.originalEvent.touches[0];
    _start = touch.pageY;
  
}
function touchMove(event) {
    var touch = event.originalEvent.touches[0];
    _end = (_start - touch.pageY);
}
function touchEnd(event) {
    if (_end < -50) {
        _end=0;
        go_t();
        
    }else if(_end > 50){
        _end=0;
        go_b();
    }
}

//   键盘上下键控制
  $(window).keydown(function(event){
    // console.log(event.keyCode);
    if(event.keyCode == 38){
        go_b();
    }
    if(event.keyCode == 40){
        go_t();
    }
  });

  function go_t(){
    nam += 1;
    if(nam == body_box.length){
        nam = 0;
    }
    
    var p = nam * h;
    body.css({
     "transform" : 'translate3d(0px,'+ -p +'px, 0px)'
    });
    nav_li.eq(nam).addClass('hover').siblings().removeClass('hover');
  }
  function go_b(){
    nam -= 1;
    if(nam < 0){
        nam = body_box.length - 1;
    }
    
    var p = nam * h;
    body.css({
     "transform" : 'translate3d(0px,'+ -p +'px, 0px)'
    })
    //绝对值（正数）
    var a = Math.abs(nam);
    nav_li.eq(a).addClass('hover').siblings().removeClass('hover');
  }


})