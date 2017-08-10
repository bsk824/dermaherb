var winW = $(window).width();
function fontSize(w) {
	if (w <= 560) {
		var fontSize = w / 5.12;
		$('html').css('font-size', Math.floor(fontSize*100)/100 + '%');
	} else {
		$('html').css('font-size','62.5%');
	}

}
fontSize(winW);
$(window).resize(function(){
	var winW = $(window).width();
	fontSize(winW);
});

function getCookie(name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");

		if (x==name) return unescape(y);
	}
}
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
/* ie 버전 체크 */
function getInternetVersion(ver) {
	var rv = -1; // Return value assumes failure.
	var ua = navigator.userAgent;
	var re = null;
	if(ver == "MSIE"){
		re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	}else{
	re = new RegExp(ver+"/([0-9]{1,}[\.0-9]{0,})");
		}
	if (re.exec(ua) != null){
		rv = parseFloat(RegExp.$1);
	}
	return rv;
}
// Check the Browser Type and Version
function browserCheck() {
	var ver = 0; // Browser Version
	if(navigator.appName.charAt(0) == "M"){
		ver = getInternetVersion("MSIE");
		if (ver < "9"){
			$('body').prepend('<div id="version"><p>고객님께서는 현재 Internet Explorer 구형버전으로 접속 중이십니다. 이 사이트는 Internet Explorer 최신버전에 최적화 되어 있습니다. <a href="http://windows.microsoft.com/ko-kr/internet-explorer/download-ie" target="_blank">Internet Explorer 업그레이드 하기</a></p><p>만약 WINDOW XP를 사용 중이시라면 구글 크롬을 설치 하여주시기 바랍니다. <a href="https://www.google.co.kr/chrome/browser/desktop/">구글 크롬 설치 하기</a></p> <button type="button" class="versionClose">X</button></div>');
		}
	}
}
browserCheck();

$('#version').on('click','.versionClose',function(){
	$('#version').hide();
});

$(function() {

	$.fn.gnb = function() {
		var header = $('#header'),
			btnMenu = header.find('.btnMenu'),
			btnCloseMenu = header.find('.btnCloseMenu'),
			gnb = header.find('nav'),
			menu = gnb.find('> ul > li > a'),
			subMenu = menu.parent().find('ul');

		menu.on({
			'mouseenter' : function() {
				if ($(window).width() > 900) {
					var $this = $(this);
					$this.parent().addClass('current').siblings().removeClass('current');
					subMenu.stop().fadeOut();
					if ($this.parent().has('ul').length) {
						$this.next().stop().fadeIn();
					}
				}
			},
			'click' : function() {
				if ($(window).width() <= 900) {
					var $this = $(this);
					$this.parent().addClass('current').siblings().removeClass('current');
					subMenu.stop().slideUp();
					if ($this.parent().has('ul').length) {
						$this.next().stop().slideDown();
					}
				}
			}
		});
		header.on('mouseleave', function(){
			if ($(window).width() > 900){
				menu.parent().removeClass('current');
				subMenu.stop().fadeOut();
			}
		});
		btnMenu.on('click', function(){
			header.addClass('menuOn');
			gnb.slideDown();
		});
		btnCloseMenu.on('click', function(){
			header.removeClass('menuOn');
			gnb.slideUp();
		});
	}
	$('#header').gnb();

	$(".datepicker").datepicker({
		changeYear: true,
		changeMonth: true,
		showMonthAfterYear: true,
		yearSuffix: "년",
		prevText: "이전달",
		nextText: "다음달",
		dateFormat: "yy / mm / dd",
		dayNamesMin: ["일","월","화","수","목","금","토"],
		monthNamesShort: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]
	});
});
