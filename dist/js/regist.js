"use strict";

$(function () {
	$("#btn").click(function () {
		checkregist();
		return false;
	});
	//判断勾选复选框
	function checkregist() {
		if ($("#username").val() == "" || $("#trans").val() == "") {
			alert("不能为空");
		} else if ($("input").prop("checked") == false) {
			alert("请同意");
			return false;
		}
		$.ajax({
			type: "post",
			url: "http://47.104.244.134:8080/usersave.do",
			data: {
				username: $("#username").val(),
				password: $("#password").val(),
				email: $("#trans").val(),
				sex: $("#sex").val()
			},
			success: function success(data) {
				if (data.code == 0) {
					window.location.href = "login.html";
				} else {
					$("<p>用户名或邮箱重复<p>").prependTo(".main");
				}
			}
		});
	}
});