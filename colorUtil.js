﻿/* 颜色操作对象，用于转换颜色格式获取加深或变浅颜色 */
function getColorUtil(){
	var createObj = function () {
	    //将hex颜色值str转化成rgb数组
	    this.HexToRgb = function (str) {
		    var r = /^\#?[0-9a-f]{6}$/;
		    if (!r.test(str)) return showMessage("未读取到颜色值，请重试。");
		    //replace替换查找的到的字符串
		    str = str.replace("#", "");
		    //match得到查询数组
		    var hxs = str.match(/../g);
		    for (var i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
		    return hxs;
	    }
	    
		//将rgb颜色值为a,b,c转化成hex颜色值
		this.RgbToHex = function (a, b, c) {
		    var r = /^\d{1,3}$/;
		    if (!r.test(a) || !r.test(b) || !r.test(c)) return showMessage("输入错误的rgb颜色值");
		    var hexs = [a.toString(16), b.toString(16), c.toString(16)];
		    for (var i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = "0" + hexs[i];
		    return "#" + hexs.join("");
		}
		
		//得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间
		this.getDarkColor = function (color, level) {
		    var r = /^\#?[0-9a-f]{6}$/;
		    if (!r.test(color)) return showMessage("输入错误的hex颜色值");
		    var rgbc = this.HexToRgb(color);
		    //floor 向下取整
		    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
		    return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
		}
		
		//得到hex颜色值为color的减淡颜色值，level为减淡的程度，限0-1之间
		this.getLightColor = function (color, level) {
		    var r = /^\#?[0-9a-f]{6}$/;
		    if (!r.test(color)) return showMessage("输入错误的hex颜色值");
		    var rgbc = this.HexToRgb(color);
		    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]);
		    return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
		}
		
		//得到hex颜色值为color的web安全色
		this.getWebSafeColor = function (color) {
		    var r = /^\#?[0-9a-f]{6}$/;
		    if (!r.test(color)) return showMessage("输入错误的hex颜色值");
		    var rgbc = this.HexToRgb(color);
		    for (var i = 0; i < 3; i++) {
		        var q1 = Math.floor(rgbc[i] / 51) * 51;
		        //ceil向上取整
		        var q2 = Math.ceil(rgbc[i] / 51) * 51;
		        //abs绝对值
		        if (Math.abs(q1 - rgbc[i]) <= Math.abs(q2 - rgbc[i])) rgbc[i] = q1;
		        else rgbc[i] = q2;
		    }
		    return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
		}
	}
	var obj = new createObj();
	return obj;
}