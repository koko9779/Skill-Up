

/* NGCPO-8816 키디키디 푸시알람 팝업 기능 추가 작업 */
var pushOnImgPath = "";					//수신 동의 이후 변경될 이미지 path
var pushOffImgPath = "";				//수신 동의 거부상태일 경우 표시될 이미지 path
var pushImgId = ""; 					//푸시 이미지 id
var pushCallBackFunc = function(){};	//푸시 수신여부 변경 완료 시 실행될 콜백 함수
var isPushOn  = false;					//푸시 수신 여부 상태값

var cpnDownId = ""; //쿠폰 다운로드 ID
var cpnDownOnImgPath = ""; //쿠폰 다운로드 ON 이미지
var cpnDownOffImgPath = ""; //쿠폰 다운로드 OFF 이미지
var cpnDownEvent = ""; //쿠폰 다운로드 이벤트
/* !!!NGCPO-8816 키디키디 푸시알람 팝업 기능 추가 작업 */

/* 키디키디 야간 푸시알람 팝업 기능 추가 작업*/
var nightPushOnImgPath = "";					//수신 동의 이후 변경될 이미지 path
var nightPushOffImgPath = "";				//수신 동의 거부상태일 경우 표시될 이미지 path
var nightPushImgId = ""; 					//푸시 이미지 id
var nightPushCallBackFunc = function(){};	//푸시 수신여부 변경 완료 시 실행될 콜백 함수
var isNightPushOn  = false;					//푸시 수신 여부 상태값

var nightCpnDownId = ""; //쿠폰 다운로드 ID
var nightCpnDownOnImgPath = ""; //쿠폰 다운로드 ON 이미지
var nightCpnDownOffImgPath = ""; //쿠폰 다운로드 OFF 이미지
var nightCpnDownEvent = ""; //쿠폰 다운로드 이벤트


/* !!!키디키디 야간 푸시알람 팝업 기능 추가 작업*/

/* NGCPO-8816 키디키디 푸시알람 팝업 기능 추가 작업 */
function openKidiPushSetting(imgId, offImgPath, onImgPath, callbackFunction, deeplinkurl, cpnId, cpnOffImgPath, cpnOnImgPath, fnCpnDownEvent){
	//푸쉬 설정 셋팅
	pushCallBackFunc = callbackFunction;
	pushImgId = imgId;
	pushOnImgPath = onImgPath;
	pushOffImgPath = offImgPath;
	
	//쿠폰 다운로드 셋팅
	cpnDownId = cpnId;
	cpnDownOffImgPath = cpnOffImgPath;
	cpnDownOnImgPath = cpnOnImgPath;
	cpnDownEvent = fnCpnDownEvent;
	
	if(elandmall.global.app_cd == "Android" && elandmall.util.getCookie('appName') == 'kidikidi'){		
		window.KidiCandyApp.AppGetPushAlarm('setPushImage');
	}else if(elandmall.global.app_cd == "iOS" && elandmall.util.getCookie('appName') == 'kidikidi'){
		window.webkit.messageHandlers.AppGetPushAlarm.postMessage('setPushImage');
	}else{
		//푸쉬 설정 배너
		$("#"+pushImgId).attr("src", pushOffImgPath).on("click", function(){
			//NGCPO-9077 키디키디 배너로 푸시설정 알림을 ON으로 변경하는 JavaScript 함수 수정 작업
			window.alert('키디키디 앱에서 푸시 수신여부를 설정하실 수 있습니다.');
			if( self == top && typeof(deeplinkurl) != 'undefined' && deeplinkurl != '' && elandmall.global.app_cd == '' ){
				location.href = deeplinkurl;
			}
		});

		//다운로드 버튼
		if($("#"+cpnDownId).length > 0){
			$("#"+cpnDownId).attr("src", cpnDownOffImgPath).on("click", function(){
				window.alert('키디키디 앱에서 푸시 동의 후 쿠폰 다운로드 가능합니다.');
			});
		}
		
	}
}

//앱으로부터 고객의 현재 푸시 허용여부 설정값을 받아오기
function setPushImage(flag){
	//푸시 수신 여부 상태값 변경
	isPushOn = flag;
	
	//푸시 수신 허용 여부에 따라 이미지를 변경하고 클릭 이벤트 추가
	$("#"+pushImgId).attr("src", isPushOn ? pushOnImgPath : pushOffImgPath).on("click", showPushLayer);
	
	//쿠폰 다운로드 클릭 이벤트 추가
	if($("#"+cpnDownId).length > 0){
		$("#"+cpnDownId).attr("src", flag ? cpnDownOnImgPath : cpnDownOffImgPath).on("click", function(){
			if(cpnDownEvent != null && typeof cpnDownEvent != 'undefined' && cpnDownEvent != "" && flag){
				eval(cpnDownEvent); //사용자 정의 함수 실행
			}else if(!isPushOn){
				window.alert('푸시 수신 동의 후 쿠폰 다운로드 가능합니다.');
			}
		});
	}
}

