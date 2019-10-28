"use strict";

$(function () {
	//商品分类：
	var $str = "",
	    $str2 = "";
	$.ajax({
		type: "get",
		url: "http://47.104.244.134:8080/goodsbytid.do?tid=13&page=2&limit=10",
		success: function success(data) {
			//console.log(data.data);
			var data = data.data;
			for (var i in data) {
				//console.log(data[i]);
				var id = data[i].id,
				    name = data[i].name,
				    tid = data[i].tid,
				    price = data[i].price,
				    pic = data[i].picurl;
				$str += "<div>\n\t\t\t\t<p class=\"Tag Tag_b\">\n\t\t\t\t\t<span>\u672C\u5B63<br>\u7206\u6B3E</span>\n\t\t\t\t</p>\n\t\t\t\t<div class=\"spiritListPic\">\n\t\t\t\t\t<a href=\"html/detail.html?id=" + id + "\" target=\"_blank\">\n\t\t\t\t\t\t<img src=\"" + pic + "\" width=\"160\" height=\"160\">\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"spiritListTit\">\n\t\t\t\t\t<a href=\"\" target=\"_blank\">\n\t\t\t\t\t\t" + name + "\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"spiritListPrice\">\n\t\t\t\t\t<strong goodid=\"81418\" class=\"jxIndex_nowPrice_81418\">\uFFE5" + price + "</strong><span><em clubgoodid=\"81418\"></em><i class=\"clubIcon\"></i></span>\n\t\t\t\t</div>\n\t\t\t</div>\t\n\t\t\t";
				//第二个
				$str2 += "<li product-box=\"32517\">\n\t\t\t\t<p><span></span></p>\n\t\t\t<div class=\"raceListPic\">\n\t\t\t\t<a href=\"html/detail.html?id=" + id + "\" target=\"_blank\"><img src=\"" + pic + "\"  width=\"160\" height=\"160\"></a>\n\t\t\t</div>\n\t\t\t<div class=\"raceListTit\">\n\t\t\t\t<a href=\"http://www.jiuxian.com/goods-32517.html?src=6103&amp;source=113\" target=\"_blank\" title=\"45\xB0\u53E4\u4E95\u5927\u66F2250ml\uFF086\u74F6\u88C5\uFF09\">\n\t\t\t\t\t" + name + "\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t\t<div class=\"raceListPrice\"><strong goodid=\"32517\" class=\"jxIndex_nowPrice_32517\">\uFFE5" + price + "</strong></div>\n\t\t\t</li>\n\t\t\t\t\t\n\t\t\t";
			}
			$(".clearfix-div").prepend($str);
			$(".swiper-slide ul").prepend($str2);
		}
	});
});