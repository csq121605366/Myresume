// JavaScript Document
// 
// js的入口文件
// 引入zepto-modules
var $ = require('./components/zepto-modules/_custom');
require('./components/zepto-modules');
module.exports = $;

// 引入swiper
var Swiper = require('./components/swiper/swiper.min.js');

//  引入swiper animate
var  SwiperAnimate = require('./components/swiper/swiper.animate1.0.2.min.js');

// 引入Iscroll
var IScroll = require('./components/iscroll.js');
// console.dir(IScroll)


// 初始化slide背景
!function slideBg(){
	var 
		iNumSlide = $('.first-slide').length,	// 导航个数
		scenceWidth = $('.first-slide').width();	//屏幕宽度
		
	$('.first-slide').css({
		'background-size': iNumSlide*scenceWidth*2,
		// 'background': 'url(../images/slide-bg.jpg) left top'
	});
	for(var i=0;i<iNumSlide;i++){

		console.log(i*scenceWidth)
		$('.first-slide').eq(i).css({
			'background-position-x': -i*scenceWidth
		})
	}
}();
console.log($('.first-slide').eq(0).css('background-position-x'))


// 定义导航内容
var aThumbs = [
		{
			zh: '技能',
			en: 'skill',
			icon: '&#xe644;'
		}, 
		{
			zh: '经验',
			en: 'work',
			icon: '&#xe6b2;'
		}, 
		{
			zh: '项目',
			en: 'project',
			icon: '&#xe61b;'
		}, 
		{
			zh: '我',
			en: 'myself',
			icon: '&#xe684;'
		}
];

// -----------------------swiper----------------------
var galleryTop = new Swiper('.main', {
	effect: 'filp',	//切换效果
	touchAngle : 15,		//设置了很小的允许拖动角度
	onTouchMoveOpposite(swiper, event){
		
    },		//当手指触碰Swiper并且没有按照 direction 设定的方向移动时执行
	onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    	SwiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
    	SwiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
	}, 
	onSlideChangeEnd: function(swiper){ 
	    SwiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
	},
	resistanceRatio: 0.6,		//抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。
	longSwipesRatio : 0.4,		//触发swiper所需要的最小拖动距离比例
    pagination: '.swiper-pagination',
    paginationClickable: true,
    paginationBulletRender: function (index, className) {
    	return '<span class="' + className + '"><i class="iconfont">' + aThumbs[index].icon + '</i><b>' + aThumbs[index].zh + '</b></span>';
    },
    parallax: true
});


var swiper = new Swiper('.content', {
	effect: 'flip',
	direction: 'vertical'
});

// ----------------------end swiper----------------------

// ------------------IScroll--------------------------------
var myScroll;
window.onload=function () {
	loaded ();
}
function loaded () {
	myScroll = new IScroll('#scroll-wrap', { mouseWheel: true, tap: true });
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

// ------------------end  IScroll--------------------------------

// -------------------------aJax------------------------------
// default config (zepto, event, ajax, form, ie) 
$.ajax({
	type: "GET",
	url: "api/skill",
	dataType: 'json',
	success: function(data){
		$.each(data, function(index, obj){
			// console.log(obj)
			$("#scroller ul div h3").html(obj.name)
		})
	},
	error: function(xhr, type){
    	// alert('Ajax error!')
  	}
})

// -------------------------end aJax------------------------------

// --------------------------预加载-------------------------------

var loadTimer = setInterval(function(){
	if(document.readyState === "complete") {
		clearInterval(loadTimer);
		$('#preload').hide();
	} else{
		$('#preload').show();
	}
}, 100)

// --------------------------end 预加载-------------------------------





