//푸시 수신 레이어 열기
function showPushLayer(){
	if(elandmall.global.apptype && elandmall.global.apptype != "" && isPushOn == false){
		
		if($('.dim-filter').length == 0){
			$('body').append('<div class="dim dim-filter dim--overBotNav"></div>');
		}
		
		$(".dim-filter").addClass("dim-on").show();
		$("#push_lyr").show();
      scroll_out();
	}else{
		window.alert("수신동의가 이미'수신'으로 설정되어 있습니다.");
	}
}

//레이어팝업에서 푸시 수신 동의를 눌렀을 경우 작동하는 함수
function fnPushAgree(){
	
	if( elandmall.global.app_cd == "Android"){		
		window.KidiCandyApp.AppSetPushAlarm('settingKidiPush', true);
	}else if( elandmall.global.app_cd == "iOS"){
		window.webkit.messageHandlers.AppSetPushAlarm.postMessage({funcName: 'settingKidiPush', bpushAgreeState: true});
	}
}

//앱으로부터 푸시 허용여부 변경에 대한 성공 여부 받기 
function settingKidiPush(flag){
	
	//푸시 수신 동의 여부가 변경되었을 경우
	if(flag == true){
		isPushOn = true;
		$("#push_lyr").hide();	//푸시 레이어 숨김
		
		window.setTimeout(function(){
			var date = new Date;
			var year = date.getFullYear();
			var month = (1 + date.getMonth());
			month = month >= 10 ? month : '0' + month;
			var day = date.getDate();
			day = day >= 10 ? day : '0' + day; 
			
			try{
				var disp_ctg_no = getParameter("disp_ctg_no");
				var event_no = getParameter("event_no");
				var kd_gnb_no = getParameter("kd_gnb_no");
				$.ajax({
					url: "/kidikidi/getCustId.action",
					dataType: "json",
					async: false,
					success : function(result) {
						if(result.login == true){
							if(disp_ctg_no != null && disp_ctg_no != ''){
								sendBanner("disp_ctg_no", disp_ctg_no, result.cust_id);
							}else if(event_no != null && event_no != ''){
								sendBanner("event_no", event_no, result.cust_id);
							}else if(kd_gnb_no != null && kd_gnb_no != ''){
								sendBanner("kd_gnb_no", kd_gnb_no, result.cust_id);
							}
						}else{
							if(disp_ctg_no != null && disp_ctg_no != ''){
								sendBanner("disp_ctg_no", disp_ctg_no, '');
							}else if(event_no != null && event_no != ''){
								sendBanner("event_no", event_no, '');
							}else if(kd_gnb_no != null && kd_gnb_no != ''){
								sendBanner("kd_gnb_no", kd_gnb_no, '');
							}
						}
					}
				});
			}catch(e){ }
			
			window.alert("키디키디 앱 알림(PUSH) 메시지 수신동의가 '수신'으로 설정되었습니다. \n\n전송자 : 키디키디\n일자 : "+year+'년 ' + month +'월 '+day + '일' + '\n\n푸시 수신은 설정 > 푸시 알림 관리에서 변경 가능합니다.');
			$("#"+pushImgId).attr("src", pushOnImgPath);
			$(".dim-filter").removeClass("dim-on").hide(); // dim 숨김
			scroll_on();
			
			//쿠폰 다운로드 클릭 이벤트 추가
			if($("#"+cpnDownId).length > 0){
				$("#"+cpnDownId).off("click");
				$("#"+cpnDownId).attr("src", flag ? cpnDownOnImgPath : cpnDownOffImgPath).on("click", function(){
					if(cpnDownEvent != null && typeof cpnDownEvent != 'undefined' && cpnDownEvent != "" && flag){
						eval(cpnDownEvent); //사용자 정의 함수 실행
					}
				});
			}
			
			if(typeof pushCallBackFunc == "function" ){
				pushCallBackFunc();
			}
			
		}, 500);
		
	}else{	//푸시 수신 동의 여부가 변경되지 않을 경우
		window.alert('알수없는 오류가 발생하였습니다.\n다시 시도해 주세요.');
	}
	
}

//레이어닫기
function fnPushClose(){
	$("#push_lyr").hide();
	$("#night_push_lyr").hide();
	$(".dim-filter").removeClass("dim-on").hide();
	scroll_on();
}

