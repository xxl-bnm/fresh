"use strict";

$(function () {

	$(".btn").click(function () {
		checklogin();
		return false;
	});
	//为空判断
	function checklogin() {
		if ($("#username").val() == "") {
			var $em = $("<span class='delete'>用户名密码不能为空</span>");
			$("#username").before($em);
			$(".f_test").click(function () {
				$(this).children(".delete").remove();
			});
			$("#username").focus();
			return false;
		} else if ($("#password").val() == "") {
			var $em = $("<span class='delete'>用户名密码不能为空</span>");
			$("#username").before($em);
			$(".f_test").click(function () {
				$(this).children(".delete").remove();
			});
			$("#password").focus();
			return false;
		}
		//验证登录			
		$.ajax({
			type: "post",
			url: "http://47.104.244.134:8080/userlogin.do",
			data: {
				name: $("#username").val(),
				password: $("#password").val()
			},
			success: function success(data) {
				if (data.code == 0) {
					alert("成功");
					//localStorage.setItem('token',data.data.token);
					$.cookie("token", data.data.token, { "expires": 7 });
					//console.log($.cookie("token"));
					window.location.href = "../index.html";
				} else if (data.code == 1) {
					$(".top").find("p").show();

					$("#username").click(function () {
						$(".top").find("p").hide();
						$(":text").remove();
					});
				}
			}
		});
	}
});