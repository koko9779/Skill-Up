(function($){
	
	if ($.type(window.elandmall) != "object") {
		window.elandmall = {};	
	};
	/**
	 * 파라미터
	 * sns - sns 종류(String)
	 * goods_nm - 상품명(String)
	 * title - 상품상세 이외 페이지에서 goods_nm 대신 사용(String)
	 * price - 가격(String)
	 * img - 이미지 url(String)
	 * desc - 설명..?(String)
	 * url - 현재 페이지 url(String)
	 * type - 이벤트 페이지의 경우, 'event'로 넘긴다.
	 * 페이스북과 카카오스토리, 네이버블로그의 경우 페이지 헤더에 meta 태그로 open graph을 작성해 주어야한다.
	 * */
	if ($.type(window.elandmall.sns) != "object") {
		window.elandmall.sns = {};		
	};
	
	elandmall.sns = {
			sharePage : function(p){
				var snsShareUrl ="";
				var snsText = "";
				var snsDesc = (p.desc == null || p.desc == "") ? "" : p.desc;
				
				if(typeof(p.type) != "undefined"){
					if(p.type == "event" || p.type == "shop"){
						snsText = p.title;
					}else{
						snsText = p.goods_nm;
					}
				}else{
					snsText = p.goods_nm;
				}
				
				
				if(p.sns == "FB"){			//페이스북
					
					snsShareUrl = 'https://wwww.facebook.com/sharer.php?u='+encodeURIComponent(p.url);
				
				}else if(p.sns == "KT"){	//카카오톡
					//NGCPO-9754 키디키디 카카오톡 공유하기 수정 작업
					if(elandmall.global.disp_mall_no == '0000113' && p.url.indexOf('kidikidi') > -1){
						Kakao.cleanup();
						Kakao.init('99578dd847b57e3fc3701cd9ed9d95fb');
						Kakao.Link.sendDefault({
							objectType: 'feed',
							content: {
								title: snsText,
								imageUrl: p.img,
								description: snsDesc,
								link: {
									mobileWebUrl: p.url,
									webUrl: p.url
								}
							},
							buttons: [
								{
									title: '웹으로 보기',
									link: {
										mobileWebUrl: p.url,
										webUrl: p.url
									}
								},
								{
									title: '앱으로 보기',
									link: {
										iosExecParams: p.url,
										androidExecParams: p.url
									}
								}
							]
						});
						
						setTimeout(function() { location.reload() }, 1500);
						
						return;
					}
					//NGCPO-9754 키디키디 카카오톡 공유하기 수정 작업
					
					
					Kakao.Link.sendDefault({
						objectType: 'feed',
						content: {
							title: snsText,
							imageUrl: p.img,
							description: snsDesc,
							link: {
								mobileWebUrl: p.url,
								webUrl: p.url
							}
						},
						buttons: [
							{
								title: '웹으로 보기',
								link: {
									mobileWebUrl: p.url,
									webUrl: p.url
								}
							},
							{
								title: '앱으로 보기',
								link: {
									iosExecParams: p.url,
									androidExecParams: p.url
								}
							}
						]
					});
				}else if(p.sns == "KS"){	//카카오스토리
					if(typeof(p.mobile_yn) != "undefined" && p.mobile_yn == "Y"){
						Kakao.Story.open({
					          url: p.url,
					          text: snsText
					    });
					}else{
						Kakao.Story.share({
					          url: p.url,
					          text: snsText
					    });
					}
					
				}else if(p.sns == "NB"){	// 네이버블로그
					snsShareUrl = "https://blog.naver.com/openapi/share?serviceCode=share&url="+encodeURIComponent(p.url);
					
				}else if(p.sns == "LN"){	//네이버 라인
					
					snsShareUrl= "https://line.me/R/msg/text/?"+encodeURIComponent(p.url);
					
				}else if(p.sns == "IG"){	//인스타그램 (앱일때만 실행)
					snsShareUrl = "elandbridge://share/instagram?imgUrl="+p.img;
				}else if(p.sns == "UC"){	// URL 복사
					if(typeof(elandmall.global.app_cd) != "undefined" && elandmall.global.app_cd != "" ){
						
						window.location.href = "elandbridge://urlCopy/?url="+p.url;
						alert("주소가 복사되었습니다.");
						return;
					}else if(typeof(p.mobile_yn) != "undefined" && p.mobile_yn == "Y"){
						if ($('.kims').length > 0) {
							$('#sns_lyr').hide();
							$('.dimlay').remove();
						} else {
							$("a.sns_close", "[id^=sns_lyr]").click();
						}
						if ( $("#bundle_detail").length > 0 ) {
							elandmall.layer.createLayerForLayer({
								layer_id:"url_copy_lyr",
								class_name:"layer_con",
								close_btn_txt:"닫기",
								createContent: function(layer) {
									var div = layer.div_content;
									console.dir(div);
									var lyr_html = "";
									lyr_html += "<div class=\"sns_pop\">";
									lyr_html += "	<p class=\"sns_tit\">URL</p>";
									lyr_html += "	<div class=\"sns_con\">";
									lyr_html += "		<p>아래의 URL을 전체 선택하여 복사하세요.</p>";
									lyr_html += "		<textarea id=\"url_copy_input\" onfocus = \"this.select()\">"+p.url+"</textarea>";
									lyr_html += "	</div>";
									lyr_html += "	<a href=\"javascript:void(0);\" onclick=\"fnSnsClose();\" class=\"sns_close\">닫기</a>";
									lyr_html += "</div>";
									
									div.append(lyr_html);
									div.attr('class','pop_con');
									$("#divDim").addClass("dim-on");
									layer.show();
								
								}
							});
						}else{
							elandmall.layer.createLayer({
								layer_id:"url_copy_lyr",
								class_name:"layer_con",
								close_btn_txt:"닫기",
								createContent: function(layer) {
									var div = layer.div_content;
									console.dir(div);
									var lyr_html = "";
									lyr_html += "<div class=\"sns_pop\">";
									lyr_html += "	<p class=\"sns_tit\">URL</p>";
									lyr_html += "	<div class=\"sns_con\">";
									lyr_html += "		<p>아래의 URL을 전체 선택하여 복사하세요.</p>";
									lyr_html += "		<textarea id=\"url_copy_input\" onfocus = \"this.select()\">"+p.url+"</textarea>";
									lyr_html += "	</div>";
									lyr_html += "	<a href=\"javascript:void(0);\" onclick=\"fnSnsClose();\" class=\"sns_close\">닫기</a>";
									lyr_html += "</div>";
									
									div.append(lyr_html);
									div.attr('class','pop_con');
									$("#divDim").addClass("dim-on");
									layer.show();
								
								}
							});
						}
						
					}else{
						if(window.clipboardData){
						    // IE
						    window.clipboardData.setData("Text", p.url);
						    alert("주소가 복사되었습니다.\n붙여 넣을 곳에 Ctrl + V하세요.");
						    return;
						}else{
						    // Chrome, Firefox, Safari
						    window.prompt("URL 복사 후 사용하세요.", p.url);
						    return;
						}
					}
					
				}else{
				
					alert("추후 지원 예정 SNS 입니다.");
					return;
				}
				
				/*-----그 외의 SNS-----*/
				/*else if(p.sns == "TW"){	//트위터	
					var text = p.goods_nm; //+ " " + p.price + "원";
					snsShareUrl = "https://twitter.com/intent/tweet?text="+encodeURIComponent(text)+"&url="+encodeURIComponent(p.url);
				
				}else if(p.sns == "GP"){	//구글 플러스
					snsShareUrl = "https://plus.google.com/share?url="+encodeURIComponent(p.url);
				}else if(p.sns == "PT"){	//핀터레스트
					var text = p.goods_nm; //+ " " + p.price + "원";
					
					snsShareUrl = "https://pinterest.com/pin/create/button/?url="+encodeURIComponent(p.url)+"&media="+encodeURIComponent(p.img)+"&description="+encodeURIComponent(text);
					
				}else if(p.sns == "SM"){	//SMS
					var text = p.goods_nm; //+ " " + p.price + "원\n"+encodeURIComponent(p.url);
					window.location.href="sms:?body="+encodeURIComponent(text);
				}*/
				
				if(p.sns != "KT" && p.sns != "UC" && p.sns != "SM" && p.sns != "KS"){			//카카오톡, 카카오스토리, URL 복사, SMS는 제외
					if(typeof(elandmall.global.app_cd) != "undefined" && elandmall.global.app_cd != "" && p.sns != "IG"){
						if(elandmall.global.app_cd == "iOS"){
							if(p.sns != "LN"){
								snsShareUrl = "elandbridge://browser/?url="+snsShareUrl;
							}
						}else{
							snsShareUrl = "elandbridge://browser/?url="+encodeURIComponent(snsShareUrl);
						}
					}
					if(typeof(elandmall.global.app_cd) != "undefined" && elandmall.global.app_cd != "" ){
						window.location.href=snsShareUrl;
					}else{
						window.open(snsShareUrl,"_blank");
					}

				}
			}
	};
	
})(jQuery);