function sendBanner(type, no, cust_id){
	var bannerParams = type + "=" + no + "&cust_id=" + cust_id;
	if(isNightPushOn == true){
		bannerParams = bannerParams+"&night_push=Y"
	}
	$.ajax({
		type:'POST',
		url: elandmall.global.community_domain_url+'/api/elandmall/insertAppPushForBanner',
		dataType: "jsonp",
		data : bannerParams,
		async: false,
		error : function(e1, e2, e3) { }
	});
	
}

function getParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
/* !!!NGCPO-8816 키디키디 푸시알람 팝업 기능 추가 작업 */


/* 키디키디 야간 푸시알람 팝업 기능 추가 작업*/
function openKidiNightPushSetting(imgId, offImgPath, onImgPath, callbackFunction, deeplinkurl, cpnId, cpnOffImgPath, cpnOnImgPath, fnCpnDownEvent){
	//야간 푸쉬 설정 셋팅
	nightPushCallBackFunc = callbackFunction;
	nightPushImgId = imgId;
	nightPushOnImgPath = onImgPath;
	nightPushOffImgPath = offImgPath;
	
	//쿠폰 다운로드 셋팅
	nightCpnDownId = cpnId;
	nightCpnDownOffImgPath = cpnOffImgPath;
	nightCpnDownOnImgPath = cpnOnImgPath;
	nightCpnDownEvent = fnCpnDownEvent;
	
	if(elandmall.global.app_cd == "Android" && elandmall.util.getCookie('appName') == 'kidikidi'){	
		window.KidiCandyApp.AppGetNightPushAlarm('setNightPushImage');
	}else if(elandmall.global.app_cd == "iOS" && elandmall.util.getCookie('appName') == 'kidikidi'){
		window.webkit.messageHandlers.AppGetNightPushAlarm.postMessage('setNightPushImage');
	}else{
		//야간푸쉬 설정 배너
		$("#"+nightPushImgId).attr("src", nightPushOffImgPath).on("click", function(){
			//키디키디 배너로 야간푸시설정 알림을 ON으로 변경
			window.alert('키디키디 앱에서 야간 푸시 수신여부를 설정하실 수 있습니다.');
			if( self == top && typeof(deeplinkurl) != 'undefined' && deeplinkurl != '' && elandmall.global.app_cd == '' ){
				location.href = deeplinkurl;
			}
		});

		//다운로드 버튼
		if($("#"+nightCpnDownId).length > 0){
			$("#"+nightCpnDownId).attr("src", nightCpnDownOffImgPath).on("click", function(){
				window.alert('키디키디 앱에서 야간 푸시 동의 후 쿠폰 다운로드 가능합니다.');
			});
		}
		
	}
}


//앱으로부터 고객의 현재 야간 푸시 허용여부 설정값을 받아오기
function setNightPushImage(flag){
	//푸시 수신 여부 상태값 변경
	isNightPushOn = flag;
	
	//푸시 수신 허용 여부에 따라 이미지를 변경하고 클릭 이벤트 추가
	$("#"+nightPushImgId).attr("src", isNightPushOn ? nightPushOnImgPath : nightPushOffImgPath).on("click", showNightPushLayer);
	
	//쿠폰 다운로드 클릭 이벤트 추가
	if($("#"+nightCpnDownId).length > 0){
		$("#"+nightCpnDownId).attr("src", flag ? nightCpnDownOnImgPath : nightCpnDownOffImgPath).on("click", function(){
			if(nightCpnDownEvent != null && typeof nightCpnDownEvent != 'undefined' && nightCpnDownEvent != "" && flag){
				eval(nightCpnDownEvent); //사용자 정의 함수 실행
			}else if(!isNightPushOn){
				window.alert('야간 푸시 수신 동의 후 쿠폰 다운로드 가능합니다.');
			}
		});
	}
}

//야간푸시 수신 레이어 열기
function showNightPushLayer(){
	if(elandmall.global.apptype && elandmall.global.apptype != "" && isNightPushOn == false){
		
		if($('.dim-filter').length == 0){
			$('body').append('<div class="dim dim-filter dim--overBotNav"></div>');
		}
		
		$(".dim-filter").addClass("dim-on").show();
		$("#night_push_lyr").show();
      scroll_out();
	}else{
		window.alert("수신동의가 이미'수신'으로 설정되어 있습니다.");
	}
}


//레이어팝업에서 푸시 수신 동의를 눌렀을 경우 작동하는 함수
function fnNightPushAgree(){
	if( elandmall.global.app_cd == "Android"){	
		//야간버전
		window.KidiCandyApp.AppSetNightPushAlarm('settingKidiNightPush', true);
	}else if( elandmall.global.app_cd == "iOS"){
		//야간버전
		window.webkit.messageHandlers.AppSetNightPushAlarm.postMessage({funcName: 'settingKidiNightPush', bpushAgreeState: true});
	}
}

