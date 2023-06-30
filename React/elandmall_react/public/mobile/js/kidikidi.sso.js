
/* 키디키디 로그인 SSO 처리를 위한 게이트 전환*/
var goOtherkidiSite = function(url_path, type, param){
	
	var actionUrl = "/kidikidi/kidiLogin.action";	
	var _ga_linker = ga_linker();
	if(_ga_linker == undefined){
		alert('잠시 후 다시 시도해주세요');
		return;
	}
	//GA태그 동기화
	if(location.href.substr(-1) == '/'){
		url_path = url_path.substring(0, url_path.length - 1)
	}
	if(url_path.indexOf('?') != -1){
		url_path = url_path+encodeURIComponent('&'+ _ga_linker);
	}else{
		url_path = url_path+encodeURIComponent('?'+ _ga_linker);
	}
	
	if($.type(elandmall.global.app_cd) != "undefined" && elandmall.global.app_cd != "" && type == "200" 
		&& (url_path.indexOf("/userStyleDetailPop") > -1 || url_path.indexOf("/community/explore/userStyleList") > -1 || url_path.indexOf("/community/photo/regist/form") > -1)){ //해당 url일 경우에만 서브웹뷰로 호출
		
		actionUrl = "https:" + elandmall.global.kidimarket_domain_url + actionUrl; //APP 함수로 SSO 유지 이동일 경우 full url로 처리
		
		if(elandmall.global.app_cd == "Android"){ //안드로이드 앱일 경우 서브웹뷰 함수 호출
			var postData = "url=" + encodeURIComponent(url_path) + "&type=" + encodeURIComponent(type) + "&paramstring=" + encodeURIComponent(param);
			//console.log("postData = " + postData);
			//console.log("actionUrl = " + actionUrl);
			KidiCandyApp.AppInnerWebViewPostTypePopupOpen(actionUrl, postData, false);
		}else if(elandmall.global.app_cd == "iOS"){ //아이폰 앱일 경우 서브웹뷰 함수 호출
			var postData = "url="+url_path+"&type="+type+"&paramstring="+param;
			//console.log("postData = " + postData);
			//console.log("actionUrl = " + actionUrl);
			window.webkit.messageHandlers.AppInnerWebViewPostTypePopupOpen.postMessage({url: actionUrl, postData: postData, topShow: false});
		}
	}else{
		
		//새창 팝업에서 다시 새창 팝업을 열었을 경우 페이지 이동이 되는 현상 때문에 id변수 값 추가 처리
		var objCurrentTime = new Date();
		
		var currentTimeId = objCurrentTime.getHours() + objCurrentTime.getMinutes() + objCurrentTime.getSeconds();
		
		var $form = $('<form></form>');
		
		//새창 팝업으로 화면 이동인 url 처리 //키디통합에선 현재창 이동으로 변경
		/*if(url_path.indexOf("/userStyleDetailPop") > -1 || url_path.indexOf("/community/explore/userStyleList") > -1 || url_path.indexOf("/community/photo/regist/form") > -1){
			window.open("about:blank", "kidiNewPop" + currentTimeId);
			$form.attr('target', "kidiNewPop" + currentTimeId);
		}*/
		
		$form.attr('action', actionUrl);
		$form.attr('method', 'post');
		$form.appendTo('body');
		$form.append($("<input type='hidden' value=" + url_path + " name='url'>"));
		$form.append($("<input type='hidden' value=" + type + " name='type'>"));	
		$form.append($("<input type='hidden' value=" + param + " name='paramstring'>"));	
		$form.submit();
	}
}

//키디키디 -> 커뮤니티 이동시 GA태그 파라미터 추출용
function ga_linker(){
	var ga = window[window['GoogleAnalyticsObject']];
	var ga_tracker;
	var ga_linkerParam = undefined;
	if (ga && typeof ga.getAll === 'function') {
		ga_tracker = ga.getAll()[0];
		ga_linkerParam = new window.gaplugins.Linker(ga_tracker).decorate(" ").split("?")[1];
		if(ga_linkerParam.indexOf('&') > -1) {
			ga_linkerParam = ga_linkerParam.split("&")[0];
		}
	}
	return ga_linkerParam;
}
