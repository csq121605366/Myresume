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
// 引入微信jsdk
var wx = require('../../node_modules/weixin-js-sdk/index.js');

/**************************************************
 * 					预加载
 *************************************************/

 var timer=setInterval(function () {
 	if(document.readyState=="complete"){
 		clearInterval(timer);
 		$("#preload").hide();
 		iScroll();
 		myScroll.refresh();
 		// swiper-h.updateSlidesSize();
 		// swiper-h.updatePagination();	
 		// swiper-v.updateSlidesSize();
 		// swiper-v.updatePagination();
 	}
 },100)


 var oText=["技能","项目","经验","自我介绍"];
 var swiper_h = new Swiper('.swiper-container-h', {
 	pagination: '.swiper-pagination-h',
 	paginationClickable: true,
 	parallax: true,
 	speed: 600,
 	paginationBulletRender: function (index, className) {
 		return '<span class="' + className + '">' + oText[index] + '</span>';
 	}
 });

 var swiper_v = new Swiper('.swiper-container-v', {
 	pagination: '.swiper-pagination-v',
 	paginationClickable: true,    
 	direction: 'vertical',
 	touchRatio : 0.7,
 	touchAngle : 10,
 	spaceBetween : 20,
 	paginationBulletRender: function (index, className) {
 		return '<span class="' + className + '"></span>';
 	}
 });

 var swiper_v_me = new Swiper('.swiper-container-v-me', {
 	pagination: '.swiper-pagination-v-me',
 	paginationClickable: true,    
 	direction: 'vertical',
 	touchRatio : 0.7,
 	touchAngle : 10
 });

/********************************************************
 * 					点击四个选项卡的动画
 *******************************************************/




/********************************************************
 * 					头部+微信功能
 *******************************************************/

 $(".share .iconfont").on("tap",function(e){
 	e.cancelBubble=true;
 	$(".share-list").toggle();
 })

 $("body").on("tap",function(){
 	$(".share-list").hide();
 })

/*
 
 $.post("http://csq121605366.applinzi.com/getsign.php",{
 	url:location.href
 },function (data) {
 	pos=data.indexOf("}");
 	dataStr=data.substring(0,pos+1);
 	objData=JSON.parse(dataStr);
 	wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId:objData.appId, // 必填，公众号的唯一标识
        timestamp:objData.timestamp , // 必填，生成签名的时间戳
        nonceStr:objData.nonceStr, // 必填，生成签名的随机串
        signature: objData.signature,// 必填，签名，见附录1
        jsApiList: ['scanQRCode','onMenuShareTimeline','onMenuShareQQ','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
 })


 //微信ready
 wx.ready(function () {
 	//微信扫一扫 
 	$(".scan .iconfont").on("tap",function(){
 		wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
               var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
               alert(result);
           }
       })
 	})
 })


*/



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
		$.get("http://csq121605366.applinzi.com/mock/skill.php?callback=?",function (json) {
			var sHtml="";
			if(json.length<=iData){
				navigator.vibrate(800);//手机震动
				alert("还有更多内容，请于我详谈。");
			}
			$.each(json,function (index,obj) {
				if(index<=imax&&index>=imin){
					sHtml="<li class='item'><div id='circle-"+index+"' class='item-circle' class='item-circle' ><img src='"+obj.images+"'></div><div class='item-content'><h2>"+obj.name+"</h2><p>"+obj.detail+"</p></div></li>";
					++iData;
					$("#add").append($(sHtml));
					var radialObj = radialIndicator('#circle-'+index+'', {
						barColor : '#99CCFF',
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

/********************************************************
 * 					project
 *******************************************************/


 function proCreateItem() {
 	//获取信息
 	$.get("http://csq121605366.applinzi.com/mock/project.php?callback=?",function (json) {
 		// console.log(json)
 		var sHtml=""
 		$.each(json,function (index,obj) {
 			sHtml+='<div class="swiper-slide">'+
 			'<table class="list-project">'+
 			'<tr><th colspan="2">'+obj.name+'</th></tr>'+
 			'<tr><td colspan="2"><img src="'+obj.images+'"></td></tr>'+
 			'<tr><td>类型:</td><td>'+obj.category+'</td></tr>'+
 			'<tr><td>网址:</td><td>'+obj.url+'</td></tr>'+
 			'<tr><td>公司介绍:</td><td>'+obj.description+'</td></tr>'+
 			'<tr><td>工程介绍:</td><td>'+obj.detail+'</td></tr>'+
 			'<tr><td>描述:</td><td>'+obj.tech+'</td></tr></table></div>';
 		})
 		$(".swiper-container-v .swiper-wrapper").append($(sHtml));
 		swiper_v.updateSlidesSize();
 		swiper_v.updatePagination();
 		swiper_v.updateContainerSize();
 	})
 }

 proCreateItem();

/********************************************************
 * 					experience
 *******************************************************/
 
// 经验页面的iscroll
var exper_scroll=new IScroll(".scroll-wrap",{
	bounce:true,
	shrinkScrollbars:'scale',
	momentum:true
});

function experCreateItem() {
	//获取信息
	$.get("http://csq121605366.applinzi.com/mock/work.php?callback=?",function (json) {
 		// console.log(json)
 		var sHtml=""
 		$.each(json,function (index,obj) {
 			sHtml+= '<li class="timeline-item"><time class="tl-time">'+
 			'<span>'+obj.timeStart+'</span>'+
 			'<span>'+obj.timeEnd+'</span></time><div class="tl-icon"></div>'+
 			'<div class="tl-content">'+
 			'<h2>'+obj.name+'</h2>'+
 			'<p><img src="'+obj.image+'" alt=""></p>'+
 			'<p>'+obj.posts+'</p></div></li>';
 		})
 		$(".timeline").append($(sHtml));
 		exper_scroll.refresh();
 	})
}

experCreateItem()

/********************************************************
 * 					about me
 *******************************************************/