//앱으로부터 푸시 허용여부 변경에 대한 성공 여부 받기 
function settingKidiNightPush(flag){
	
	if(isPushOn == false){
		$("#"+pushImgId).attr("src", pushOnImgPath);
		
		if($("#"+cpnDownId).length > 0){
			$("#"+cpnDownId).off("click");
			$("#"+cpnDownId).attr("src", flag ? cpnDownOnImgPath : cpnDownOffImgPath).on("click", function(){
				if(cpnDownEvent != null && typeof cpnDownEvent != 'undefined' && cpnDownEvent != "" && flag){
					eval(cpnDownEvent); //사용자 정의 함수 실행
				}
			});
		}
	}
	
	
	//푸시 수신 동의 여부가 변경되었을 경우
	if(flag == true){
		
		$("#night_push_lyr").hide();	//푸시 레이어 숨김
		
		window.setTimeout(function(){
			var date = new Date;
			var year = date.getFullYear();
			var month = (1 + date.getMonth());
			month = month >= 10 ? month : '0' + month;
			var day = date.getDate();
			day = day >= 10 ? day : '0' + day; 
			
			try{
				var disp_ctg_no = getParameter("disp_ctg_no");
				var event_no = getParameter("event_no");
				var kd_gnb_no = getParameter("kd_gnb_no");
				$.ajax({
					url: "/kidikidi/getCustId.action",
					dataType: "json",
					async: false,
					success : function(result) {
						if(result.login == true){
							if(disp_ctg_no != null && disp_ctg_no != ''){
								sendBanner("disp_ctg_no", disp_ctg_no, result.cust_id);
							}else if(event_no != null && event_no != ''){
								sendBanner("event_no", event_no, result.cust_id);
							}else if(kd_gnb_no != null && kd_gnb_no != ''){
								sendBanner("kd_gnb_no", kd_gnb_no, result.cust_id);
							}
						}else{
							if(disp_ctg_no != null && disp_ctg_no != ''){
								sendBanner("disp_ctg_no", disp_ctg_no, '');
							}else if(event_no != null && event_no != ''){
								sendBanner("event_no", event_no, '');
							}else if(kd_gnb_no != null && kd_gnb_no != ''){
								sendBanner("kd_gnb_no", kd_gnb_no, '');
							}
						}
						
						
						if(isNightPushOn == false){
							isNightPushOn = true;
							if(result.login == true){
								if(disp_ctg_no != null && disp_ctg_no != ''){
									sendBanner("disp_ctg_no", disp_ctg_no, result.cust_id);
								}else if(event_no != null && event_no != ''){
									sendBanner("event_no", event_no, result.cust_id);
								}else if(kd_gnb_no != null && kd_gnb_no != ''){
									sendBanner("kd_gnb_no", kd_gnb_no, result.cust_id);
								}
							}else{
								if(disp_ctg_no != null && disp_ctg_no != ''){
									sendBanner("disp_ctg_no", disp_ctg_no, '');
								}else if(event_no != null && event_no != ''){
									sendBanner("event_no", event_no, '');
								}else if(kd_gnb_no != null && kd_gnb_no != ''){
									sendBanner("kd_gnb_no", kd_gnb_no, '');
								}
							}
							
						}
					}
				});
			}catch(e){ }
			
			
			
			window.alert("키디키디 앱 야간 푸시(PUSH) 메시지 수신동의가 '수신'으로 설정되었습니다. \n\n전송자 : 키디키디\n일자 : "+year+'년 ' + month +'월 '+day + '일' + '\n\n푸시 수신은 설정 > 푸시 알림 관리에서 변경 가능합니다.');
			$("#"+nightPushImgId).attr("src", nightPushOnImgPath);
			$(".dim-filter").removeClass("dim-on").hide(); // dim 숨김
			scroll_on();
			
			//쿠폰 다운로드 클릭 이벤트 추가
			if($("#"+nightCpnDownId).length > 0){
				$("#"+nightCpnDownId).off("click");
				$("#"+nightCpnDownId).attr("src", flag ? nightCpnDownOnImgPath : nightCpnDownOffImgPath).on("click", function(){
					if(nightCpnDownEvent != null && typeof nightCpnDownEvent != 'undefined' && nightCpnDownEvent != "" && flag){
						eval(nightCpnDownEvent); //사용자 정의 함수 실행
					}
				});
			}
			
			if(typeof nightPushCallBackFunc == "function"){
				nightPushCallBackFunc();
			}
			isNightPushOn = true;
			isPushOn = true;
		}, 500);
	}else{	//푸시 수신 동의 여부가 변경되지 않을 경우
		window.alert('알수없는 오류가 발생하였습니다.\n다시 시도해 주세요.');
	}
	
}

