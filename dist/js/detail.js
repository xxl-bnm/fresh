"use strict";

$(function () {
	$(".r_nav").children("li:even").hover(function () {
		$(this).children("a").css({
			"color": "#d20000",
			"text-decoration": "underline"
		}).end().children("ul").show().parent().css({
			"background": "white",
			"text-align": "center"
		});
	}, function () {
		$(this).children("a").css({
			"color": "#a5afc6",
			"text-decoration": "none"
		}).end().children("ul").hide().parent().css({
			"background": "#f2f2f2"
		});
	});
	//导航
	$(".navlist").children("li").hover(function () {
		$(this).addClass("bg-color").siblings().removeClass("bg-color");
	});
	//全部商品分类
	/*$(".r_navlist h2").hover(function(){
 	$(".categoryBox").show();
 },function(){
 	$(".categoryBox").hide();
 })*/
	//放大镜

	$(".show-pic").hover(function () {
		$(this).children("#bigs").show().end().next(".big-show").show();
	}, function () {
		$(this).children("#bigs").hide().end().next(".big-show").hide();
	});
	$(".show-pic").mousemove(function (e) {
		var evt = e || event;
		var $this = $(this);
		var $mark = $(this).children("#bigs");
		//var $bigimg =$("#bigimg");
		var $bigimg = $(this).next().children();

		//放大镜跟随鼠标
		var _left = evt.pageX - $this.offset().left - $mark.outerWidth() / 2;
		var _top = evt.pageY - $this.offset().top - $mark.outerHeight() / 2;
		//范围
		var maxLeft = $this.outerWidth() - $mark.outerWidth();
		var maxTop = $this.outerHeight() - $mark.outerHeight();

		if (_left < 0) {
			_left = 0;
		} else if (_left > maxLeft) {
			_left = maxLeft;
		}

		if (_top < 0) {
			_top = 0;
		} else if (_top > maxTop) {
			_top = maxTop;
		}
		$mark.css({ "left": _left, "top": _top });
		var imgx = -_left / $this.outerWidth() * $bigimg.outerWidth();
		var imgy = -_top / $this.outerHeight() * $bigimg.outerHeight();
		//console.log($bigimg.outerWidth())
		//大图的位置
		$bigimg.css({ "left": imgx, "top": imgy });
	});
	//缩略图
	$(".show-list").children("li").children("img").mouseover(function () {
		var s1 = $(this).attr("src"); //点击的
		$(".show-pic").children("img").attr("src", s1);
		$("#bigimg").attr("src", s1);
	});
});