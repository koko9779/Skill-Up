/**
 * 업무관련(공통 레이어) 
 */
;(function($) {
	if ($.type(window.elandmall) != "object") {
		window.elandmall = {};		
	};
	
	if ($.type(window.elandmall.popup) != "object") {
		window.elandmall.popup = {};		
	};
	
	elandmall.popup = {
		/**
		 * 사용방법
		 * elandmall.popup.postLayer({ callback:function(pin){},);
		 * 
		 * 리턴값
		 * callback({
		 * 		city_exp_yn : 도서산간 여부
		 * 		area_divi_cd : 지역구분코드(ST0013)
		 * 		addr_gb : 주소 검색 구분 값 10:지번 20:도로명(ST0043)
		 * 		j_post_no : 지번 우편번호
		 * 		j_base_addr :  지번 기본주소
		 * 		j_dtl_addr : 지번 상세주소
		 * 		r_post_no : 도로명 우편번호
		 * 		r_base_addr : 도로명 기본주소
		 * 		r_dtl_addr : 도로명 상세주소
		 * });
		 */			
		postLayer : function( p ) {	// 주소 찾기 팝업
			elandmall.layer.createLayer({
				layer_id:"post_layer",
				title: "주소 찾기",
				close_call_back : p.close_call_back,
				createContent: function(layer) {
					var div = layer.div_content;
					div.load("/popup/initPostNoList.action", function() {
						layer.show();
						// 엔터키
						div.on("keydown", "[name=sch_nm], #set_addr", function(e){
							if (window.event.keyCode == 13) {
								 e.preventDefault();
								 $("[name=sch_nm], #set_addr").attr('readonly', 'readonly');
							 	 $("[name=sch_nm], #set_addr").attr('disabled', 'true');
							 	 setTimeout(function() {
									 $("[name=sch_nm], #set_addr").blur();
									 $("[name=sch_nm], #set_addr").removeAttr('readonly');
									 $("[name=sch_nm], #set_addr").removeAttr('disabled');
								 }, 100); 
								$(this).next("button").click();
							}
						});
						
						// 검색
						div.on("click", "[id=postNoSearch]", function(){
							var adrPopup = $(this).closest(".pop_txt");
							fnSearchPostNoBodyListAjax(adrPopup, false);
						});	
						
						// 더보기
						div.on("click", "[id=postNoMore]", function(){
							var adrPopup = $(this).closest('.pop_txt');
							var pageIdx = $("#page_idx",adrPopup).text();
							var totPage = $("#tot_page",adrPopup).text();
							console.log(Number(pageIdx) >= Number(totPage));
							if(Number(pageIdx) >= Number(totPage)) {
								// 마지막 페이지일경우 더보기 중단
								return false;
							}
							
							$("[name=sch_nm], #set_addr").attr('readonly', 'readonly');
						 	$("[name=sch_nm], #set_addr").attr('disabled', 'true');
						 	setTimeout(function() {
						 		$("[name=sch_nm], #set_addr").blur();
								$("[name=sch_nm], #set_addr").removeAttr('readonly');
								$("[name=sch_nm], #set_addr").removeAttr('disabled');
							}, 100); 
						 	 
							fnSearchPostNoBodyListAjax(adrPopup, true);
						});
					
						// 주소 선택
						div.on("click", "[name=select_addr]", function(e){
							e.preventDefault();

							var trgtTr = $(this).parents("tr");
							var addrGb = $(this).data("addr_gb");
							var post_no = $("#post_no", trgtTr).val();
							var addr = $("#addr_admin", trgtTr).val();

							if ($("#regist_order_button").attr("today_receive") == "Y" || p.today_receive == "Y") {
								// 주문서..
								$.ajax({
									url: '/order/checkTodayDeliAdd.action',
									dataType: "json",
									data: {post_no : post_no, recvr_base_addr : addr},
									success: function(data) {
										if(data.result != "0000") {
											alert("오늘도착 상품은 서울만\n배송가능합니다\n배송지를 다시 확인해주세요.");
											return;
										} else {
											elandmall.postPopup.addUse(trgtTr, addrGb, p.callback);
											// dimm off
											if(webSizeMobileYn() == "N" && $('#temp_dimm').length > 0) {
												$("#temp_dimm").remove();
											}
											layer.close();
										}
									}, error : function( e ){
										if ( e.error_message !=null && e.error_message != ""){
											alert(e.error_message);
											return;
										}else{
											alert("처리중 오류가 발생하였습니다.");
											return;
										}
									}
								});	
							} else {
								elandmall.postPopup.addUse(trgtTr, addrGb, p.callback);
								// dimm off
								if(webSizeMobileYn() == "N" && $('#temp_dimm').length > 0) {
									$("#temp_dimm").remove();
								}
								layer.close();
							}
						});

						// 초기화
						var fnReSet = function( obj ){
							//전체 입력폼 삭제
							$("select, input", obj).val('');
							
							$(".sch_box", obj).show();
							$("[id$=_result]", obj).hide();
							$("[id$=_result]", obj).html('');

							//상세입력폼
							$("#rfnAdderList", obj).hide();		// 상세 입력 화면 숨김
							$("#div_research", obj).show();	// 다시검색 버튼 활성화
							$("#set_post_no", obj).text('');
							$("#set_base_addr", obj).text('');
							$("#div_rfn_addr", obj).text('');		//변환주소
						}
						
						if(webSizeMobileYn() != "Y"){ //PC화면일 경우 팝업 위치 및 크기 제어
							$("#post_layer").attr("style","left: 25%; top: 10%; width : 50%; height : 80%; border: 1px solid #000; display:block;");
							if($("#post_layer").height() < 554){
								$("#post_layer").attr("style","left: 25%; top: 10%; width : 50%; border: 1px solid #000; display:block;");
							}
							$(".layer_fix .pop_tit").attr("style","top : 10%; left : 25%; width : 50%; border: 1px solid #000;");
							$(".layer_fix .btn_close").attr("style","right : 25%; top : 10%;");
							$(".pop_con").attr("style","height : 80%;");
							$("body").attr("style","");
							$("body").attr("style","");
						}
					});
					
					var fnSearchPostNoBodyListAjax = function( targetObj, isMoreSearch) {
						var p = elandmall.postPopup.addrSearch(targetObj);	//sch_nm 설정
						if(!p) { return false; }	//검색어 입력 안했을 경우;
						// 더보기 일경우 page추가
						if(isMoreSearch) {
							p = $.extend({ page: $('#page_idx', targetObj).text() }, p);
						} else {
							$('#adr_search_results .board_scroll').scrollTop(0);
						}
						
						$.ajax({
							url: '/popup/searchPostNoBodyListAjax.action',
							dataType: "json",
							data: p,
							success: function(data) {
								// 검색 안내문구 숨기기
								$("div.txt_info", targetObj).first().hide();
								$("div.txt_info2", targetObj).hide();
								$(".addr_more", targetObj).hide();

								var result = data.results;
								var docCount = result.doc_count;
								var pageIdx = result.page_idx;
								var disp_pageIdx = Number(pageIdx)+1;
								var docResult = result.doc_result;

								if(docCount == 0) {
									// 검색결과 없음
									$("div.txt_info2", targetObj).show();
									$(".txt_data_info", targetObj).addClass("no_data").text("검색결과가 없습니다.");

									$('#result_body').empty();
									$(".adr_sreach_results", targetObj).removeClass("on");
								} else {
									if(docCount >= 200) {
										// 검색결과 200건 이상
										$("div.txt_info2", targetObj).show();
										$(".txt_data_info", targetObj).removeClass("no_data").html("<em>"+p.sch_nm+"</em>에 대한 검색결과가 너무 많습니다.");
									}
									
									//NGCPO-7386 주소찾기 레이어 하단영역 미노출 수정 건										
									var con_all_h = $('#post_layer .pop_txt.post').outerHeight() - 30; //팝업 컨텐츠 전체높이
									var con_input_h = $('.pop_txt.post .search_btns').outerHeight() + 13; //주소검색창 높이
									var con_info_h = 0; //검색정보 영역높이
									if($('.txt_info2').css("display") != "none"){
										con_info_h += $('.txt_info2').outerHeight()
									}
									var con_result_h = $('.adr_sreach_results').outerHeight() + 8; //검색결과 영역높이
									var con_minus_h = con_input_h + con_info_h + con_result_h; //제거 될 높이값 측정
									var con_h = con_all_h - con_minus_h; //결과값 적용될 높이값
									$('#adr_search_results .board_scroll').css('height',con_h);
									
									
									// 50건 이상일 경우 더보기 버튼 노출
									if(docCount > 50) {
										// $('.addr_more', targetObj).show(); 모바일은 스크롤 처리
										$('#ipt_page_idx', targetObj).text(pageIdx);
										$('#ipt_tot_page', targetObj).text(docCount/pageIdx);
										$('#ipt_doc_count', targetObj).val(docCount);

										$('#page_idx', targetObj).text(disp_pageIdx);
										$('#tot_page', targetObj).text(Number(docCount)%50 == 0 ? parseInt(Number(docCount)/50) : parseInt(Number(docCount)/50) + 1);
									}

									// 주소 결과 show
									$(".adr_sreach_results", targetObj).addClass("on");									
									$('#adr_result_count').text(docCount);	// 총 건수
									if(!isMoreSearch) {$('#result_body').empty();}	// 재검색(검색버튼 재클릭)
									
									$.each(docResult, function(idx, doc) {
										
										// dom 요소
										var tr = $('<tr></tr>');

										var td = $('<td></td>');
										
										// 결과 한줄당 내부 테이블
										var table_inn = $('<table></table>').addClass('inner_active');
										var colgroup_inn = $('<colgroup></colgroup>');
										var col1_inn = $('<col />').css('width', '57px');
										var col2_inn = $('<col />').css('width', '399px');
										var tbody_inn = $('<tbody></tbody>');

										// 우편번호 tr
										var tr_zipcode_inn = $('<tr></tr>');
										var td_zipcode_title_inn = $('<td></td>');
										var div_zipcode_inn = $('<div></div>').addClass('zipcode').text(doc.post_no);
										var td_zipcode_cont_inn = $('<td></td>');
								
										td_zipcode_title_inn.append(div_zipcode_inn);
										tr_zipcode_inn.append(td_zipcode_title_inn)
											.append(td_zipcode_cont_inn);

										// 도로명 tr
										var tr_road_inn = $('<tr></tr>');
										var td_road_title_inn = $('<td></td>')
										var div_road_title_inn = $('<div></div>').addClass('road');
										var span_road_title_inn = $('<span></span>').text('도로명');
										var td_road_cont_inn = $('<td></td>');
										var div_road_cont_inn = $('<div></div>').addClass('addr_road');
										var a_road_addr	 = $('<a />').attr({'name':'select_addr', "href":"javascript:;", "data-addr_gb":"20"}).text(doc.addr_road);
										
										div_road_title_inn.append(span_road_title_inn)
										td_road_title_inn.append(div_road_title_inn);
										div_road_cont_inn.append(a_road_addr);
                                        td_road_cont_inn.append(div_road_cont_inn);
                                        tr_road_inn.append(td_road_title_inn)
											.append(td_road_cont_inn);

										// 지번 tr
										var tr_jibun_inn = $('<tr></tr>')
										var td_jibun_title_inn = $('<td></td>')
										var div_jibun_title_inn = $('<div></div>').addClass('num');
										var span_jibun_title_inn = $('<span></span>').text('지번');
										var td_jibun_cont_inn = $('<td></td>');
										var div_jibun_cont_inn = $('<div></div>').addClass('addr_num');
										var a_jibun_addr	 = $('<a />').attr({'name':'select_addr', "href":"javascript:;", "data-addr_gb":"10"}).text(doc.addr_jibun);
										
										div_jibun_title_inn.append(span_jibun_title_inn)
										td_jibun_title_inn.append(div_jibun_title_inn);
										div_jibun_cont_inn.append(a_jibun_addr);
                                        td_jibun_cont_inn.append(div_jibun_cont_inn);
                                        tr_jibun_inn.append(td_jibun_title_inn)
											.append(td_jibun_cont_inn);


										// input hidden
										var ipt_post_no = $("<input type='hidden' id='post_no' />").val(doc.post_no);
										var ipt_addr_road = $("<input type='hidden' id='addr_road' />").val(doc.addr_road);
										var ipt_addr_jibun = $("<input type='hidden' id='addr_jibun' />").val(doc.addr_jibun);
										var ipt_area_divi_cd = $("<input type='hidden' id='area_divi_cd' />").val(doc.area_divi_cd);
										var ipt_city_exp_yn = $("<input type='hidden' id='city_exp_yn' />").val(doc.city_exp_yn);
										var ipt_admin_dong_nm = $("<input type='hidden' id='admin_dong_nm' />").val(doc.admin_dong_nm);
										var ipt_addr_admin = $("<input type='hidden' id='addr_admin' />").val(doc.addr_admin);//
										
										// input hidden 값 셋팅
										tr.append(ipt_post_no)
											.append(ipt_addr_road)
											.append(ipt_addr_jibun)
											.append(ipt_area_divi_cd)
											.append(ipt_city_exp_yn)
											.append(ipt_admin_dong_nm)
											.append(ipt_addr_admin);

										// dom 구성
										colgroup_inn.append(col1_inn)
											.append(col2_inn);
										tbody_inn.append(tr_zipcode_inn)
											.append(tr_road_inn)
											.append(tr_jibun_inn);
										table_inn.append(colgroup_inn)
											.append(tbody_inn);

										td.append(table_inn);
										tr.append(td);

										// dom append
										$('#result_body').append(tr); 
									});
								}
							}, error : function( e ){
								if ( e.error_message !=null && e.error_message != ""){
									alert(e.error_message);
									return;
								}else{
									alert("처리중 오류가 발생하였습니다.");
									return;
								}
							}
						});	
					} // fnSearchPostNoBodyListAjax 함수 종료
				}
			});
		},
		fnNotiPop : function(p){
//			ElandmallEventListener.fnAddOnloadListener(function() {
				var html = "";
				var param = {
						type:"m", 
						disp_mall_no : p.disp_mall_no ,
						noti_clss_cd : p.noti_clss_cd ,
						rel_no : p.rel_no
				};
				if(elandmall.global.app_cd != ""){
					param = $.extend(param,{type_dtl: "app"});
				}
				$.ajax({
					url : "/popup/searchPopNotiList2.action",
					data : param,
					type : "get",
					dataType : "json",
					cache : true,
					success : function(data){
						if(data.data[0] != null && data.data[0].NOTI_NO != ""){
							var cookie = elandmall.util.getCookie("noti_"+data.data[0].NOTI_NO);
							if(cookie == "false") return;
							var noti_no = data.data[0].NOTI_NO;
							var cookieType = data.data[0].COOKIE_DISP_DIVI_CD;
							var list = data.data;
							var clsnm = "basicpop";
							var disp_mall_no = p.disp_mall_no;
							
							elandmall.layer.createLayer({
								layer_id:"main_pop",
								class_name:"notipop_layer",
								title: data.data[0].TITLE,
								createContent: function(layer) {
									layer.show();

							 		setTimeout(function(){
							 			$(".lnb_dim").css("display", "none");
							 			if(elandmall.global.app_cd != "" && elandmall.global.disp_mall_no != '0000053'){
							 				location.href="elandbridge://tabbar/show/";
							 			}
							  		}, 2000);	
								}  // createContent
							});   // elandmall.layer.createLayer
							
							html += "<div class='dim dim-filter dim-on'></div>"
							html += "<div class='main_pop kidikidi_main_pop'>";
							html += 	"<div class='swiper-container js-mainPop_banner'>";
							html += 		"<ul class='swiper-wrapper'>";
							for(let i = 0 ; i < list.length ; i++){
								html += 		"<li class='swiper-slide'>";
								html += 			list[i].NOTI_CONT;
								html += 		"</li>";
							}
							html +=			"</ul>";
							html += 		"<div class='swiper-pagination mainPop_pagination'>";
							html +=			"</div>";
							html += 	"</div>";
							html += 	"<div class='swiper-btn-wrap'>";
							html += 		"<div class='swiper-button-prev'></div>"
							html += 		"<div class='swiper-button-next'></div>"
							html += 	"</div>";
							
							let not_message = '오늘 하루 보지 않기'
							if( cookieType=='20' ) not_message = '일주일간 보지 않기';
							else if( cookieType=='10' ) not_message = '다시 보지 않기';
							
							html += 	"<div class='btn_popWrap ch_today'>";
							html += 		"<a href='#' class='btn_popAgree p_today'>"+not_message+"</a>"
							html += 		"<a href='#' class='btn_popClose p_close'>닫기</a>"
							html += 	"</div>";
							html +=	"</div>";
							$("#main_pop").find(".pop_txt").append(html);
							if ( noti_no!=null && noti_no.length > 0 ) {
								var $noti_wrapper = $(".main_pop.kidikidi_main_pop");
								var $btns = $noti_wrapper.find(".swiper-btn-wrap");
								var noti_slds = $noti_wrapper.find('.swiper-slide').length; // 2018.03.09 추가 등록 배너가 2개 이상일 때만.. 슬라이드
								var $btns = {
									prev : $btns.find("swiper-button-prev")
									,next : $btns.find("swiper-button-next")
								}
								$('#main_pop li:last img').on('load',function(){
									$noti_wrapper.find($('.swiper-slide img')).each(function(index){
										$(this).css({'width':'', 'height':''});
									})
								});
								
								$noti_wrapper.css('opacity',1);
								if(noti_slds > 1){ // 2018.03.09 추가 - 등록 배너가 2개 이상일 때만.. 슬라이드
									var noti_bn = null;
									
									noti_bn = new Swiper('.js-mainPop_banner',{
										autoplay : {
											delay:3000,
											//disableOnInteraction:false
										},
										loop : true,
										simulateTouch : true,
										pagination : {
											el : '.mainPop_pagination',
											clickable : true,
											type: 'bullets'
										},
										navigation : {
											nextEl:'.swiper-button-next',
											prevEl:'.swiper-button-prev'	
										}
									});
									$noti_wrapper.hover(function(){
										//noti_bn.stopAutoplay()
										noti_bn.autoplay.stop();
									});
									$noti_wrapper.mouseleave(function() {
										//noti_bn.startAutoplay()
										noti_bn.autoplay.start();
									});
									$btns.prev.on("click",function(e){
										e.preventDefault();
										noti_bn.swipePrev()
									})

									$btns.next.on("click",function(e){
										e.preventDefault();
										noti_bn.swipeNext()
									})
								} else {
									$btns.next.hide();
									$btns.prev.hide();
									$noti_wrapper.find('.roll_wrap').hide();
								}
								
								$noti_wrapper.parent().css({'opacity':100,'filter':'alpha(opacity=1)'});									
								
								$(".p_today").click(function(){									
									$.ajax({
										url: "/popup/setCookie.action",
										type: "POST",
										dataType: "json",
										data: {
												type : data.data[0].COOKIE_DISP_DIVI_CD,
												noti_no : data.data[0].NOTI_NO,
												end_time : data.data[0].END_TIME
										},
										complete: function(data){
											$("#main_pop").hide();
											$("body").css({'overflow':'visible'});
											// APP 슈펜몰 인 경우
											if(elandmall.global.disp_mall_no == '0000053' && elandmall.global.app_cd != ""){
												location.href="elandbridge://tabbar/show/";
											}
										},
										error: function( e ){
											alert("팝업 설정중에 오류가 발생했습니다.");
											$("#main_pop").hide();
											$("body").css({'overflow':'visible'});
										}
									});										
								});
								$(".p_close").click(function(){										
									$("#main_pop").hide();
									$("body").css({'overflow':'visible'});
									// APP 슈펜몰 인 경우
									if(elandmall.global.disp_mall_no == '0000053' && elandmall.global.app_cd != ""){
										location.href="elandbridge://tabbar/show/";
									}
								});
							}
						}   // 최상위 if(data.data[0] != null && data.data[0].NOTI_NO != "")
					}
				});
//			});
		}
	
	}
	
	//[START] LAYER
	
	/*
	 * class_name :  레이어 클레스명 , 
	 * rtn_btn_id : 접근성을 위한 focus를 줄 버튼ID
	 * createContent : function이며, {div_content:컨텐츠OBJECT, close:닫기펑션}, div_content에 해당 레이어 내용을 넣어준다.
	 * 
	 * close_call_back :존새시 넣어 준다.
	 */
	elandmall.layer = {
		
		createLayer: function(p) {
			
			p = $.extend({ layer_id:"_COMMON_LAYER_", class_name: "layer_fix",rtn_btn_id:"", pickup_yn : "N" }, p || {});
			
			// dimm on
			if(webSizeMobileYn() == "N" && $('#temp_dimm').length == 0) {
				
				$("#container").append('<div id="temp_dimm" class="lp_dimm"></div>');
			}
			
			//레이어 생성 시, 현재 스크롤 위치를 기억한다.
			scrpos = $(window).scrollTop();
			
			/* close 가 존재하는 경우는 remove를 하지 않는다.
			  레이어가 동일한 경우 중복으로 생성 되므로 한번 clear 처리함 */
			if( $("#"+p.layer_id).length > 0){
				$("#"+p.layer_id).remove();
			}
			
			/* 서로 다른 레이어를 생성하는 경우 이전 레이어를 숨김 처리 한다. */
			if(!(p.layer_id=="reware_layer" && elandmall.global.disp_mall_no=="0000053" && $('.gds_dtl').length>0)){
				$.each($(".layer_fix, .layer_pop, .lyr_opc, .nodim"), function() {
				    layer_fix_close($(this).attr("id"));
				});
			}

			//닫기버튼 텍스트 추가 - 16.03.28, 이태영
			var close_btn_txt = "팝업 닫기";
			if($.type(p.close_btn_txt) != "undefined"){
				close_btn_txt = p.close_btn_txt;
			}
			
				
			var div;
			var html = "";

			if ( p.class_name.indexOf("layer_fix") > -1 ){
				if(p.pickup_yn == 'Y') {  //선물하기 레이어 일때
					html = 	"<div>" +
					"	<h3 class=\"pop_tit\">" + p.title + "</h3>" +
					"		<div class=\"pop_con gift\">" +
					"		</div>" +
					"	<a href=\"javascript:;\" class=\"btn_close\" ><span class=\"ir\">"+close_btn_txt+"</span></a>" +
					"</div>";
				}else{
					html = 	"<div>" +
					"	<h3 class=\"pop_tit\">" + p.title + "</h3>" +
					"		<div class=\"pop_con\">" +
					"		</div>" +
					"	<a href=\"javascript:;\" class=\"btn_close\" ><span class=\"ir\">"+close_btn_txt+"</span></a>" +
					"</div>";
				}

			}else{
				html = 	"<div>" +
							"	<div class=\"pop_con\">" +
							"		<h3 class=\"pop_tit\">" + p.title + "</h3>" +
							"		<a href=\"javascript:;\" class=\"btn_close\" ><span class=\"ir\">"+close_btn_txt+"</span></a>" +
							"	</div>" +
							"</div>";
			}
			
			div = $(html).addClass(p.class_name).attr("id", p.layer_id);
			var close;
			if($.type(p.close_call_back) == "function") {
				close = p.close_call_back;
			}else {
				close =  function() {
					layer_fix_close(p.layer_id);
					
					// dimm off
					if(webSizeMobileYn() == "N" && $('#temp_dimm').length > 0) {
						$("#temp_dimm").remove();
					}
					
					//리턴정보 활성화 처리 
					if($.type(p.rtn_btn_id) == "string" && p.rtn_btn_id != ""){
						$(p.rtn_btn_id).focus();
					}
					return false;
				};				
			};
			
			var div_content = $("<div class=\"pop_txt post\"></div>");
			if(p.tooltip_yn == "Y"){
				div_content = $("<div class=\"tooltip_lyr\"></div>");
			}
			
			if(p.pickup_yn == 'Y') { 
				div_content = div;
			}else{

				if ( p.class_name.indexOf("layer_fix") > -1 ){
					div.find(".pop_con").append(div_content);
				}else{
					div.find(".pop_tit").after(div_content);
				}
			}
			
			// title이 없을경우 제거
			if ( $.type(p.title) == "undefined" ){
				div.find(".pop_tit").remove();
			}
			//닫기 버튼 텍스트를 입력 받은 경우, 닫기버튼 텍스트를 보여준다. - 16.03.28, 이태영
			if($.type(p.close_btn_txt) != "undefined"){
				div.find("a.btn_close").children('span').removeClass('ir');
			}
			
			//닫기 버튼이 필요없는 경우 삭제 한다. ex) close_btn_no : 'Y'
			if($.type(p.close_btn_no) != "undefined" && p.close_btn_no == "Y"){
				div.find("a.btn_close").remove();
			}
			
			p.createContent({
				div_content: div_content,
				close: close,
				show : function(){
					div.appendTo("body");
					
					//키디키디 iframe이 존재하는 화면인 경우, 레이어팝업을 iframe에 맞춰 위치와 크기를 조정한다.
					let $iframe_element = $('body').find('div.iframeArea');
					if($iframe_element.length > 0){
						let $layer = $("#"+p.layer_id);
						$layer.css('width', $iframe_element.width() + 'px');
						$layer.css('height', $iframe_element.height() + 'px');
						$layer.offset($iframe_element.offset());
						//레이어 팝업 닫기 버튼 위치 재조정
						$layer.children('a.btn_close').css('position', 'absolute');
						$layer.children('a.btn_close').css('float', 'right');
						$layer.children('h3.pop_tit').css('position', 'absolute');
						
						if($layer.attr("data-initYn") != "Y") {
							$(window).resize(function(){
								$layer.offset($iframe_element.offset());
								$layer.css('width', $iframe_element.width() + 'px');
								$layer.css('height', $iframe_element.height() + 'px');
							});
						}
						
						let locationHref = top.location.href;
						window.onpopstate = function(e){
							e.stopPropagation();
							top.location.replace(locationHref);
						}						
						$layer.attr("data-initYn", "Y");
					}
					fn_layer_open(p.layer_id);
				}
			});	//내용을 만든다.
			
			div.find("a.btn_close").click(close);

		}
	};
	//[END] LAYER
 	
})(jQuery);