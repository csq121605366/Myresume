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

/**************************************************
 * 					预加载
 *************************************************/

 var timer=setInterval(function () {
 	if(document.readyState=="complete"){
 		clearInterval(timer);
 		$("#preload").hide();
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
 	paginationBulletRender: function (index, className) {
 		return '<span class="' + className + '"></span>';
 	}
 });




