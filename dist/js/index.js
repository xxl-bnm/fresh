"use strict";

/**/
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
	//轮播
	var i = 0;
	$(".big-ul li").eq(i).fadeIn();
	$(".mav li").eq(i).fadeIn();
	var timer = setInterval(function () {
		move();
	}, 2600);
	function move() {
		i++;
		if (i == $(".big-ul li").length) {
			i = 0;
		}
		$(".big-ul li").eq(i).fadeIn().siblings().fadeOut();
		$(".mav li").eq(i).fadeIn().siblings().fadeOut();
		//控制角标
		$(".smallUl li").eq(i).addClass("select").siblings().removeClass("select");
	}
	//鼠标悬停.big-ul
	$(".bigImg").hover(function () {
		clearInterval(timer);
	}, function () {
		timer = setInterval(function () {
			move();
		}, 2600);
	});
	//.mav li
	$(".mav li span").hover(function () {
		$(this).addClass("bg-color-w").siblings().removeClass("bg-color-w");
	}, function () {
		$(this).removeClass("bg-color-w");
	});
	//悬浮角标
	$(".smallUl li").mouseover(function () {
		var index = $(this).index();
		i = index - 1;
		move();
	});
	//侧边导航
	$(".t-icon").children(".user").hover(function () {
		$(this).parent().next().show();
	}, function () {
		$(this).parent().next().hide();
	});
	//回到顶部
	$(".b-icon").children(".icon-jiantou").click(function () {
		$("html,body").stop().animate({
			"scrollTop": "0"
		}, 500);
	});

	//banner图片轮播选项卡切换
	$(".indextabnav li").each(function (index) {
		$(this).mouseover(function (e) {
			$(this).addClass("n1").siblings().removeClass("n1");
			$(".indexTabCon").eq(index).show().siblings(".indexTabCon").hide();
		});
	});
	//右侧选项课
	$(".indexTabNewNav li").each(function (index) {
		$(this).mouseover(function (e) {
			$(this).addClass("s2").siblings().removeClass("s2");
			$(".indexTabNewList").eq(index).show().siblings(".indexTabNewList").hide();
		});
	});
	//右侧轮播
	var offset = 0;
	var j = 0;
	var time = setInterval(function () {
		offset += -270;
		j++;
		if (offset <= -1080) {
			offset = 0;
		}
		$(".bigUl").css("marginLeft", offset);
		if (j == 3) {
			j = 0;
		}
		$(".btnBg em").eq(j).addClass("on").siblings().removeClass("on");
	}, 2000);
	//楼层
	/*	$("#floorNav").children("ul").find("li").hover(function(){
 		$(this).find("span").animate({
 			"width":"80"
 		},100).siblings().animate({
 			"width":"32"
 		})
 	})*/

	//楼层控制
	var flag = true;
	$(window).scroll(function () {
		var st = $(this).scrollTop(); //滚动距离
		if (st > 1300) {
			$("#floorNav").fadeIn();
		} else {
			$("#floorNav").fadeOut();
		}
		//获取ligaodu1
		if (flag) {
			for (var _i = 0; _i < $("#con-box li").length; _i++) {
				if (st > $("#con-box li").eq(_i).offset().top - $("#con-box li").outerWidth() / 2) {
					var index = _i;
					$("#floorNav li").eq(index).addClass("hover").siblings().removeClass("hover");
				}
			}
		}
	});

	//角标
	$("#floorNav li:not(:last)").click(function () {
		flag = false;
		var index = $(this).index();
		$("html,body").stop().animate({
			"scrollTop": $("#con-box li").eq(index).offset().top
		}, 800, function () {
			flag = true;
		});

		$(this).addClass("hover").siblings().removeClass("hover");
	});

	//最后一个
	$("#floorNav li:last").click(function () {
		flag = false;
		$("html,body").stop().animate({ "scrollTop": 0 }, 800, function () {
			flag = true;
		});
	});
	//轮播
	/*var m =0;
 setInterval(function(){
 	m++;
 	if(m == 4){
 		m =0;
 		$(".bigUl-2").css({
 			"margin-left":0
 		})
 	}
 	$(".bigUl-2").css({
 		"left",-210 * m +"px";
 	})
 },1000)*/
});