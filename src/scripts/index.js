// JavaScript Document
// 
// js的入口文件
// 引入zepto-modules
var $ = require('./components/zepto-modules/_custom.js');


// 引入swiper
var Swiper = require('./components/swiper/swiper.min.js');

//  引入swiper animate
var  SwiperAnimate = require('./components/swiper/swiper.animate1.0.2.min.js');


// 引入Iscroll
var IScroll = require('./components/iscroll-probe.js');

//引入圆形进度条
require("./components/radia.js");


/**************************************************
 * 					预加载
 *************************************************/

 var timer=setInterval(function () {
 	if(document.readyState=="complete"){
 		clearInterval(timer);
 		$("#preload").hide();
 		iScroll();
 		// swiper_h.updateSlidesSize();
 		// swiper_h.updatePagination();	
 		// swiper_v.updateSlidesSize();
 		// swiper_v.updatePagination();
 	}
 },100)


 var oText=["技能","项目","经验","自我介绍"];
 var swiper_h = new Swiper('.swiper-h', {
 	pagination: '.swiper-pagination',
 	paginationClickable: true,
 	parallax: true,
 	speed: 600,
 	paginationBulletRender: function (index, className) {
 		return '<span class="' + className + '">' + oText[index] + '</span>';
 	}
 });

 var swiper_v = new Swiper('.swiper-v', {
 	pagination: '.swiper-pagination',
 	paginationClickable: true,    
 	direction: 'vertical',
 	loop:true,
 	touchRatio : 0.7,
 	touchAngle : 10,
 	paginationBulletRender: function (index, className) {
 		return '<span class="' + className + '"></span>';
 	}
 });







/********************************************************
 * 					头部+微信功能
 *******************************************************/

 $(".share .iconfont").on("tap",function(e){
 	console.log(e)
 	e.cancelBubble=true;
 	$(".share-list").toggle();
 })

 $("body").on("tap",function(){
 	$(".share-list").hide();
 })



// $.post("http://csq121605366.applinzi.com/getsign.php",{
// 	url:location.href
// },function (data) {
// 	pos=data.indexOf("}");
// 	dataStr=data.substring(0,pos+1);
// 	objData=JSON.parse(dataStr);
// 	console.log(dataStr);
// })

/********************************************************
 * 					skill
 *******************************************************/



	// iscroll滚动
	var 
	myScroll,
	downCount=0,
	upCount=0,
	loadingStep=0;
	//加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是为了防止过快加载
	//下拉更新
	function pullDownAction() {
		setTimeout(function () {
			$(".pullDown").removeClass(".active").hide();
			myScroll.refresh();
			loadingStep=0;
		},800)
	}
	//上拉加载
	function pullUpAction() {
		setTimeout(function () {
			createItem(iData,iData+2,function () {
				$(".pullUp").removeClass(".active").hide();
			myScroll.refresh();
			myScroll.scrollTo(0,myScroll.maxScrollY + 20);
			loadingStep=0;
			});	
		},800)
	}

	// 初始化执行
	function iScroll() {
		//刷新重置
		$(".pullDown").removeClass('active').hide();
		$(".pullUp").removeClass('active').hide();
		myScroll=new IScroll("#wrapper",{
			scrollbars: true,
			bounce:true,
			probeType:2,
			//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame
			scrollbars:true,
			interactiveScrollbars:true,
			shrinkScrollbars:'scale',
			momentum:true// 允许有惯性滑动 
		});

		//滚动时
		myScroll.on("scroll",function (e) {
			if(loadingStep==0){
			if(this.y>30){
			//下拉刷新效果
			$(".pullDown").addClass('active').show(300);
			loadingStep=1;
			myScroll.refresh();		//拉动一次
		}else if(this.y < (this.maxScrollY - 30)){
			//上拉加载效果
			$(".pullUp").addClass('active').show(300);
			loadingStep=1;
			myScroll.refresh();
		}
	}
});
		//滚动结束时
		myScroll.on("scrollEnd",function () {
			if(loadingStep==1){
				if($(".pullDown").attr("class").match("active")){
					$(".pullDown").removeClass("active");
					loadingStep=2;
					pullDownAction();
				}else if($(".pullUp").attr("class").match("active")){
					$(".pullUp").removeClass("active");
					loadingStep=2;
					pullUpAction();
				}
			}
		})
	}


	var iData=0;
	var aCircle=[];
	// skill页面操作dom
	function createItem(imin,imax,fn) {
		//获取数据
		$.get("./mock/skill.json",function (json) {
			var sHtml="";
			if(json.length<=iData){
				navigator.vibrate(2000);//手机震动
				alert("加载完毕");
				return false;
			}
			$.each(json,function (index,obj) {
				if(index<=imax&&index>=imin){
					sHtml="<li class='item'><div id='circle-"+index+"' class='item-circle' class='item-circle' ><img src='"+obj.images+"'></div><div class='item-content'><h2>"+obj.name+"</h2><p>"+obj.detail+"</p></div></li>";
					++iData;
					$("#add").append($(sHtml));
					var radialObj = radialIndicator('#circle-'+index+'', {
						barColor : '#87CEEB',
						barWidth : 10,
						initValue : 0,
						displayNumber: false
					});
					radialObj.animate(obj.percent);
					aCircle.push(radialObj);
				}
			})
			if(fn){
				fn();//(回调函数)
			}
		});
	}

	createItem(0,6)



var supportsVibrate = "vibrate" in navigator;


