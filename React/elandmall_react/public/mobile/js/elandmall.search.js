;(function($) {
	
	var cal_input_layer = null;
	var cate_navi1 = "";
	var cate_navi2 = "";
	var viewType = "";  // 보기방식
	
	fnsearch = {
		/**
		*  검색 Form submit
		**/				
		headerSearchForm_submit	: function () {
			var searchTerm = $.trim($("#searchTerm").val());
			
			if(searchTerm == ""){
				alert("검색어를 입력해주세요.");
				return false;				
			}else{
		            	$("#headerSearchForm").submit();	
			}
		},
		
		go2depthStoreShopCategoryList: function(ctg_no_2depth){
			window.location.href = "/dispctg/searchStoreShoppingList.action?disp_ctg_no="+ctg_no_2depth
																+"&page_idx=1"
																+"&storepick_page_yn=Y";
		},
		
		go3depthStoreShopCategoryList: function(ctg_no_2depth, ctg_no_3depth){
			window.location.href = "/dispctg/searchStoreShoppingList.action?disp_ctg_no="+ctg_no_2depth
																+"&category_3depth="+ctg_no_3depth
																+"&page_idx=1"
																+"&storepick_page_yn=Y";
		},
			
		/**
		* 입력받은 키워드로 검색
		*
		* param  frmObj - 폼오브젝트   
		*
		* return	boolean
		**/	
		srchKwd: function( frmObj ){
			var kwd = $.trim(frmObj.kwd.value);
			var link = $("#header_LandingLink").val();
			if(kwd == ""){
				alert("검색어를 입력해주세요.");
				return false;
			}else{
				fnsearchresent.callKwdCookie(kwd);
				return  true;
			}				
		},
		
		/**
		* 결과내 재검색, 검색어 제외 용 
		*
		* param  frmObj - 폼오브젝트   
		*
		* return	boolean
		**/	
		reSrchKwd: function( frmObj ){
			var kwd = $.trim(frmObj.kwd.value);
			if(kwd == ""){
				alert("검색어를 입력해주세요.");
				return false;
			}else{
				return true;
			}				
		},
		
		/**
		* 입력받은 키워드로 Default 검색
		*
		* param  kwd - 검색어   
		*
		* return	void
		**/	
		dftSchKwd: function( kwd ){
			kwd = $.trim(kwd);
			if(kwd == ""){
				alert("검색어를 입력해주세요.");
				return;
			}else{		
				$("#searchTerm").val(kwd);
				this.headerSearchForm_submit();
			}
		},
		
		/**
		* 입력받은 키워드로 Default 검색
		*
		* param  Object - 검색어   
		*
		* return	void
		**/	
		dftSchKwd2: function( obj ){
			var kwd = obj.getAttribute("data-kwd");
			if(kwd.includes("brandKwd_") == true){
				var lang = kwd.split("_")[1];
				var brandNm = kwd.split("_")[2];
				var choose_lang = lang == "eng" ? "brand_eng_nm" : "brand_kor_nm";
				var enc_brand_nm = encodeURIComponent(brandNm);

				fnsearchresent.callKwdCookie("brandKwd_"+lang+"_"+brandNm);
				location.href="/search/search.action?" + choose_lang + "=" + enc_brand_nm;
			}else{				
				kwd = $.trim(kwd);
				if(kwd == ""){
					alert("검색어를 입력해주세요.");
					return;
				}else{		
					$("#searchTerm").val(kwd);
					this.headerSearchForm_submit();
				}
			}
		},		
		/**
		 * 기본 파라미터 셋팅
		 * 
		 *  return void
		 */
		setParameters : function(search_type){
			var brandNm = "";			//브랜드명
			var brandNo = "";			//브랜드번호
			var vendNm = "";			//지점
			var materialInfo = "";		//소재
			var bnenfitDcf = "";		//무료배송
			var bnenfitSdc = "";		//셋트할인
			var bnenfitGift = "";		//사은품
			var bnenfitOneMore = "";	//하나더
			var bnenfitDiscount = "";	//즉시할인
			var bnenfitWelfare = "";	//복지몰여부
			var bnenfitStaffDC = "";   //직원할인여부
			var sizeInfo =  "";			//사이즈
			var colorInfo = "";			//색상
			var salePriceMin = "";		//최소가격
			var salePriceMax = "";		//최대가격
			var discountMin = "";		//최소할인율
			var discountMax = "";		//최대할인율
			var vend_info = "";			// 지점 정보
			var category_info = "";		// 카테고리 정보
			var deliCostFreeYn = "";   // 무료배송 여부
			var filter_info = "";   	// 다이나믹필터 정보
			var deliInfoQuick = "";     //빠른배송 여부
			var deliInfoLot = "";     //새벽배송(하이퍼) 여부
			var deliInfoStorePick = ""; //스토어픽 여부
			var deliInfoNormal = ""; //일반택배 여부
			var deliInfoFresh = ""; //산지직송 여부
			var ctgCd1 = ""; //카테고리 1Depth
			var ctgCd2 = ""; //카테고리 2Depth
			var ctgr_4depth = ""; 		//세분류 카테고리
			var deliInfoCourier = ""; //택배배송여부
			var deliInfoLowVend = ""; //업체배송여부
			
			if(search_type != "brand"){
				$("input:checkbox[name='brand_nm']").each(function(index,value){
					if(this.checked){
						if(brandNm == ""){
							brandNm = this.value;
						}else if(brandNm != ""){
							brandNm = brandNm+"|"+(this.value);
						}
					}
				});
				$("#hstr_brandNm").val(brandNm);
			}
			
			$("input:checkbox[name='brand_no']").each(function(index,value){
				if(this.checked){
					if(brandNo == ""){
						brandNo = this.value;
					}else if(brandNo != ""){
						brandNo = brandNo+","+(this.value);
					}
				}
				$("#hstr_brandNo").val(brandNo);
			});
			
			
			$("input:checkbox[name='vend_nm']").each(function(index,value){
				if(this.checked){
				  if(vendNm == ""){
					  vendNm = this.value;
					}else if(vendNm != ""){
						vendNm = vendNm+","+(this.value);
				  }
				}
		    });
			
			$("input:checkbox[name='vend_info']").each(function(index,value){
				if(this.checked){
				  if(vend_info == ""){
					  vend_info = this.value;
					}else if(vend_info != ""){
						vend_info = vend_info+","+(this.value);
				  }
				}
		    });
			
			$("input:checkbox[name='bnenfit_info']").each(function(index,value){
				if(this.checked){
				  if(this.value == "dcf"){
					  bnenfitDcf = "Y";
				  }else if(this.value == "sdc"){
					  bnenfitSdc = "Y";
				  }else if(this.value == "gift"){
					  bnenfitGift = "Y";	
				  }else if(this.value == "oneMore"){
					  bnenfitOneMore = "Y";
				  }else if(this.value == "discount"){
					  bnenfitDiscount = "Y";
				  }
				}
		    });
			
			$("input:checkbox[name='deli_type_info']").each(function(index,value){
				if(this.checked){
					if (this.value == "quick_deli") {
						deliInfoQuick = "Y";
					} else if (this.value == "store_pick") {
						deliInfoStorePick = "Y";
					} else if (this.value == "lot_deli") {
						deliInfoLot = "Y";
					}
				}
				//스토어픽,오늘받송 페이지
				if(($("#hstr_storepick_page_yn").val() == "Y" || $("#hstr_quickdeli_page_yn").val() == "Y") && this.disabled){
					if(this.value == "quick_deli"){
						deliInfoQuick = "Y";
					} else if(this.value == "store_pick"){
						deliInfoStorePick = "Y";
					}
				}
			});
			
			//킴스 라디오버튼
			$("input:radio[name='deli_type_info']").each(function(index,value){
				if(this.checked){
					if (this.value == "quick_deli") {
						deliInfoQuick = "Y";
					} else if (this.value == "store_pick") {
						deliInfoStorePick = "Y";
					} else if (this.value == "lot_deli") {
						deliInfoLot = "Y";
					} else if (this.value == "normal_deli") {
						deliInfoNormal = "Y";
					} else if (this.value == "fresh_deli") {
						deliInfoFresh = "Y";
					} else if (this.value == "courier_deli") {
						deliInfoCourier = "Y";
					} else if (this.value == "low_vend_deli") {
						deliInfoLowVend = "Y"
					}
				}
				//스토어픽,오늘받송 페이지
//				if(($("#hstr_storepick_page_yn").val() == "Y" || $("#hstr_quickdeli_page_yn").val() == "Y") && this.disabled){
//					if(this.value == "quick_deli"){
//						deliInfoQuick = "Y";
//					} else if(this.value == "store_pick"){
//						deliInfoStorePick = "Y";
//					}
//				}
			});
			
			$("input:checkbox[name='welfare_bnenfit_info']").each(function(index,value){
				if(this.checked){
				  if(this.value == "welfare"){
					  bnenfitWelfare= "Y";
				  }else if(this.value == "staffDC"){
					  bnenfitStaffDC = "Y";
				  }
				}
		    });
			
			$("input:checkbox[name='size_info']").each(function(index,value){
				if(this.checked){
				  if(sizeInfo == ""){
					  sizeInfo = this.value;
					}else if(sizeInfo != ""){
						sizeInfo = sizeInfo+","+(this.value);
				  }
				}
		    });
			
			$("input:checkbox[name='color_info']").each(function(index,value){
				if(this.checked){
				  if(colorInfo == ""){
					  colorInfo = this.value;
					}else if(colorInfo != ""){
						colorInfo = colorInfo+","+(this.value);
				  }
				}
		    });
			
			$("input:checkbox[name='filter_info']").each(function(index,value){
				if(this.checked){
				  if(filter_info == ""){
					  filter_info = this.value;
					}else if(filter_info != ""){
						filter_info = filter_info+","+(this.value);
				  }
				}
		    });
		    
		    $("input:checkbox[name='ctgr_4depth']").each(function(index,value){
				if(this.checked){
				  if(ctgr_4depth == ""){
					  ctgr_4depth = this.value;
					}else if(ctgr_4depth != ""){
						ctgr_4depth = ctgr_4depth+"|"+(this.value);
				  }
				}
			});
			
			// 킴스클럽은 카테고리 제어를 여기서 함
			if (elandmall.global.disp_mall_no == "0000045") {
				if(search_type != "ctgr") {
					if($("input[name='category_info']:checked").length > 0 ){
						$("input[name='category_info']:checked").each(function(index,value){
							var ctgNo = $(this).val();
							var $cateArea = $(this).parent("li").parent("ul").parent('dd.tg_hgt');
							
							// 대카테고리 선택시
							if ($(this).parent("li").parent("ul").hasClass("lctg_area") === true) {
								// 하위카테고리가 없을시
								if ($("ul.mctg_area." + ctgNo + " li").length <= 0) {
									// 카테고리 번호는 한개만 넘어가야함.
									$("#hstr_ctg_cd").val(ctgNo);
									$("#hstr_ctg_cd2").val("");
								// 하위카테고리가 있을시
								} else {
									// 카테고리 번호는 한개만 넘어가야함.
									$("#hstr_ctg_cd").val(ctgNo);
									$("#hstr_ctg_cd2").val("");
								}
							// 중카테고리 선택시
							} else {
								// 카테고리 번호는 한개만 넘어가야함.
								$("#hstr_ctg_cd").val("");
								$("#hstr_ctg_cd2").val(ctgNo);
							}
					    });
					}else if($("#cate_navi1").text().length > 0){
						var cate_name = $("#cate_navi1").text().split(" > ");
						var ctgNo = $(".lctg_area").find('[data-name="' + cate_name[cate_name.length-1] + '"]').val();
						$("#hstr_ctg_cd").val(ctgNo);
						$("#hstr_ctg_cd2").val("");
					}
					
				}
			}
			/*
			 * 카테고리 인풋은 직접제어함
			 * 
			if(search_type != "ctgr") {
				$("input[name='category_info']:checked").each(function(index,value){
					if(cate_navi1.length <= 0 && cate_navi2.length <= 0){
						ctgCd1 = "";
						ctgCd2 = "";
					} else if(cate_navi1.length > 0 && cate_navi2.length <= 0) {
						ctgCd1 = this.value
					} else {
						ctgCd2 = this.value
					}
			    });
				$("#hstr_ctg_cd").val(ctgCd1);
				$("#hstr_ctg_cd2").val(ctgCd2);
			}
			*/
			
			$("input[name='deliCostFreeYn']:checked").each(function(index,value){
				if(this.checked){
					deliCostFreeYn = 'Y';
				}
		    });
			
			this.srchFilterBox_price();
			
			salePriceMin = $("#min_price").val();
			salePriceMax = $("#max_price").val();
			
			discountMin = $("#min_rate").val();
			discountMax = $("#max_rate").val();

			$("#hstr_vendNm").val(vendNm);
			$("#hstr_deliCostFreeYn").val(bnenfitDcf);
			$("#hstr_setDicountYn").val(bnenfitSdc);
			$("#hstr_giftYn").val(bnenfitGift);
			$("#hstr_oneMoreYn").val(bnenfitOneMore);
			$("#hstr_discountYn").val(bnenfitDiscount);
			$("#hstr_welfareYn").val(bnenfitWelfare);
			$("#hstr_staffDCYn").val(bnenfitStaffDC);
			$("#hstr_size").val(sizeInfo);
			$("#hstr_minPrice").val(salePriceMin);
			$("#hstr_maxPrice").val(salePriceMax);
			$("#hstr_minRate").val(discountMin);
			$("#hstr_maxRate").val(discountMax);
			$("#hstr_color").val(colorInfo);
			$("#hstr_vendInfo").val(vend_info);
			
			/*  일시 : 2020-08-28 
			 ** 내용 : 'deliCostFreeYn'값에 의해 bnenfitDcf값이 있더라도 'hstr_deliCostFreeYn'에 값이 초기화해버리는 문제가 발생하는 문제 확인과
			 **      'deliCostFreeYn' Id를 갖는 input checkBox가 부재한 것을 확인하여 주석처리 실시
			 */
//			$("#hstr_deliCostFreeYn").val(deliCostFreeYn);
			$("#hstr_filter_info").val(filter_info);
			$("#hstr_quick_deli_poss_yn").val(deliInfoQuick);
			$("#hstr_lot_deli_yn").val(deliInfoLot);
			$("#hstr_field_recev_poss_yn").val(deliInfoStorePick);
			//킴스 일반택배,산지직송
			$("#hstr_normal_deli_yn").val(deliInfoNormal);
			$("#hstr_fresh_deli_yn").val(deliInfoFresh);
			//슈펜 세분류 카테고리
			$("#hstr_category_4depth").val(ctgr_4depth);
			$("#hstr_courier_deli_yn").val(deliInfoCourier);
			$("#hstr_low_vend_deli_yn").val(deliInfoLowVend);
		},

		setHashParameters : function(search_type, val, panel_ctg_no){		
			var parameters = "";
			$("#historyForm :input").each(function(index){
				parameters += $(this).attr("name") + "=" + encodeURIComponent($(this).val()) + "&";
			});
			document.location.replace("#hashPage/" + parameters);
		},
		
		setEmallBackParameters : function(parameters){

			var params = parameters.split("&");
			
			var min_price = $("#hstr_minPrice").val();
			var max_price = $("#hstr_maxPrice").val();
			var min_rate = $("#hstr_minRate").val();
			var max_rate = $("#hstr_maxRate").val();
			
			var selected_minPrice = $("#hstr_selected_minPrice").val();
			var selected_maxPrice = $("#hstr_selected_maxPrice").val();
			
			var chk_price = $("#hstr_price_limit").val();
			
			/* 필터 데이터 초기화 */
			// 배송유형
			$("input:checkbox[name='deli_type_info']").each(function(index,value){
				$(this).attr("checked", false);
			});
			
			// 혜택
			$("input:checkbox[name='bnenfit_info']").each(function(index,value){
				$(this).attr("checked", false);
			});
			
			// 지점
			$("input:checkbox[name='vend_info']").each(function(index,value){
				$(this).attr("checked", false);
			});
			
			// 브랜드
			$("input:checkbox[name='brand_nm']").each(function(index,value){
				$(this).attr("checked", false);
			});
			
			// 색상
			$("input:checkbox[name='color_info']").each(function(index,value){
				$(this).attr("checked", false);
			});
			
			// 사이즈
			$("input:checkbox[name='size_info']").each(function(index,value){
				$(this).attr("checked", false);
			});
			
			// 다이나믹
			$("input:checkbox[name='filter_info']").each(function(index,value){
				$(this).attr("checked", false);
			});
			
			// 가격필터 초기화
			if (typeof(priceSlideInit) != "undefined") priceSlideInit();
			
			$("input:radio[name='prc_3']").each(function(index,value){
				$(this).attr("checked", false);
			});
			
			$(".fltrs ul").empty();
			$("#slctd_fltr ul").empty();

			if($('.fltrs ul li').length == 0) {
				$('.fltrs_wrap').removeClass('on');
				$('.slctd_fltr').removeClass('on');
			}
			/* //필터 데이터 초기화 */
			
			/* 필터 데이터 세팅 */
			for(i=0;i<params.length;i++){
				var param = params[i];
				var name = param.split("=")[0];
				var val = param.split("=")[1];
				
				// 정렬
				if(name == "sort") {
					if(val != null && val != ''){
						$(".s_sort option[selected]").removeProp("selected");
						$(".s_sort option[value='"+ val +"']").prop("selected","selected");
					}
				}
				
				// 빠른배송
				if(name == "quick_deli_poss_yn"){
					$("input:checkbox[name='deli_type_info'][value='quick_deli']").each(function(index,value){
						if(val != null && val != ''){
							fnsearch.onSelectFltr($("input:checkbox[name='deli_type_info'][value='quick_deli']"), 'normalFltr'); 
						}
					});
				}
				
				// 스토어픽
				if(name == "field_recev_poss_yn"){
					$("input:checkbox[name='deli_type_info'][value='store_pick']").each(function(index,value){
						if(val != null && val != ''){
							fnsearch.onSelectFltr($("input:checkbox[name='deli_type_info'][value='store_pick']"), 'normalFltr');
						}
					});
				}
				
				// 새벽배송(하이퍼)
				if(name == "lot_deli_yn"){
					$("input:checkbox[name='deli_type_info'][value='lot_deli']").each(function(index,value){
						if(val != null && val != ''){
							fnsearch.onSelectFltr($("input:checkbox[name='deli_type_info'][value='lot_deli']"), 'normalFltr');
						}
					});
				}
				
				// 혜택 - 무료배송
				if(name == "deliCostFreeYn"){
					if(val != null && val != ''){
						fnsearch.onSelectFltr($("input:checkbox[value='dcf']"), 'normalFltr');
					}
				}
				
				//지점
				if(name == "vend_info"){
					$("input:checkbox[name='vend_info']").each(function(index,value){
						var vend_nms = null;
						
						if(val.indexOf('%2C') > -1){
							vend_nms = val.split("%2C");
						}else{
							vend_nms = val.split(",");
						}
						
						if(vend_nms != null && vend_nms.length > 0){
							for(j=0;j<vend_nms.length;j++){
								if(this.value == decodeURI(vend_nms[j])){
									fnsearch.onSelectFltr($("input:checkbox[name='vend_info'][value='" + this.value + "']"), 'normalFltr');
								}
							}
						}
					});
				}
				
				// 브랜드
				if(name == "brand_nm"){
					var brand_nms = null;
					var tab_chk_yn = "N";
					
					if(val.indexOf('%7C') > -1){
						brand_nms = val.split("%7C");
					}else{
						brand_nms = val.split("|");
					}
					
					$("input:checkbox[name='brand_nm']").each(function(index,value){
						if(brand_nms != null && brand_nms.length > 0){
							for(j=0;j<brand_nms.length;j++){
								if(this.value == decodeURIComponent(brand_nms[j]) && $("input:checkbox[value='" + this.value + "']").attr("checked") != "checked"){
									fnsearch.onSelectFltr($("input:checkbox[name='brand_nm'][value='" + this.value + "']"), 'normalFltr');
								}
							}
						}
					});
				}

				// 사이즈
				if(name == "size_info"){
					$("input:checkbox[name='size_info']").each(function(index,value){
						var size_infos = null;
						
						if(val.indexOf('%2C') > -1){
							size_infos = val.split("%2C");
						}else{
							size_infos = val.split(",");
						}
						
						if(size_infos != null && size_infos.length > 0){
							for(j=0;j<size_infos.length;j++){
								if(this.value == decodeURI(size_infos[j])){
									fnsearch.onSelectFltr($("input:checkbox[name='size_info'][value='" + this.value + "']"), 'normalFltr');
								}
							}
						}
					});
				}
				
				// 가격
				if(name == "min_price"){
					if(val != null && val != ''){
						min_price = val;
					}
				}
				
				if(name == "max_price"){
					if(val != null && val != ''){
						max_price = val;
					}
				}
				
				if(name == "selected_min_price"){
					if(val != null && val != ''){
						selected_minPrice = val;
					}else{
						selected_minPrice = "";
					}
				}
				
				if(name == "selected_max_price"){
					if(val != null && val != ''){
						selected_maxPrice = val;
					}else{
						selected_maxPrice = "";
					}
				}
				
				if(name == "price_limit"){
					if(val != null && val != ''){
						chk_price = val;
					}else{
						chk_price = "";
					}
				}
				
				// 색상
				if(name == "color_info"){
					$("input:checkbox[name='color_info']").each(function(index,value){
						var color_infos = null;
						
						if(val.indexOf('%2C') > -1){
							color_infos = val.split("%2C");
						}else{
							color_infos = val.split(",");
						}
						
						if(color_infos != null && color_infos.length > 0){
							for(j=0;j<color_infos.length;j++){
								if(this.value == decodeURI(color_infos[j])){
									fnsearch.onSelectFltr($("input:checkbox[name='color_info'][value='" + this.value + "']"), 'imgFltr', $(this).parent().find('img').attr('src'));
								}
							}
						}
					});
				}
				
				// 다이나믹 필터
				if(name == "filter_info"){
					$("input:checkbox[name='filter_info']").each(function(index,value){
						var filter_info = null;
						
						if(val.indexOf('%2C') > -1){
							filter_info = val.split("%2C");
						}else{
							filter_info = val.split(",");
						}
						if(filter_info != null && filter_info.length > 0){
							for(j=0;j<filter_info.length;j++){
								if(this.value == decodeURI(filter_info[j])){
									fnsearch.onSelectFltr($("input:checkbox[name='filter_info'][value='" + this.value + "']"), 'normalFltr');
								}
							}
						}
					});
				}
				
				// 할인율
				if(name == "min_rate"){
					if(val != null && val != ""){
						min_rate = val;
						$("#min_rate").val(min_rate);						
						$("input:radio[name='fast_discount']").each(function(index,value){
							if($(this).attr('data-min-dis') == min_rate){
								$(this).prop("checked", true);
							}
							
						});
					}
				}
				
				if(name == "max_rate"){
					if(val != null && val != ""){
						max_rate = val;
						$("#max_rate").val(max_rate);
					}
				}
				
				// 보기방식
				if(name == "listType"){
					if(val != null && val != ""){
						if(val == "tlist"){
							$("#set_list1").prop("checked", true);
							$("#set_list2").prop("checked", false);
							$("#set_list3").prop("checked", false);
						}else if(val == "glist"){
							$("#set_list2").prop("checked", true);
							$("#set_list1").prop("checked", false);
							$("#set_list3").prop("checked", false);
						}else if(val == "blist"){
							$("#set_list3").prop("checked", true);
							$("#set_list1").prop("checked", false);
							$("#set_list2").prop("checked", false);
						}
					}else{
						$("#set_list1").prop("checked", false);
						$("#set_list2").prop("checked", false);
						$("#set_list3").prop("checked", false);
					}
				}
			}
			
			// 가격
			if(selected_minPrice != "" && selected_maxPrice != ""){
				$("#min_price").val(min_price);
				$("#max_price").val(max_price);
				
				$("#min_price_span em").html(parseInt(selected_minPrice).toLocaleString());
				$("#max_price_span em").html(parseInt(selected_maxPrice).toLocaleString());

				slideRngChange(selected_minPrice, selected_maxPrice);
				fnsearch.addRangeFltr("fltrPriceRange", selected_minPrice, selected_maxPrice);
				
				$("input:radio[name='prc_3']").each(function(index,value){
					if($(this).attr('data-max-price') == chk_price){
						$(this).attr("checked", true);
					}
				});
			}
			
			if(min_rate != "" || max_rate != ""){
				fnsearch.searchFltrRate("ctgr");				
			}

			/* //필터 데이터 세팅 */
		},
		
		setKimsBackParameters : function(parameters, search_type){

			var params = parameters.split("&");
			
			var min_price = $("#hstr_minPrice").val();
			var max_price = $("#hstr_maxPrice").val();
			
			var selected_minPrice = $("#hstr_selected_minPrice").val();
			var selected_maxPrice = $("#hstr_selected_maxPrice").val();
			
			var chk_price = $("#hstr_price_limit").val();
			
			/* 필터 데이터 초기화 */
			// 배송유형
			$("input:radio[name='deli_type_info']").each(function(index,value){
				$(this).attr("checked", false);
			});
			
			// 혜택
			$("input:checkbox[name='bnenfit_info']").each(function(index,value){
				$(this).attr("checked", false);
			});
			
			// 브랜드
			$("input:checkbox[name='brand_nm']").each(function(index,value){
				$(this).attr("checked", false);
			});

			// 카테고리 초기화
			if (search_type != 'ctgr') fnsearch.resetCate();
			$("input:radio[name='category_info']").each(function(index,value){
				$(this).attr("checked", false);
			});
			
			// 가격필터 초기화
			if (typeof(priceSlideInit) != "undefined") priceSlideInit();
			
			$("input:radio[name='prc_3']").each(function(index,value){
				$(this).attr("checked", false);
			});
			
			$(".fltrs ul").empty();
			$("#slctd_fltr ul").empty();
			$('.filterRst ul').empty();

			if($('.fltrs ul li').length == 0) {
				$('.fltrs_wrap').removeClass('on');
				$('.slctd_fltr').removeClass('on');
				$('.filterRst').hide();
			}
			/* //필터 데이터 초기화 */
			
			/* 필터 데이터 세팅 */
			for(i=0;i<params.length;i++){
				var param = params[i];
				var name = param.split("=")[0];
				var val = param.split("=")[1];
				
				// 정렬
				if(name == "sort") {
					if(val != null && val != ''){
						$("#s_sort option[selected]").removeProp("selected");
						$("#s_sort option[value='"+ val +"']").prop("selected","selected");
					}
				}

				// 일반택배
				if(name == "normal_deli_yn"){
					if(val != null && val != ''){
						fnsearch.onSelectFltr($("input:radio[value='normal_deli']"), 'normalFltr'); 
					}
				}
				// 새벽배송
				if(name == "lot_deli_yn"){
					if(val != null && val != ''){
						fnsearch.onSelectFltr($("input:radio[value='lot_deli']"), 'normalFltr'); 
					}
				}

				// 산지직송
				if(name == "fresh_deli_yn"){
					if(val != null && val != ''){
						fnsearch.onSelectFltr($("input:radio[value='fresh_deli']"), 'normalFltr'); 
					}
				}
				
				// 혜택 - 무료배송
				if(name == "deliCostFreeYn"){
					if(val != null && val != ''){
						fnsearch.onSelectFltr($("input:checkbox[value='dcf']"), 'normalFltr');
					}
				}
				
				// 브랜드
				if(name == "brand_nm"){
					var brand_nms = null;
					
					if(val.indexOf('%7C') > -1){
						brand_nms = val.split("%7C");
					}else{
						brand_nms = val.split("|");
					}
					
					$("input:checkbox[name='brand_nm']").each(function(index,value){
						if(brand_nms != null && brand_nms.length > 0){
							for(j=0;j<brand_nms.length;j++){
								if(this.value == decodeURIComponent(brand_nms[j]) && $("input:checkbox[value='" + this.value + "']").attr("checked") != "checked"){
									fnsearch.onSelectFltr($("input:checkbox[value='" + this.value + "']"), 'normalFltr'); 
								}
							}
						}
					});
				}
				
				// 카테고리
				if(search_type != 'ctgr'){
					if(name == "category_1depth"){
						if(val != null && val != ''){
							fnsearch.kimsCategorySelect($("input:radio[value='" + val + "']"));
						}
					}else if(name == "category_2depth"){
						if(val != null && val != ''){
							fnsearch.kimsCategorySelect($("input:radio[value='" + val + "']"));
						}
					}
				}

				// 최소금액
				if(name == "min_price"){
					if(val != null && val != ''){
						min_price = val;
					}
				}
				
				// 최대금액
				if(name == "max_price"){
					if(val != null && val != ''){
						max_price = val;
					}
				}
				
				if(name == "selected_min_price"){
					if(val != null && val != ''){
						selected_minPrice = val;
					}else{
						selected_minPrice = "";
					}
				}
				
				if(name == "selected_max_price"){
					if(val != null && val != ''){
						selected_maxPrice = val;
					}else{
						selected_maxPrice = "";
					}
				}
				
				if(name == "price_limit"){
					if(val != null && val != ''){
						chk_price = val;
					}else{
						chk_price = "";
					}
				}
				
				// 택배배송
				if(name == "courier_deli_yn"){
					if(val != null && val != ''){
						fnsearch.onSelectFltr($("input:radio[value='courier_deli']"), 'normalFltr'); 
					}
				}
				
				// 업체배송
				if(name == "low_vend_deli_yn"){
					if(val != null && val != ''){
						fnsearch.onSelectFltr($("input:radio[value='low_vend_deli']"), 'normalFltr'); 
					}
				}
			}
			
			// 가격
			if(selected_minPrice != "" && selected_maxPrice != ""){
				$("#min_price").val(min_price);
				$("#max_price").val(max_price);
				
				$("#min_price_span em").html(parseInt(selected_minPrice).toLocaleString());
				$("#max_price_span em").html(parseInt(selected_maxPrice).toLocaleString());

				slideRngChange(selected_minPrice, selected_maxPrice);
				fnsearch.addRangeKimsFltr("fltrPriceRange", selected_minPrice, selected_maxPrice);
				
				$("input:radio[name='prc_3']").each(function(index,value){
					if($(this).attr('data-max-price') == chk_price){
						$(this).attr("checked", true);
					}
				});
			}
			/* //필터 데이터 세팅 */
		},
		
		/**
		 * filter 처리
		 * 
		 * @param (가격 : 
		 * f
		 * @return
		 */
		srchFilterBox_price: function(){
				var hd_min = $("#hd_min").val();
				var hd_max = $("#hd_max").val();

				var min_price = $("#min_price").val();
				var max_price = $("#max_price").val();
				
				if(Number(min_price) > Number(hd_max)) {
					$("#min_price").val(hd_max);
				}
				if(Number(min_price) < Number(hd_min)) {
					$("#min_price").val(hd_min);
				}
				if(Number(max_price) < Number(hd_min)) {
					$("#max_price").val(hd_min);
				}
				if(Number(max_price) > Number(hd_max)) {
					$("#max_price").val(hd_max);
				}
		},
		
		/**
		 * Hash 데이터를 HistoryForm에 넣기
		 *
		 * return void
		 **/
		setHashToHistoryForm : function(){
			var HashLocationName = document.location.hash;
			HashLocationName = HashLocationName.replace("#hashPage","");
			var info = HashLocationName.split("/");
			
			if(info != null && info != ''){
				var parameters = info[1];
				var hash_arr = parameters.split("&");
				
				hash_arr.forEach(function(element){
					if(element != ""){
						var hash_param = element.split("=");
						var name = hash_param[0];
						var val = hash_param[1];
						
						if($("#historyForm input[name='" + name + "']").length > 0){
							if(typeof(val) != "undefined" && val != ""){
								$("#historyForm input[name='" + name + "']").val(decodeURI(val));
							}else{
								$("#historyForm input[name='" + name + "']").val("");
							}
						}
					}
				});				
			}
		},
		
		/**
		*  킴스 상품 검색
		*
		* return	void
		**/	
		srchKimsGoodsList: function(hash_parameters, search_type){
			
			var type = "POST";
			var cache = false;
			
			var url = "/search/search.action";
			
			if(search_type == "ctgr"){
				url = "/dispctg/initDispCtg.action";
			}else if(search_type == "brand"){
				url = "/dispctg/initBrandShop.action";
			}else if(search_type == "store"){
				url = "/dispctg/searchStoreShoppingList.action";
			}else{
				url = "/search/search.action";
				type = "GET";
				cache = true;
			}
			
			var parameters = "";
			
			if(typeof(hash_parameters) != "undefined"){
				parameters = hash_parameters;
			}else{				
				$("#historyForm :input").each(function(index){
					parameters += $(this).attr("name") + "=" + encodeURIComponent($(this).val()) + "&";
				});
			}
			parameters += "list_only_yn=Y";
			$.ajax({ 
				url : url
				, data : parameters
				, type : type 
				, cache : cache
				, async : false
				, dataType : "html"
				, success : function(data) {
					//데이터 임시 저장
					$("#tempGoodsList").html(data);

					var totalCount = $("#tempGoodsList input:hidden[name=total_count]").val();
					totalCount = totalCount == undefined || totalCount == null || totalCount == "" ? 0 :  totalCount;
					var overCount = totalCount >= 99999 ? "+" : "";
					
					if($("#sh_cate_wrap").length > 0 ){
					//페이지 인덱스 설정
					$(".cate_wrap input:hidden[name=total_count]").val(totalCount);
					$(".cate_wrap input:hidden[name=page_index]").val($("#tempGoodsList input:hidden[name=page_index]").val());		

					//하나더 목록 추가
					$(".cate_wrap .goods_list").html($("#tempGoodsList").html());
					}else{
					//페이지 인덱스 설정
					$(".search_wrap input:hidden[name=total_count]").val(totalCount);
					$(".search_wrap input:hidden[name=page_index]").val($("#tempGoodsList input:hidden[name=page_index]").val());
					
						//하나더 목록 추가
						if ($(".ctgGds").length == 0) {
							$(".search_wrap .goods_list_load").html($("#tempGoodsList").html());
						}
						
						if ($(".ctgGds").length > 0) {
							$(".ctgGds input:hidden[name=total_count]").val(totalCount);
							$(".ctgGds input:hidden[name=page_index]").val($("#tempGoodsList input:hidden[name=page_index]").val());
//							if(search_type == "ctgr" || $(".ctgGds .goods_list ul").length > 0){
//								$(".ctgGds .goods_list").html($("#tempGoodsList").html());
//							} else {
//								$(".ctgGds .goods_list ul").html($("#tempGoodsList").html());
//							}
							if ($('.goods_list_load').length > 0) {
								if ($("#tempGoodsList ul").length == 0) {
									// 결과 없을경우
									$(".ctgGds .goods_list ul").html($("#tempGoodsList").html());
								} else {
									$(".ctgGds .goods_list ul").html($("#tempGoodsList ul").html());
								}
							} else {
								$(".ctgGds .goods_list").html($("#tempGoodsList").html());
							}

							$("#totalCount").text(totalCount);							
						}
					}
					// 상품 갯수 변경
					$("div.cts_tit > h2 > em").text(totalCount + overCount + "개 상품");
					$("h3.pop_tit em").text(totalCount + overCount + "개 상품");
					$("div.sch_count em").text(totalCount + overCount + "개 상품");
					$(".top_tit > h2 >").find("span").text(totalCount);
					
					//페이지 인덱스 셋팅 후 임시 데이터 삭제
					$("#tempGoodsList #paging").remove();
					
					
					
					// 더보기 숨김여부 체크
					var p_idx = parseInt($("input:hidden[name=page_index]").val());
				    var r_p_p = parseInt($("input:hidden[name=rows_per_page]").val());
				    var g_total = parseInt($("input:hidden[name=total_count]").val());
				  	//alert("fnInit > p_idx :"+p_idx + "r_p_p :"+r_p_p+ "g_total :"+g_total);
				    if ( (p_idx*r_p_p) >= g_total ) {
				    	$(".goods_list_more").hide();
				    }else{
				    	$(".btn_current_count").text(p_idx*r_p_p);
				    	$(".btn_total_count").text(g_total);
				    }
				    
				    //categoryRedraw();
					// 전체페이지 설정후 임시내용 삭제
				    $("#tempGoodsList").html("");
					elandmall.lazyload();
				} , error : function(xhr, error, code) {
					//alert("조회 중 오류가 발생하였습니다.");
				}
			});
		},
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/**
		*  검색 필터영역 체크박스 클릭시 검색
		*
		* return	void
		**/	
		srchFilterBox: function(search_type, history_back_yn){
			
			// 킴스클럽
			if (elandmall.global.disp_mall_no == "0000045") {
				this.kimsSrchFilterBox(search_type);
				return false;
			}
			
			this.setParameters(search_type);
			var type = "POST";
			var cache = false;
			
			var url = "/search/search.action";
			
			if(search_type == "ctgr"){
				url = "/dispctg/initDispCtg.action";
			}else if(search_type == "brand"){
				url = "/dispctg/initBrandShop.action";
			}else if(search_type == "store"){
				url = "/dispctg/searchStoreShoppingList.action";
			}else{
				url = "/search/search.action";
				type = "GET";
				cache = true;
			}
			
			var parameters = "";
			$("#historyForm :input").each(function(index){
				if($(this).attr("name") == "page_idx" && typeof(history_back_yn) != "undefined" && history_back_yn == "Y"){
					parameters += "page_idx=" + sessionStorage.getItem("back_page_index") + "&";					
				} else{
					parameters += $(this).attr("name") + "=" + encodeURIComponent($(this).val()) + "&";
				}
			});
			
			// 통합몰 대카테고리 페이지인 경우 
			if($(".search_wrap .ctg_gds_list").length > 0){
				var depth = $("#hidden_depth").val();
			 	var lctg_nm = $("#hidden_lctg_nm").val();
			 	var mctg_nm = $("#hidden_mctg_nm").val();
			 	var sctg_nm = $("#hidden_sctg_nm").val();
			 	
				parameters += "lctg_nm=" + lctg_nm + "&mctg_nm=" + mctg_nm + "&sctg_nm=" + sctg_nm + "&ctg_depth=" + depth + "&new_ctg_conts_yn=Y&";
			}
			
			parameters += "list_only_yn=Y";
			$.ajax({ 
				url : url
				, data : parameters
				, type : type 
				, cache : cache
				, dataType : "html"
				, success : function(data) {
					//데이터 임시 저장
					$("#tempGoodsList").html(data);

					var totalCount = $("#tempGoodsList input:hidden[name=total_count]").val();
					totalCount = totalCount == undefined || totalCount == null || totalCount == "" ? 0 :  totalCount;
					var overCount = totalCount >= 99999 ? "+" : "";
					
					if($("#sh_cate_wrap").length > 0 ){
						//페이지 인덱스 설정
						$(".cate_wrap input:hidden[name=total_count]").val(totalCount);
						$(".cate_wrap input:hidden[name=page_index]").val($("#tempGoodsList input:hidden[name=page_index]").val());		
	
						//하나더 목록 추가
						$(".cate_wrap .goods_list").html($("#tempGoodsList").html());
					// 신규 대카테고리 페이지인 경우
					}else if($(".search_wrap .ctg_gds_list").length > 0){
						var panel_ctg_no = $("#ctg_gnb_scr").find("button[aria-selected='true']").attr("data-val");
						
						if($("#tempGoodsList .goods_list").length > 0){
							$("#ctg_main_conts_" + panel_ctg_no + " .sch_none_msg").html("");
							$("#ctg_main_conts_" + panel_ctg_no + " .goods_list").html($("#tempGoodsList #ajax_conts .goods_list").html());
							
							if(typeof(history_back_yn) != "undefined" && history_back_yn == "Y"){
								var back_conts_no = window.sessionStorage.getItem("back_conts_no");
								var top_height = $("#cts_tit_sub").height() + $("#ctg_gnb_scr").height();	// 통합몰 카테고리 top height
								// 스크롤 이동
								if(back_conts_no != null && back_conts_no != undefined && back_conts_no != '' && back_conts_no != 'null' && back_conts_no != 'undefined') {
									if($("#goods_"+back_conts_no).length > 0){
										$("html,body").animate({scrollTop:$("#goods_"+back_conts_no).offset().top - top_height}, 0);										
									}
                                }				
							}
							
						// 결과 없는 경우
						}else{
							$("#ctg_main_conts_" + panel_ctg_no + " .goods_list").html("");
							$("#ctg_main_conts_" + panel_ctg_no + " .sch_none_msg").html($("#tempGoodsList .sch_none_msg").html());
						}
						
						//페이지 인덱스 설정
						$(".search_wrap input:hidden[name=total_count]").val(totalCount);
						$(".search_wrap input:hidden[name=page_index]").val($("#tempGoodsList input:hidden[name=page_index]").val());
						if(typeof(history_back_yn) != "undefined" && history_back_yn == "Y"){
							$(".search_wrap input:hidden[name=prev_page_index]").val($("#tempGoodsList input:hidden[name=page_index]").val());							
						}
					}else{
						//페이지 인덱스 설정
						$(".search_wrap input:hidden[name=total_count]").val(totalCount);
						$(".search_wrap input:hidden[name=page_index]").val($("#tempGoodsList input:hidden[name=page_index]").val());
						
						//하나더 목록 추가
						if ($(".ctgGds").length == 0) {
							$(".search_wrap .goods_list_load").html($("#tempGoodsList").html());
						}
						
						if ($(".ctgGds").length > 0) {
							$(".ctgGds input:hidden[name=total_count]").val(totalCount);
							$(".ctgGds input:hidden[name=page_index]").val($("#tempGoodsList input:hidden[name=page_index]").val());
//							if(search_type == "ctgr" || $(".ctgGds .goods_list ul").length > 0){
//								$(".ctgGds .goods_list").html($("#tempGoodsList").html());
//							} else {
//								$(".ctgGds .goods_list ul").html($("#tempGoodsList").html());
//							}
							if ($('.goods_list_load').length > 0) {
								if ($("#tempGoodsList ul").length == 0) {
									// 결과 없을경우
									$(".ctgGds .goods_list ul").html($("#tempGoodsList").html());
								} else {
									$(".ctgGds .goods_list ul").html($("#tempGoodsList ul").html());
								}
							} else {
								$(".ctgGds .goods_list").html($("#tempGoodsList").html());
							}

							$("#totalCount").text(totalCount);
						}
					}
					// 상품 갯수 변경
					$("div.cts_tit > h2 > em").text(totalCount + overCount + "개 상품");
					$("h3.pop_tit em").text(totalCount + overCount + "개 상품");
					$("div.sch_count em").text(totalCount + overCount + "개 상품");
					$(".top_tit > h2 >").find("span").text(totalCount);
					
					//페이지 인덱스 셋팅 후 임시 데이터 삭제
					$("#tempGoodsList #paging").remove();
					
					
					
					// 더보기 숨김여부 체크
					var p_idx = parseInt($("input:hidden[name=page_index]").val());
				    var r_p_p = parseInt($("input:hidden[name=rows_per_page]").val());
				    var g_total = parseInt($("input:hidden[name=total_count]").val());
				  	//alert("fnInit > p_idx :"+p_idx + "r_p_p :"+r_p_p+ "g_total :"+g_total);
				    if ( (p_idx*r_p_p) >= g_total ) {
				    	$(".goods_list_more").hide();
				    }else{
				    	$(".btn_current_count").text(p_idx*r_p_p);
				    	$(".btn_total_count").text(g_total);
				    }
				    
				    //categoryRedraw();
					// 전체페이지 설정후 임시내용 삭제
				    $("#tempGoodsList").html("");
					elandmall.lazyload();

					if(elandmall.global.disp_mall_no == "0000014" && search_type == "ctgr"){
						fnsearch.setHashParameters();
					}
				} ,	complete : function(){
					if(typeof(history_back_yn) != "undefined" && history_back_yn == "Y"){
						elandmall.history.clear();
					}
				} , error : function(xhr, error, code) {
					//alert("조회 중 오류가 발생하였습니다.");
				}
			});
		},
		
		/**
		 * 킴스 필터영역 체크박스 클릭시
		 *
	     * return	void
		 */
		kimsSrchFilterBox: function(search_type){
			
			this.setParameters(search_type);
			
			var parameters = "";
			$("#historyForm :input").each(function(index){
				parameters += $(this).attr('name') + "=" + encodeURIComponent($(this).val()) + '&';
			});

			document.location.href = '#hashPage1/'+parameters;
		},
		
		/**
		*  슈팬 검색 필터영역 체크박스 클릭시 검색
		*
		* return	void
		**/	
		shoopenSrchFilterBox: function(search_type){
			
			this.setParameters(search_type);
			var type = "POST";
			var cache = false;
			
			var url = "/search/search.action";
			
			if(search_type == "ctgr"){
				url = "/dispctg/initDispCtg.action";
			}else if(search_type == "brand"){
				url = "/dispctg/initBrandShop.action";
			}else{
				url = "/search/search.action";
				type = "GET";
				cache = true;
			}
			
			var parameters = "";
			$("#historyForm :input").each(function(index){
				parameters += $(this).attr('name') + "=" + encodeURIComponent($(this).val()) + '&';
			});
			parameters += "list_only_yn=Y";
			$.ajax({ 
				url : url
				, data : parameters
				, type : type 
				, cache : cache
				, dataType : "html"
				, success : function(data) {
					//데이터 임시 저장
					$("#tempGoodsList").html(data);

					var totalCount = $("#tempGoodsList input:hidden[name=total_count]").val();
					totalCount = totalCount == undefined || totalCount == null || totalCount == "" ? 0 :  totalCount;
					var overCount = totalCount >= 99999 ? "+" : "";
					
					if($("#sh_cate_wrap").length > 0 ){
					//페이지 인덱스 설정
					$(".cate_wrap input:hidden[name=total_count]").val(totalCount);
					$(".cate_wrap input:hidden[name=page_index]").val($("#tempGoodsList input:hidden[name=page_index]").val());		

					//하나더 목록 추가
					$(".cate_wrap .goods_list").html($("#tempGoodsList").html());
					}else{
						//페이지 인덱스 설정
						$(".sch_wrap input:hidden[name=total_count]").val(totalCount);
					
						$(".sch_wrap input:hidden[name=page_index]").val($("#tempGoodsList input:hidden[name=page_index]").val());
					
						//하나더 목록 추가
						$(".sch_wrap .goods_list_load").html($("#tempGoodsList").html());
						// 상품갯수 변경
						$(".totalCount").text(totalCount);						
					}
					// 상품 갯수 변경(필터의 버튼)
					$(".filterTotalCount").text(totalCount);
					
					//페이지 인덱스 셋팅 후 임시 데이터 삭제
					$("#tempGoodsList #paging").remove();
				    
				    // 더보기 숨김여부 체크
					var p_idx = parseInt($("input:hidden[name=page_index]").val());
				    var r_p_p = parseInt($("input:hidden[name=rows_per_page]").val());
				    var g_total = parseInt($("input:hidden[name=total_count]").val());
				  	//alert("fnInit > p_idx :"+p_idx + "r_p_p :"+r_p_p+ "g_total :"+g_total);
				    if ( (p_idx*r_p_p) >= g_total ) {
				    	$(".goods_list_more").hide();
				    }else{
				    	$(".btn_current_count").text(p_idx*r_p_p);
				    	$(".btn_total_count").text(g_total);
				    }
				    
				    //categoryRedraw();
					// 전체페이지 설정후 임시내용 삭제
				    $("#tempGoodsList").html("");
					elandmall.lazyload();
				} , error : function(xhr, error, code) {
					//alert("조회 중 오류가 발생하였습니다.");
				}
			});
		},
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		/**
		* 카테고리 검색
		* param  ctgr_cd - 카테고리 코드
		* return	void
		**/	
		searchCategory: function( ctgr_cd ){
			window.location.href = "/dispctg/initDispCtg.action?disp_ctg_no="+ctgr_cd;
		},
		
		/**
		* 카테고리 검색
		* param  ctgr_cd - 카테고리 코드
		* return	void
		**/	
		searchBrandCategory: function( brand_cd, ctgr_cd ){
			window.location.href = "/dispctg/initBrandShop.action?brand_no="+brand_cd+"&disp_ctg_no="+ ctgr_cd;
		},
		
		/**
		* 통합검색 카테고리 대분류 선택시
		* param  ctgr_cd - 카테고리 코드
		* return	void
		**/	
		searchCategoryList: function( ctgr_cd ){
			this.setParameters();
			
			$('#hstr_ctg_cd').val(ctgr_cd);
			$('#hstr_pageNum').val('1');

			this.srchFilterBox();
		},
		/**
		* 통합검색 카테고리 대분류 선택시
		* param  ctgr_cd - 카테고리 코드
		* return	void
		**/	
		searchBrandCategoryList: function( ctgr_cd ){
			this.setParameters();
			
			$('#hstr_ctg_cd').val(ctgr_cd);
			$('#hstr_pageNum').val('1');

			this.srchFilterBox('brand');
		},
		/**
		* 카테고리 매칭 함수. 
		* 카테고리명을 넘겨주면 코드를, 코드값을 넘겨주면 카테고리 명을 리턴
		* 
		* param  ctgr - 카테고리값 
		* param  type - 타입(0 : 카테고리명, 1 : 카테고리코드 )  
		*
		* return str 			
		**/
		rtnCtgrVal: function( ctgr, type ){
			var rtn_val = "";
			if( type != 0 && type != 1 )
				return rtn_val;
			
			for(var i=0;i<ctgr_cnt;i++){
				if( ctgr_arr[i][type] == ctgr ){
					if( type == 0 ){
						rtn_val = ctgr_arr[i][1];
					}else{
						rtn_val = ctgr_arr[i][0];
					}
				}
			}
			return rtn_val;
		},

		
		/**
		 * 정렬 검색 실행
		 * 
		 * @param val
		 * 
		 * @return
		 */
		 goSearchSort: function( sort_val ){
			this.setParameters();
			
			$('#hstr_pageNum').val('1');
			$("#hstr_sort").val(sort_val);
			// 킴스클럽
			if (elandmall.global.disp_mall_no == "0000045") {
				var parameters = "";
				$("#historyForm :input").each(function(index){
					parameters += $(this).attr('name') + "=" + encodeURIComponent($(this).val()) + '&';
				});
				document.location.href = '#hashPage1/'+parameters;
			} else{
				this.srchFilterBox();
			}
		 },
		 
		 /**
		 * shoopen 정렬 검색 실행
		 * 
		 * @param val
		 * 
		 * @return
		 */
		 goShoopenSearchSort: function( sort_val ){
			this.setParameters();
			
			$('#hstr_pageNum').val('1');
			$("#hstr_sort").val(sort_val);

			this.shoopenSrchFilterBox();
		 },
		 
		 /**
		 * shoopen 정렬 검색 실행
		 * 
		 * @param val
		 * 
		 * @return
		 */
		 goShoopenBrandSearchSort: function( sort_val ){
			this.setParameters();
			
			$('#hstr_pageNum').val('1');
			$("#hstr_sort").val(sort_val);

			this.shoopenSrchFilterBox('brand');
		 },
		 
		 /**
		 * 정렬 검색 실행
		 * 
		 * @param val
		 * 
		 * @return
		 */
		 goShoopenSearchCategorySort: function( sort_val ){
			 //this.setParameters();
			
			$('#hstr_pageNum').val('1');
			$("#hstr_sort").val(sort_val);

			this.shoopenSrchFilterBox('ctgr');
		 },
		 
		 /**
			 * 정렬 검색 실행
			 * 
			 * @param val
			 * 
			 * @return
			 */
			 goSearchStoreSort: function( sort_val ){
				this.setParameters();
				
				$('#hstr_pageNum').val('1');
				$("#hstr_sort").val(sort_val);

				this.srchFilterBox('store');
			 },
		 
		 /**
		 * 정렬 검색 실행
		 * 
		 * @param val
		 * 
		 * @return
		 */
		 goSearchCategorySort: function( sort_val ){
			if (elandmall.global.disp_mall_no == "0000045") {
				this.setParameters();
			}
			$('#hstr_pageNum').val('1');
			$("#hstr_sort").val(sort_val);
			// 킴스클럽
			if (elandmall.global.disp_mall_no == "0000045") {
				var parameters = "";
				$("#historyForm :input").each(function(index){
					parameters += $(this).attr('name') + "=" + encodeURIComponent($(this).val()) + '&';
				});
				document.location.href = '#hashPage1/'+parameters;
			} else{
				this.srchFilterBox('ctgr');
			}
		 },
		 
		 /**
		 * 정렬 검색 실행
		 * 
		 * @param val
		 * 
		 * @return
		 */
		 goSearchBrandSort: function( sort_val ){
			 //this.setParameters();
				
				$('#hstr_pageNum').val('1');
				$("#hstr_sort").val(sort_val);

				this.srchFilterBox('brand');
		 },
				
		 /**
		 * 날짜 검색 실행(radio box)
		 * 
		 * @param date
		 * 
		 * @return
		 */
		 goDate: function( date ){
			$('#hstr_date').val(date);
			$('#hstr_pageNum').val('1');
			$('#historyForm').submit();
		},
		
		/**
		 * 브랜드 필터박스 초기화
		 * 
		 * @return
		 */
		initBrandFilterBox: function(){
			var cnt = 0;
			$("input:checkbox[name='brand_no']").each(function(index,value){
				if(this.checked){
					this.checked = false;
					cnt++;
				}
		    });
			
			var inputMin = $("#min_price").val();
			var inputMax = $("#max_price").val();
			var hdMin = $("#hd_min").val();
			var hdMax = $("#hd_max").val();
			
			if(inputMin != hdMin && inputMax != hdMax){
				$("#min_price").val(hdMin);
				$("#max_price").val(hdMax);
				cnt++;
			}
			
			$("#min_rate").val(0);
			$("#max_rate").val(100);
			
			if(cnt > 0){
				fnsearch.srchFilterBox();
			}
		},
		
		/**
		 * 상세조건 필터박스 초기화
		 * 
		 * @return
		 */
		initDetailFilterBox: function(search_type){
			var cnt = 0;
			if(search_type != "brand"){
				$("input:checkbox[name='brand_nm']").each(function(index,value){
					if(this.checked){
						this.checked = false;
						cnt++;
					}
			    });
			}
			$("input:checkbox[name='vend_nm']").each(function(index,value){
				if(this.checked){
					this.checked = false;
					cnt++;
				}
		    });
			
			$("input:checkbox[name='bnenfit_info']").each(function(index,value){
				if(this.checked){
					this.checked = false;
					cnt++;
				}
		    });
			
			$("input:checkbox[name='welfare_bnenfit_info']").each(function(index,value){
				if(this.checked){
					this.checked = false;
					cnt++;
				}
		    });
			
			$("input:checkbox[name='size_info']").each(function(index,value){
				if(this.checked){
					this.checked = false;
					cnt++;
				}
		    });
			$("input:checkbox[name='color_info']").each(function(index,value){
				if(this.checked){
					this.checked = false;
					cnt++;
				}
		    });
			$("input:radio[name='fast_price']").each(function(index,value){
				if(this.checked){
					this.checked = false;
					cnt++;
				}
		    });
			$("input:radio[name='fast_discount']").each(function(index,value){
				if(this.checked){
					this.checked = false;
					cnt++;
				}
		    });
			
			var inputMin = $("#min_price").val();
			var inputMax = $("#max_price").val();
			var hdMin = $("#hd_min").val();
			var hdMax = $("#hd_max").val();
			
			$("#min_price").val(hdMin);
			$("#max_price").val(hdMax);
			
			$("#min_rate").val(0);
			$("#max_rate").val(100);
			
			if(inputMin != hdMin || inputMax != hdMax){
				cnt++;
			}
			
			if(cnt > 0){
				fnsearch.srchFilterBox(search_type);
			}
		},
		
		getPageRange: function( ctgr_total ){
			var pageNum = 0;
			var pageSize = 0;
			var firstPage = 0;
			var lastPage = 0;
			var pageStr = "";
			
			pageNum = $('#hstr_pageNum').val();
			pageSize = $('#hstr_pageSize').val();
			
			lastPage = parseInt(pageNum) * parseInt(pageSize);
			firstPage = parseInt(lastPage-(parseInt(pageSize)-1));
			
			if(lastPage > ctgr_total)
				lastPage = ctgr_total;
			
			pageStr = firstPage + "-" + lastPage;
			return pageStr;
		},
		
		
		/**
		 * 날짜값이 제대로 되어 있는지 체크한다.
		 * @param startDate
		 * @param endDate
		 */
		 chkValidDate: function( date ){
			var valid = false;
			var year = 0;
			var month = 0;
			var day = 0;
			
			if(date.length == 8){ // YYYYMMDD 형식일 경우
				year = date.substring(0,4);
				month = date.substring(4,6);
				day = date.substring(6,8);
				
				if(year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= 31)
					valid = true;
			}else if(date.length == 10){ // YYYY MM DD 형식일 경우
				year = date.substring(0,4);
				month = date.substring(5,7);
				day = date.substring(8,10);
				
				if(year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= 31)
					valid = true;
			}
			return valid;
		},
		
				
		/**
		 * 연도 필터 결과 가져오기.
		 * 
		 * @param
		 * 
		 * @return string(url)
		 */
	 	AjaxParamGetYear : function(){
			var params = "";
			
			params += "kwd=" + $('#hstr_kwd').val();
			params += "&category=" + ctgr_cd;
			params += "&reSrchFlag=" + $('#hstr_reSrchFlag').val();
			params += "&pageNum=1";
			params += "&pageSize=1000";
			params += "&detailSearch=" + $('#hstr_detailSearch').val();
			params += "&srchFd=" + $('#hstr_srchFd').val();
			params += "&date=" + $('#hstr_date').val();
			params += "&startDate=" + $('#hstr_startDate').val();
			params += "&endDate=" + $('#hstr_endDate').val();
			params += "&fileExt=" + $('#hstr_fileExt').val();
			params += "&year=" + $('#hstr_year').val();
			
			$('#historyForm').children('input[name=\"preKwd\"]').each(function(){
				params += "&preKwd=" + encodeURIComponent($(this).val());
			});
			
			params += "&callLoc=filter";
			
			return params;
		},
		
		/**
		 * 조직 구조 가져오기
		 * 
		 * @param
		 * 
		 * @return string(url)
		 */
		 AjaxParamGetPersonTree : function(){
			var params = "";
			
			params += "kwd=" + encodeURIComponent($('#hstr_kwd').val());
			params += "&category=" + ctgr_cd;
			params += "&reSrchFlag=" + $('#hstr_reSrchFlag').val();
			params += "&pageNum=1";
			params += "&pageSize=1000";
			params += "&detailSearch=" + $('#hstr_detailSearch').val();
			params += "&srchFd=" + $('#hstr_srchFd').val();
			params += "&date=" + $('#hstr_date').val();
			params += "&startDate=" + $('#hstr_startDate').val();
			params += "&endDate=" + $('#hstr_endDate').val();
			
			$('#historyForm').children('input[name=\"preKwd\"]').each(function(){
				params += "&preKwd=" + encodeURIComponent($(this).val());
			});
			
			params += "&callLoc=filter";
			
			return params;
		},
		
		/**
		 * 첨부파일 내용 가져오기
		 * 
		 * @param
		 * 
		 * @return string(url)
		 */
		 AjaxParamGetFileCont : function( rowid ){
			var url = "./ajax/getFileCont.jsp?";
			
			var params = "";
			params += "rowid=" + rowid;
			params += "&kwd=" + encodeURIComponent($('#hstr_kwd').val());
			params += "&callLoc=preview";
			params = url + params;
			
			return params;
		},
			
		/**
		 * 조직 구조 그리기
		 * 
		 * @param
		 * 
		 * @return
		 */
		DrawUtilDrawFilterTree : function( data ){
			var tempArr = null;
			var depth = ["","",""];
			var FilterHtml = "";
			var cnt = 1;
			var short_flag = false;		 // 줄임말 사용여부
			var short_len = 5;			 // 줄임말 사용시 길이
			
			if(data.length > 0){
				FilterHtml += "<li>";
				FilterHtml += "<img src=\"images/ico_plus.gif\" width=\"9\" height=\"9\" class=\"hd_bt active\" alt=\"접기\" />";
				FilterHtml += "<label for=\"org1\">전체</label>";
				FilterHtml += "<ul>";
				
				for(var i=0; i<data.length; i++){
					tempArr = data[i].organization.split("^");
					
					if(short_flag == true && tempArr[1].length > short_len){
						tempArr[1] = tempArr[1].substring(0,short_len) + "...";
					}
					
					if(tempArr.length > 0){
						if(tempArr[0]!=depth[0]){		// 본부가 틀릴 경우
							if(i!=0){
								FilterHtml += "</ul>";
								FilterHtml += "</li>";
							}
							depth[0] = tempArr[0];
							FilterHtml += "<li>";
							FilterHtml += "<img src=\"images/ico_plus.gif\" width=\"9\" height=\"9\" class=\"hd_bt active\" alt=\"접기\" />";
							FilterHtml += "<label class=\"treeData\" for=\"org1-" + i+1 + "\">" + tempArr[0] + "</label>";
							FilterHtml += "<ul>";
							FilterHtml += "<li><label class=\"treeData\" for=\"org1-1-" + cnt +  "\">" + tempArr[1] + " </label></li>";
							
						}else{	// 본부가 같다면...
							FilterHtml += "<li><label class=\"treeData\" for=\"org1-1-" + cnt +  "\">" + tempArr[1] + " </label></li>";
						}
						cnt++;
					}
					
					tempArr = null;
				}
				
				FilterHtml += "</ul>";
				FilterHtml += "</li>";
				
				$('#org_m').html(FilterHtml);
			}
		},
		
		/**
		 * 연도 그리기
		 * 
		 * @param
		 * 
		 * @return
		 */
		 DrawUtilDrawFilterYear : function( data, $this ){
			var FilterHtml = "";
			var cnt = 1;
			
			if(data.length > 0){
				FilterHtml = "<li class=\"first\"><input type=\"checkbox\" id=\"s_year1\" value=\"all\" class=\"all_chk\" /><label for=\"s_year1\">전체</label></li>";
					
				for(var i=0; i<data.length; i++){
					if(data[i].year!=""){
						cnt++;
						FilterHtml += "<li><input type=\"checkbox\" id=\"s_year" + cnt + "\" value=\"" + data[i].year + "\" /><label for=\"s_year" + cnt + "\">"+ data[i].year +"년</label></li>";
					}
				}
				
				$('.s_year').html(FilterHtml);
			}else{
				$this.hide();
			}
		},		

		/**
		 * filter 처리
		 * 
		 * @param (size : 
		 * 
		 * @return
		 */
		 ResizingDrawFilter : function( sizeStatus ){
			var ctgr_cd = $('#var_category').val();
			if(sizeStatus < 2){	// wide 모드가 아닐 경우				
				if(ctgr_cd == 'PERSON' || ctgr_cd == 'NIMAGE'){	// 필터가 보이지 말아야 될 경우					
					$('.filter').hide();
					$('#contents').addClass('pos_ab');					
				}else if(ctgr_cd == 'SITE' || ctgr_cd == 'NNEWS'){ // 필터 더보기를 없애야 될 경우					
					$('.filter .bt_filter').hide();					
				}else if(ctgr_cd == 'DOCUMENT' || ctgr_cd == 'BOARD'){ // 체크 박스를 제거해야 되는 경우					
					$('#yearFilter').hide();
					$('#extFilter').hide();					
				}
			}else{	// wide 모드 일 경우
				if(ctgr_cd == 'PERSON'){
					$('.filter').show();
				}else if(ctgr_cd == 'DOCUMENT'){
					$('#yearFilter').show();
					$('#extFilter').show();
				}else if(ctgr_cd == 'BOARD'){
					$('#yearFilter').show();
				}
			}
		},
		
		/**
		 * filter 클릭시 아이콘화면 출력
		 * 
		 * @param (
		 * 			comp : Html Component(ex: this), 
		 * 			type : 'ctgFltr', 'normalFltr'
		 *		   )
		 * 
		 * @return
		 */
		onSelectFltr : function( comp, type, imgPath ) {
			
			// 카테고리 값 클릭 시 스크롤 값을 0으로 초기화
			scrpos = 0;
			
			var html = '';
			var outerHtml = '';
			var id = $(comp).attr("id");
			var key = $(comp).attr("data-key");
			
			if (type == "ctgFltr") {
				id = "fltrCategory";
				key = "fltrCategory";
			}
			
			var fltrVal = $(comp).val();
			var name = $(comp).data("name");
			var temp = name.toUpperCase();
			var text = this.textLengthOverCut(name, 14);
			
			//킴스
			if (comp.name == "deli_type_info" && $('.kims').length > 0) {
				this.addDeliTypeFltr(comp);
			}
			
			// 체크여부(길이 0 : 체크X)
			if($('.fltrs ul').find('[data-key="' + key + '"]').length == 0) {
				if(type == 'imgFltr') {
					if(temp == 'WHITE' || temp == '화이트' || temp == '흰색'){
						html = '<a href="javascript:;" data-key="' + key +'"><i class="white"><img src="' + imgPath + '" alt="' + name + '"/></i>' + text + '</a>';
						outerHtml = '<button type="button" data-key="' + key +'"><i class="white"><img src="' + imgPath + '" alt="' + name + '"/></i>' + text + '</button>';
					}else{
						html = '<a href="javascript:;" data-key="' + key +'"><i><img src="' + imgPath + '" alt="' + name + '"/></i>' + text + '</a>';
						outerHtml = '<button href="javascript:;" data-key="' + key +'"><i><img src="' + imgPath + '" alt="' + name + '"/></i>' + text + '</button>';
					}
					
				} else {
					if(type == "ctgFltr"){
						html = '<a href="javascript:;" data-key="' + key +'" data-ctgNo="' + fltrVal + '">' + text + '</a>';
						outerHtml = '<button type="button" data-key="' + key +'" data-ctgNo="' + fltrVal + '">' + text + '</button>';
					}else{
						if (comp.name == "deli_type_info") {
							html = '<a href="javascript:;" data-name="deli_type_info" data-key="' + key +'">' + text + '</a>';
							outerHtml = '<button type="button" data-name="deli_type_info" data-key="' + key +'">' + text + '</button>';
						} else {
							html = '<a href="javascript:;" data-key="' + key +'">' + text + '</a>';
							outerHtml = '<button type="button" data-key="' + key +'">' + text + '</button>';
						}
					}
				}
				
				$('.fltrs ul').append('<li>' + html + '</li>');
				if($(".search_wrap .ctg_gds_list").length > 0){
					$('.slctd_fltr ul').append('<li>' + html + '</li>');
				}else{
					$('.slctd_fltr ul').append('<li class="swiper-slide">' + html + '</li>');
				}
				
				$('.filterRst ul').append('<li>' + outerHtml + '</li>');
									
				if( $('.fltrs ul li').length == 1) {
					$('.fltrs_wrap').addClass('on');
					$('.slctd_fltr').addClass('on');
					$('.filterRst').show();
				}
				
				$("input[data-key='" + key + "']").attr("checked", true);
			}else {
				var targetTag = $('.fltrs ul').find('[data-key="' + key + '"]');
				targetTag.parent().remove();
				targetTag = $('.slctd_fltr ul').find('[data-key="' + key + '"]');
				targetTag.parent().remove();
				
				if ($('.filterRst').length > 0) {
					targetTag = $('.filterRst ul').find('[data-key="' + key + '"]');
					targetTag.parent().remove();
				}
				
				if($('.fltrs ul li').length == 0) {
					$('.fltrs_wrap').removeClass('on');
					$('.slctd_fltr').removeClass('on');
					$('.filterRst').hide();
				} else {
					$('.filterRst').show();
				}
				
				if($('#' + id).attr('type') == 'radio') {
					$('#' + id).attr('checked', false);
				}
				
				if(type == "ctgFltr") {
					if ($(comp).parent("li").parent("ul").hasClass("lctg_area") === true) {
						text = name;
					}else{
						text = cate_navi1 != "" ? cate_navi1 + ">" + name : name;
					}
					html = '<a href="javascript:;" data-key="' + key +'" data-ctgNo="' + fltrVal + '">' + this.textLengthOverCut(text, 16) + '</a>';
					//html = '<a href="javascript:;" data-key="' + key +'">' + name + '</a>';
					outerHtml = '<button type="button" data-key="' + key +'" data-ctgNo="' + fltrVal + '">' + this.textLengthOverCut(text, 16) + '</button>';
					
					$('.fltrs ul').append('<li>' + html + '</li>');
					if($(".search_wrap .ctg_gds_list").length > 0){
						$('.slctd_fltr ul').append('<li>' + html + '</li>');
					}else{
						$('.slctd_fltr ul').append('<li class="swiper-slide">' + html + '</li>');
					}
					$('.filterRst ul').append('<li>' + outerHtml + '</li>');
											
					if( $('.fltrs ul li').length == 1) {
						$('.fltrs_wrap').addClass('on');
						$('.slctd_fltr').addClass('on');
						$('.filterRst').show();
					}
				}
				
				$("input[data-key='" + key + "']").attr("checked", false);
			}
			
			sendGaTag();
			
			if($(".search_wrap .ctg_gds_list").length == 0){
				if(typeof(fltrSlide.reInit) == "function"){
					fltrSlide.reInit();
				}else if(typeof(fltrSlide.update) == "function"){
					fltrSlide.update();
				}
			}
		},
		
		/**
		 * Shoopen filter 클릭시 아이콘화면 출력
		 * 
		 * @param (
		 * 			comp : Html Component(ex: this), 
		 * 			type : 'ctgFltr', 'normalFltr'
		 *		   )
		 * 
		 * @return
		 */
		onShoopenSelectFltr : function( comp, type, imgPath ) {
			
			// 카테고리 값 클릭 시 스크롤 값을 0으로 초기화
			scrpos = 0;
			
			var html = '';
			var id = $(comp).attr("id");
			var key = $(comp).attr("data-key");
			
			if (type == "ctgFltr") {
				id = "fltrCategory";
				key = "fltrCategory";
			}
			
			var fltrVal = $(comp).val();
			var name = $(comp).data("name");
			var temp = name.toUpperCase();
			var text = this.textLengthOverCut(name, 14);
			
			// 체크여부(길이 0 : 체크X)
			if($('.slctd_fltr ul').find('[data-key="' + key + '"]').length == 0) {
				if(type == 'imgFltr') {
					if(temp == 'WHITE' || temp == '화이트' || temp == '흰색'){
						html = '<a href="javascript:;" name="colorIcon" data-key="' + key +'"><i class="white"><img src="' + imgPath + '" alt="' + name + '"/></i>' + text + '</a>';
					}else{
						html = '<a href="javascript:;" name="colorIcon" data-key="' + key +'"><i><img src="' + imgPath + '" alt="' + name + '"/></i>' + text + '</a>';
					}
					
				} else {
					if(type == "ctgFltr"){
						html = '<a href="javascript:;" data-key="' + key +'" data-ctgNo="' + fltrVal + '">' + text + '</a>';
					}else if(type == "sctgFltr"){ //세분류 카테고리
						html = '<a href="javascript:;" name="sctgIcon" data-key="' + key +'">' + text + '</a>';
					}else{
						html = '<a href="javascript:;" name="sizeIcon" data-key="' + key +'">' + text + '</a>';
					}
				}
				
				$('.slctd_fltr ul').append('<li class="swiper-slide">' + html + '</li>');
									
				if( $('.slctd_fltr ul li').length == 1) {
					$('.fltrs_wrap').addClass('on');
					$('.slctd_fltr').addClass('on');
				}
				
				$("input[data-key='" + key + "']").attr("checked", true);
			}else {
				var targetTag = $('.slctd_fltr ul').find('[data-key="' + key + '"]');
				targetTag.parent().remove();
				
				if($('.slctd_fltr ul li').length == 0) {
					$('.fltrs_wrap').removeClass('on');
					$('.slctd_fltr').removeClass('on');
				}
				
				if(type == "ctgFltr") {
					if ($(comp).parent("li").parent("ul").hasClass("lctg_area") === true) {
						text = name;
					}else{
						text = cate_navi1 != "" ? cate_navi1 + ">" + name : name;
					}
					html = '<a href="javascript:;" data-key="' + key +'" data-ctgNo="' + fltrVal + '">' + this.textLengthOverCut(text, 16) + '</a>';
					//html = '<a href="javascript:;" data-key="' + key +'">' + name + '</a>';
					
					$('.slctd_fltr ul').append('<li class="swiper-slide">' + html + '</li>');
											
					if( $('.slctd_fltr ul li').length == 1) {
						$('.fltrs_wrap').addClass('on');
						$('.slctd_fltr').addClass('on');
					}
				}
				
				$("input[data-key='" + key + "']").attr("checked", false);
			}
			
			sendGaTag();
			
			if(typeof(cateSlide.reInit) == "function"){
				cateSlide.reInit();	
			}else if(typeof(cateSlide.update) == "function"){
				cateSlide.update();
			}
		},
		
		// 넘어가는 글자수 자르기
		textLengthOverCut : function (txt, len, lastTxt) {
	        if (len == "" || len == null) { // 기본값
	            len = 20;
	        }
	        if (lastTxt == "" || lastTxt == null) { // 기본값
	            lastTxt = "...";
	        }
	        if (txt.length > len) {
	            txt = txt.substr(0, len) + lastTxt;
	        }
	        return txt;
	    },
		
		categorySelect : function( comp ) {
			var ctgNo = $(comp).val();
			var $cateArea = $(comp).parent("li").parent("ul").parent('dd.tg_hgt');

			// 대카테고리 선택시
			if ($(comp).parent("li").parent("ul").hasClass("lctg_area") === true) {
				
				// 하위카테고리가 없을시
				if ($("ul.mctg_area." + ctgNo + " li").length <= 0) {
				
					// 카테고리 번호는 한개만 넘어가야함.
					$("#hstr_ctg_cd").val(ctgNo);
					$("#hstr_ctg_cd2").val("");
					
					// 네비게이션 설정
					cate_navi1 = $(comp).parent("li").find("span").text();
					$("#cate_navi1").text(" > " + cate_navi1);
					
				} else {
				// 하위카테고리가 있을시
					this.resetCate();
					
					// 카테고리 번호는 한개만 넘어가야함.
					$("#hstr_ctg_cd").val(ctgNo);
					$("#hstr_ctg_cd2").val("");
					
					// 네비게이션 설정
					cate_navi1 = $(comp).parent("li").find("span").text();
					$("#cate_navi1").text(" > " + cate_navi1);
					
					// 대카테고리 가리고 해당 중카테고리 보이기
					$("ul.lctg_area, .mctg_area").hide();
					$("ul.mctg_area." + ctgNo).show();
					
					
					// 하위카테고리를 열었을때 강제로 전체보기활성
					$cateArea.addClass('open');
					$cateArea.find(".tg_btns").hide();
					
				}
				

			} else {
			// 중카테고리 선택시
				cate_navi2 = $(comp).parent("li").find("span").text();
				
				// 카테고리 번호는 한개만 넘어가야함.
				$("#hstr_ctg_cd").val("");
				$("#hstr_ctg_cd2").val(ctgNo);
			}
		},
		
		kimsCategorySelect : function( comp ) {
			var ctgNo = $(comp).val();
			var $cateArea = $(comp).parent("li").parent("ul").parent('dd.tg_hgt');
			
		    // 대카테고리 선택시
		    if ($(comp).parent("li").parent("ul").hasClass("lctg_area") === true) {		
		        // 하위카테고리가 없을시
		        if ($("ul.mctg_area." + ctgNo + " li").length <= 0) {
		            // 네비게이션 설정
		            cate_navi1 = $(comp).parent("li").find("span").text();
		            $("#cate_navi1").text(" > " + cate_navi1);

					if($(".lctg_area li").find("input:radio[value='" + ctgNo + "']").length != 0){
						$("input:radio[value='" + ctgNo + "']").prop("checked", true);								
					}
		        // 하위카테고리가 있을시
		        } else {
		            // 네비게이션 설정
		            cate_navi1 = $(comp).parent("li").find("span").text();
		            $("#cate_navi1").text(" > " + cate_navi1);
		            
		            // 대카테고리 가리고 해당 중카테고리 보이기
		            $("ul.lctg_area, .mctg_area").hide();
		            $("ul.mctg_area." + ctgNo).show();
		            
		            // 하위카테고리를 열었을때 강제로 전체보기 활성
		            $cateArea.addClass('open');
		            $cateArea.find(".tg_btns").hide();
		        }
				fnsearch.onSelectFltr($("input:radio[value='" + ctgNo + "']"), 'ctgFltr');				
		    // 중카테고리 선택시
		    } else {
				/*대카테고리 설정*/
				// 네비게이션 설정
				var lctgNo = $(comp).closest("ul").attr("data-ctg-no");
				var lctg = $("#ctg_" + lctgNo);
	            cate_navi1 = lctg.parent("li").find("span").text();

	            $("#cate_navi1").text(" > " + cate_navi1);
				$("#cate_navi1").attr("data-catg-no",lctgNo);
	            
	            // 대카테고리 가리고 해당 중카테고리 보이기
	            $("ul.lctg_area, .mctg_area").hide();
	            $("ul.mctg_area." + lctgNo).show();
	            
	            // 하위카테고리를 열었을때 강제로 전체보기 활성
	            $cateArea.addClass('open');
	            $cateArea.find(".tg_btns").hide();
				/*//대카테고리 설정*/
				
				/*중카테고리 설정*/
		        cate_navi2 = $(comp).parent("li").find("span").text();
				$("input:radio[value='" + ctgNo + "']").prop("checked", true);
				/*//중카테고리 설정*/
				
				fnsearch.onSelectFltr($("input:radio[value='" + lctgNo + "']"), 'ctgFltr');
				fnsearch.onSelectFltr($("input:radio[value='" + ctgNo + "']"), 'ctgFltr');
		    }
		},
		
		// 카테고리 관련 사항 초기화
		resetCate : function() {
			cate_navi1 = "";
			cate_navi2 = "";
			
			$(".mctg_area").hide();
			$(".lctg_area").show();
			
			$("#hstr_ctg_cd").val("");
			$("#hstr_ctg_cd2").val("");
			
			$(".lctg_area").parent(".tg_hgt").removeClass("open");
			$(".lctg_area").nextAll(".tg_btns").show();
			
			$("#cate_navi1").text("");
//			$("input[name='category_info'").prop("checked", false);
			
			var category_info_size = document.getElementsByName('category_info').length;
			for(var i = 0; i < category_info_size; i++){
				document.getElementsByName('category_info')[i].checked = false;
		    }
		},
		
		schAllCtg : function() {
			$(".slctdFltrDiv ul li a[data-key='fltrCategory']").trigger('click');
		},
		
		ceilNum : function( num, numOfPosition) {
			return Math.ceil( num / numOfPosition ) * numOfPosition;
		},
		
		// 보기방식 변경
		setListView : function(view_type) {
			viewType = view_type == "" || view_type == undefined || view_type == null ? viewType : view_type;
			if (viewType != "") {
				if($("#ctg_gnb_scr").length > 0){
					var panelCtgNo = $("#ctg_gnb_scr").find("button[aria-selected='true']").attr("data-val");
					var $gdLst = $("#ctg_main_conts_" + panelCtgNo + " .goods_list");
					$gdLst.find("ul").attr("class","");
					$gdLst.find("ul").addClass(viewType);
					if (viewType == "tlist") {
						$gdLst.attr('class','goods_list vtc');
					} else if (viewType == "glist") {
						$gdLst.attr('class','goods_list');
					} else if (viewType == "blist") {
						$gdLst.attr('class','goods_list n1');
					}
				}else{
					$("#goods_list > ul").attr("class","");
					$("#goods_list > ul").addClass(viewType);				
					if ($(".ctgGds").length > 0) {
						if (viewType == "tlist") {
							var $ctgGds = $('.ctgGds');
							var $gdLst = $ctgGds.find('.goods_list');
							$gdLst.attr('class','goods_list vtc');
						} else if (viewType == "glist") {
							var $ctgGds = $('.ctgGds');
							var $gdLst = $ctgGds.find('.goods_list');
							$gdLst.attr('class','goods_list');
						} else if (viewType == "blist") {
							var $ctgGds = $('.ctgGds');
							var $gdLst = $ctgGds.find('.goods_list');
							$gdLst.attr('class','goods_list n1');
						}
					}
				}
			}
		},
		
		// 처음로딩시 자주사용하는 필터중 가장 첫번째 오픈
		openFavoritFilter : function() {
			for (var i = 1; i < 4; i++) {
				if ($('.filters_tab a[data-filter-tab=' + i + ']').length > 0) {
					$('.filters_tab a[data-filter-tab=' + i + ']').trigger('click');
					break;
				}
			}
		},
		
		// 가격, 할인율 필터추가
		addRangeFltr : function(key, minValue, maxValue) {
			var targetTag = $('.fltrs ul').find('[data-key="' + key + '"]');
			targetTag.parent().remove();
			targetTag = $('.slctd_fltr ul').find('[data-key="' + key + '"]');
			targetTag.parent().remove();
			
			var html = "";
			
			if(key == "fltrPriceRange") {
				var localMinPrice = minValue;
				var localMaxPrice = maxValue;
				html = '<a href="javascript:;" data-key="' + key + '">' + localMinPrice.toLocaleString() + '원 ~ ' + localMaxPrice.toLocaleString() + '원</a>';
			}else if(key == "fltrRateRange") {
				html = '<a href="javascript:;" data-key="' + key + '">' + minValue + '% ~ ' + maxValue + '%</a>';
			}
			
			$('.fltrs ul').append('<li>' + html + '</li>');
			$('.slctd_fltr ul').append('<li class="swiper-slide">' + html + '</li>');
			
			if(!$('.fltrs_wrap').hasClass("on")) {
				$('.fltrs_wrap').addClass('on');
				$('.slctd_fltr').addClass('on');
			}
		},
		// 킴스 배송유형 radio
		addDeliTypeFltr : function(key) {
			var targetTag = $('.fltrs ul').find('[data-name="deli_type_info"]');
			targetTag.parent().remove();
			targetTag = $('.filterRst ul').find('[data-name="deli_type_info"]');
			targetTag.parent().remove();
		},
		//킴스 보기방식
		addGdLstTypeFltr : function(comp){
			var key = $(comp).attr("data-key");
			$("input:radio[data-type='"+ key +"']").prop("checked", true); 
		},
		// kims 가격, 할인율 필터추가
		addRangeKimsFltr : function(key, minValue, maxValue) {
			var targetTag = $('.fltrs ul').find('[data-key="' + key + '"]');
			targetTag.parent().remove();
			targetTag = $('.slctd_fltr ul').find('[data-key="' + key + '"]');
			targetTag.parent().remove();
			targetTag = $('.filterRst ul').find('[data-key="' + key + '"]');
			targetTag.parent().remove();
			
			var html = "";
			var outerHtml = "";
			
			if(key == "fltrPriceRange") {
				var localMinPrice = minValue;
				var localMaxPrice = maxValue;
				html = '<a href="javascript:;" data-key="' + key + '">' + localMinPrice.toLocaleString() + '원 ~ ' + localMaxPrice.toLocaleString() + '원</a>';
				outerHtml = '<button type="button" data-key="' + key + '">' + localMinPrice.toLocaleString() + '원 ~ ' + localMaxPrice.toLocaleString() + '원<em class="ir">삭제</em></button>';
			}else if(key == "fltrRateRange") {
				html = '<a href="javascript:;" data-key="' + key + '">' + minValue + '% ~ ' + maxValue + '%</a>';
			}
			
			$('.fltrs ul').append('<li>' + html + '</li>');
			$('.slctd_fltr ul').append('<li class="swiper-slide">' + html + '</li>');
			$('.filterRst ul').append('<li>' + outerHtml + '</li>');
			
			if(!$('.filterRst').is(':visible')) {
				$('.filterRst').show();
			}
			
			if(!$('.fltrs_wrap').hasClass("on")) {
				$('.fltrs_wrap').addClass('on');
				$('.slctd_fltr').addClass('on');
			}
		},
		
		// 가격, 할인율 필터추가
		addRangeShoopenFltr : function(key, minValue, maxValue) {
			var targetTag = $('.slctd_fltr ul').find('[data-key="' + key + '"]');
			targetTag.parent().remove();
			
			var html = "";
			
			if(key == "fltrPriceRange") {
				var localMinPrice = minValue;
				var localMaxPrice = maxValue;
				html = '<a href="javascript:;" data-key="' + key + '">' + localMinPrice.toLocaleString() + '원 ~ ' + localMaxPrice.toLocaleString() + '원</a>';
			}else if(key == "fltrRateRange") {
				html = '<a href="javascript:;" data-key="' + key + '">' + minValue + '% ~ ' + maxValue + '%</a>';
			}
			
			$('.slctd_fltr ul').append('<li class="swiper-slide">' + html + '</li>');
			
			if(!$('.fltrs_wrap').hasClass("on")) {
				$('.fltrs_wrap').addClass('on');
				$('.slctd_fltr').addClass('on');
			}
		},
		
		// 할인율필터 제어
		searchFltrRate : function(search_type) {
			if ($("#min_rate").val() && $("#max_rate").val()) {
				this.addRangeFltr("fltrRateRange", $("#min_rate").val(), $("#max_rate").val());
			}
			if($(".search_wrap .ctg_gds_list").length == 0){
				if(typeof(fltrSlide.reInit) == "function"){
					fltrSlide.reInit();
				}else if(typeof(fltrSlide.update) == "function"){
					fltrSlide.update();
				}
			}
			this.srchFilterBox(search_type);
		},
		// 할인율필터 제어
		searchKimsFltrRate : function(search_type) {
			if ($("#min_rate").val() && $("#max_rate").val()) {
				this.addRangeFltr("fltrRateRange", $("#min_rate").val(), $("#max_rate").val());
			}
			if(typeof(fltrSlide.reInit) == "function"){
				fltrSlide.reInit();	
			}else if(typeof(fltrSlide.update) == "function"){
				fltrSlide.update();
			}			
			this.srchFilterBox(search_type);
		},
		
		// 할인율 적용버튼 클릭시
		applyFltrRate : function(search_type) {
			if (!$("#min_rate").val() || !$("#max_rate").val()) {
				alert("할인율을 입력해주세요.");
				return false;
			}
			
			if (Number($("#min_rate").val()) > Number($("#max_rate").val())) {
				alert("최소 할인율이 최대 할인율보다 높습니다.");
				return false;
			}
			
			if ($("#min_rate").val() > 100 || $("#max_rate").val() > 100) {
				alert("1~99까지의 숫자를 입력해주세요.");
				return false;
			}
			
			$("input:radio[name='fast_discount']").prop("checked", false);
			this.searchFltrRate(search_type);
		}
	}
})(jQuery);