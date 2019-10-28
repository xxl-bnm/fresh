"use strict";

$(function () {
	var gid = location.search.split("=")[1];
	//console.log(id)
	var userid = $.cookie("token");
	var $str = "";
	var $str1 = "";
	var $pic = "";
	var $buy = "";
	//console.log(userid );
	$.ajax({
		type: "get",
		url: "http://47.104.244.134:8080/goodsbyid.do",
		data: {
			id: gid
		},
		success: function success(data) {
			//var sid=data.id;//商品id
			var name = data.name;
			var price = data.price;
			var pic = data.picurl;
			//名称
			$str = "<h1>" + name + "</h1>";
			$(".comName").prepend($str);
			//价格	
			$str1 += "<div class=\"infoCon infoPri\" id=\"nowPrice\"><span class=\"pri\"><em>\uFFE5</em><strong>" + price + "</strong></span><span class=\"tim\" style=\"display:none;\"></div></div>";

			$(".cuxiao").after($str1);
			//图片
			$pic += "<li><img src=\"" + pic + "\" width=\"60\" height=\"60\"></li>";
			$(".show-pic").prepend($pic);
			$(".show-list").prepend($pic);
			$(".big-show").prepend($pic);
			//立即购买
			$("#btnDetail").prepend($buy);
			//数量加减事件
			$(".add").click(function () {
				var num = parseInt($("#_nub").val());
				num++;
				$("#_nub").val(num);
			});
			$(".reduce").click(function () {
				var num = parseInt($("#_nub").val());
				num--;
				if (num < 1) {
					num = 1;
				}
				$("#_nub").val(num);
			});
			//查询购物车，该商品是佛存在
			$(".buyBtn").click(function () {
				var num = parseInt($("#_nub").val());
				//console.log(num)
				$.get("http://47.104.244.134:8080/cartlist.do", {
					token: $.cookie("token")
				}, function (data) {
					//console.log(data);
					for (var i in data) {
						if (data[i].gid == gid) {
							//存在，直接累加
							$.get("http://47.104.244.134:8080/cartupdate.do", {
								"id": data[i].id,
								"gid": gid,
								"num": num,
								"token": $.cookie("token")
							}, function (data) {
								//console.log(data);
								alert("成功加入" + num + "条数据");
								location.href = "carlist.html";
							});
							return;
						}
					}
					//否则：向购物车加一条
					$.get("http://47.104.244.134:8080/cartsave.do", {
						"gid": gid,
						"token": $.cookie("token")
					}, function (data) {
						if (data.code == 0) {
							//location.href="carlist.html"
							//如果num不h是1.则继续添加一条，
							if (num != 1) {
								$.get("http://47.104.244.134:8080/cartlist.do", {
									"token": $.cookie("token")
								}, function (data) {
									for (var _i in data) {
										if (data[_i].gid == gid) {
											$.ajax({
												type: "get",
												url: "http://47.104.244.134:8080/cartupdate.do",
												data: {
													"id": data[_i].id,
													"gid": id,
													"num": num - 1,
													"token": $.cookie("token")
												},
												success: function success(data) {
													alert("成功加入" + num + "条到购物车！");
													location.href = "carlist.html";
												}
											});
										}
									}
								});
							} else {
								alert("成功加入1条到购物车！");
							}
						}
					});
					//location.href = "carlist.html"
				});
			});
		}

	});
});