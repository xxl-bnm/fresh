"use strict";

$(function () {
	$.ajax({
		type: "get",
		url: "http://47.104.244.134:8080/cartlist.do",
		data: {
			token: $.cookie("token")
		},
		success: function success(data) {
			//console.log(data);
			var str = "";
			for (var i in data) {
				str += "<li id=" + data[i].id + "  gid=" + data[i].gid + ">\n\t\t\t\t\t\t<input type=\"checkbox\" class=\"check\">\n\t\t\t\t\t\t<img src=\"" + data[i].goods.picurl + "\">\n\t\t\t\t\t\t<span class=\"name\">" + data[i].goods.name + "</span>\n\t\t\t\t\t\t<span class=\"price\">" + data[i].goods.price + "</span>\n\t\t\t\t\t\t<span class=\"reduce\">-</span>\n\t\t\t\t\t\t<input type=\"text\" class=\"nums\" value=\"" + data[i].count + "\">\n\t\t\t\t\t\t<span class=\"add\">+</span>\n\t\t\t\t\t\t<span class=\"perPrice\">" + data[i].count * data[i].goods.price + "</span>\n\t\t\t\t\t\t<strong class=\"del\">\u5220\u9664</strong>\n\t\t\t\t\t</li>";
			}
			$("#cartList").html(str);
			//删除
			$(".reduce").each(function () {
				$(this).on("click", function () {
					var num = parseInt($(this).next().val());
					num--;
					if (num <= 1) {
						num = 1;
						return;
					} else {
						$.ajax({
							type: "get",
							url: "http://47.104.244.134:8080/cartupdate.do",
							data: {
								"id": $(this).parent("li").attr("id"),
								"gid": $(this).parent("li").attr("gid"),
								"num": -1,
								"token": $.cookie("token")
							},
							success: function success(data) {
								console.log(data);
							}
						});
					}
					$(this).next().val(num);
					var price = $(this).parent("li").children(".price").text();
					//单个种类商品总价
					$(this).parent("li").children(".perPrice").text(price * num);
					//所有总价，
					count();
				});
			});
			//增加
			$(".add").each(function () {
				$(this).on("click", function () {
					var num = parseInt($(this).prev().val());
					num++;
					$(this).prev().val(num);

					$.ajax({
						type: "get",
						url: "http://47.104.244.134:8080/cartupdate.do",
						data: {
							"id": $(this).parent("li").attr("id"),
							"gid": $(this).parent("li").attr("gid"),
							"num": 1,
							"token": $.cookie("token")
						},
						success: function success(data) {
							console.log(data);
						}
					});

					var price = $(this).parent("li").children(".price").text();
					//单个种类商品总价
					$(this).parent("li").children(".perPrice").text(price * num);
					//所有总价，
					count();
				});
			});
			//删除
			$(".del").each(function () {
				$(this).on("click", function () {
					$(this).parent("li").remove();
					$.ajax({
						type: "get",
						url: "http://47.104.244.134:8080/cartupdate.do",
						data: {
							"id": $(this).parent("li").attr("id"),
							"gid": $(this).parent("li").attr("gid"),
							"num": 0,
							"token": $.cookie("token")
						},
						success: function success(data) {
							console.log(data);
						}
					});
					//总计
					count();
				});
			});
			//全选
			$("#checkAll").click(function () {
				$('.check').prop("checked", $(this).prop("checked"));
				count();
			});
			//单选
			$('.check').click(function () {
				console.log($("li input:checked"));
				if ($("li input:checked").length == $("#cartList li").length) {
					$("#checkAll").prop("checked", true);
				} else {
					$("#checkAll").prop("checked", false);
				}
				count();
			});
			//总计
			function count() {
				var prices = 0;
				$("#cartList").find("input[type='checkbox']").each(function (index) {
					if ($(this).prop("checked")) {
						prices += parseInt($(".perPrice").eq(index).text());
						console.log(prices);
					}
				});
				$("#totalPrice").text(prices);
			}
		}
	});
});