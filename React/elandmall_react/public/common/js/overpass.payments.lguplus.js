;(function ($) {
    var lguplus_van_cd = "90";
    var _pay = null;
    var ord_pay = null;
    var form;
    var CST_PLATFORM = '';
    var LGD_WINDOW_TYPE = '';
    var PAY_MEAN_CD_VBANK = "13";
    var paymeans = {
        "11": "SC0010",	//신용카드
        "12": "SC0030",	//계좌이체
        "13": "SC0040",	//무통장
        "14": "SC0060"	//휴대폰
    };

    ORDER.payments.lguplus = {
        call: function(pay) {
            _pay = pay;

            var data = {
                pay_amt: pay.pay_amt, //금액
                disp_goods_nm: pay.disp_goods_nm, //상품명
                app_cd: elandmall.global.app_cd, // retAppScheme scheme값을 위한 현재 기종판별 값
                app_mall: elandmall.global.app_mall // retAppScheme scheme값을 위한 현재 전시몰별 값
            };

            ord_pay = ORDER.pay.ord_pays[pay.pay_seq];
            
            var pay_seq = pay.pay_seq;
			$.extend(ORDER.pay.ord_pays[pay_seq], {
				_payments_: {
					orderer_nm: pay.orderer_nm,
					email: pay.email,
					disp_goods_nm: pay.disp_goods_nm,
					cell_no1: pay.cell_no1,
					cell_no2: pay.cell_no2,
					cell_no3: pay.cell_no3,
					isbn_use_yn : pay.isbn_use_yn,
					lgd_buyerphone : pay.cell_no
				}
			});

            if (pay.pay_mean_cd == PAY_MEAN_CD_VBANK) {	//가상계좌(모듈 없음)
				var bank = pay.bank;
				$.extend(ORDER.pay.ord_pays[pay_seq]["_payments_"], {
					bank_cd: bank.bank_cd,
					expiry_date: bank.expiry_date,
					expiry_dtime: bank.expiry_dtime,
					morc_nm: bank.morc_nm,
					appr_van_cd : lguplus_van_cd,
					isbn_use_yn : pay.isbn_use_yn
				});
			}
			ORDER.payments.getMers({
                pay_mean_cd: pay.pay_mean_cd,
                van_cd: lguplus_van_cd,
                app_cd: elandmall.global.app_cd, // retAppScheme scheme값을 위한 현재 기종판별 값
                app_mall: elandmall.global.app_mall, // retAppScheme scheme값을 위한 현재 기종판별 값
                ticket : pay.ticket,
                isbn_use_yn : pay.isbn_use_yn,
                pay_amt: pay.pay_amt,
                callback: function(mers) {
                    ORDER.payments.lguplus.requestCert({
                        pay: pay,
                        mers: mers
                    });
                }
            });
        },
        requestCert: function(p) {
            var mobile = elandmall.global.chnl_cd == 30 || elandmall.global.chnl_cd == 40;
            if ( elandmall.global.apptype == "" &&
                 (elandmall.global.chnl_cd == 30 || elandmall.global.chnl_cd == 40) ) {
            	mobile = false;
            }
            var pay = p.pay;
            var mers = p.mers;
            var mers_no = mers.mers_no;
            var pay_amt = pay.pay_amt; // LGD_AMOUNT
            var pay_mean_cd = pay.pay_mean_cd;
            var bank = pay.bank;
            var pay_no = mers.pay_no; // LGD_OID
            var ord_pay = ORDER.pay.ord_pays[pay.pay_seq];
            var form_id = "_LGUPLUS_FORM_";
            var LGD_SELF_CUSTOM = pay_mean_cd == "11" ? "Y" : "N";
            LGD_WINDOW_TYPE = mobile === true ? "submit" : "iframe" ; //PCWEB은 iframe, 모바일의 경우 submit으로 페이지이동
            var LGD_OSTYPE_CHECK = mobile === true ? "M" : "P" ; //PC용 또는 모바일용 결제모듈 체크
            var LGD_CUSTOM_SWITCHINGTYPE = mobile === true ? "SUBMIT" : "IFRAME" ;
            var LGD_HASHDATA = mers.LGD_HASHDATA;
            CST_PLATFORM = mers.LGD_PLATFORM;
            var LGD_TIMESTAMP = mers.LGD_TIMESTAMP;
            var LGD_PRODUCTINFO = pay.disp_goods_nm;
            var LGD_BUYEREMAIL = pay.email;
            var LGD_BUYER = pay.orderer_nm;
            var LGD_CARDTYPE = pay.cardcomp != undefined ? pay.cardcomp.lgd_card_code : "";
            var LGD_RET_APP_SCHEME = mers.retAppScheme;
            
            var code = mers.code; // LGD_RESPCODE
            var msg = mers.msg; // LGD_RESPMSG
            var pg_id = mers.pg_id; // LGD_TID 
            
//            if (pay_mean_cd == PAY_MEAN_CD_VBANK) {
//        		var LGD_CASHRECEIPTUSE = "0";
//        		var LGD_CASHCARDNUM = "";
//        		var chkReceipt = document.getElementsByName('cash_receipt_radio');
//        		for(var i = 0 ; i < chkReceipt.length ; i ++) {
//        			if(chkReceipt[i].checked == true) {
//        				var value = chkReceipt[i].value; 
//        			}
//        		}
//        		if(value == "10") {
//        			LGD_CASHRECEIPTUSE = "1";
//     			} else if (value == "20"){
//      			LGD_CASHRECEIPTUSE = "2";
//       		}
//	        	(function() {	//현금 영수증
//						var cash_div = $("#cash_receipt_div");	//현금영수증 영역
//						if (cash_div.is(":visible")) {
//							cash_div.find(":input[name='cash_receipt_radio']:checked").each(function() {
//								cash_receipt_use_divi_cd = this.value;
//								if (cash_receipt_use_divi_cd == "10") {	//개인소득공제
//									if (cash_div.find("[name='cash_receipt_use_divi_select']").val() == "30") {	//휴대폰번호
//										cash_receipt_issue_cd = "30";
//										LGD_CASHCARDNUM = cash_div.find("[name='cash_receipt_cell_no1']").val() + cash_div.find("[name='cash_receipt_cell_no2']").val() + cash_div.find("[name='cash_receipt_cell_no3']").val();
//									} else {	//현금영수증 카드번호
//										cash_receipt_issue_cd = "50";
//										LGD_CASHCARDNUM = cash_div.find("[name='cash_receipt_card_no1']").val() + cash_div.find("[name='cash_receipt_card_no2']").val() + cash_div.find("[name='cash_receipt_card_no3']").val() + cash_div.find("[name='cash_receipt_card_no4']").val()
//									};
//								} else if (cash_receipt_use_divi_cd == "20") {		//지출 증빙용(사업자 등록 번호)
//									cash_receipt_issue_cd = "20";
//								}
//							});
//						};
//					})();
//            }

            ord_pay.pay_no = pay_no;

            ORDER.payments.lguplus.submit = undefined;
            delete ORDER.payments.lguplus.submit;

            $("#" + form_id).remove();
            form = ORDER.payments.createForm({
                id: form_id,
                name: form_id,
                method: "post"
            });

            form.addInput({ name: "CST_PLATFORM", value: CST_PLATFORM });
            form.addInput({ name: "CST_MID", value: mers_no });
            form.addInput({ name: "LGD_WINDOW_TYPE", value: LGD_WINDOW_TYPE });
            form.addInput({ name: "LGD_MID", value: mers_no });
            form.addInput({ name: "LGD_OID", value: pay_no });
            form.addInput({ name: "LGD_BUYER", value: LGD_BUYER });
            form.addInput({ name: "LGD_PRODUCTINFO", value: LGD_PRODUCTINFO });
            form.addInput({ name: "LGD_AMOUNT", value: pay_amt });
            form.addInput({ name: "LGD_BUYEREMAIL", value: LGD_BUYEREMAIL });
            form.addInput({ name: "LGD_CUSTOM_SKIN", value: "red" });
            form.addInput({ name: "LGD_CUSTOM_PROCESSTYPE", value: "TWOTR" });
            form.addInput({ name: "LGD_TIMESTAMP", value: LGD_TIMESTAMP });

            /** 중요 */
            form.addInput({ name: "LGD_HASHDATA", value: LGD_HASHDATA });
            /** 중요 */

            //카드사 코드 매핑
            var van_cardcomp_no = '';
            var select_credit_card = $('#select_credit_card').val() || $('#view_card_cd').val();
            $.each(ORDER.cardvan.vanCardcompList, function(key, object){
                if(object.cardcomp_no === select_credit_card) {
                    van_cardcomp_no = object.van_cardcomp_no;
                    return false;
                }
            });
            
            //은행 코드 매핑
            var van_bank_no = '';
            var select_vbank = $('#select_vbank').val();
            $.each(ORDER.cardvan.vanBankcompList, function(key, object){
                if(object.van_bankcomp_no === select_vbank) {
                    van_bank_no = object.bankcomp_no;
                    return false;
                }
            });

            form.addInput({ name: "LGD_CUSTOM_USABLEPAY", value: paymeans[pay_mean_cd] });
            form.addInput({ name: "LGD_CUSTOM_SWITCHINGTYPE", value: LGD_CUSTOM_SWITCHINGTYPE });
            form.addInput({ name: "LGD_WINDOW_VER", value: "2.5" });
            form.addInput({ name: "LGD_OSTYPE_CHECK", value: LGD_OSTYPE_CHECK });
            form.addInput({ name: "LGD_VERSION", value: "JSP_Non-ActiveX_Standard" });
            form.addInput({ name: "LGD_DOMAIN_URL", value: "xpayvvip" });
            form.addInput({ name: "LGD_PAYKEY", value: "" });
            form.addInput({ name: "LGD_RESPCODE", value: "" });
            form.addInput({ name: "LGD_RESPMSG", value: "" });
            form.addInput({ name: "LGD_ENCODING", value: "UTF-8" });
            form.addInput({ name: "LGD_ENCODING_RETURNURL", value: "UTF-8" });

            // form.addInput({ name: "LGD_SELF_CUSTOM", value: LGD_SELF_CUSTOM });
            // form.addInput({ name: "LGD_CARDTYPE", value: LGD_CARDTYPE });
            // form.addInput({ name: "LGD_NOINT", value: "0" });
            // form.addInput({ name: "LGD_POINTUSE", value: "N" });
            // form.addInput({ name: "LGD_INSTALL", value: "00" });
            // form.addInput({ name: "LGD_SP_CHAIN_CODE", value: "0" });
            // form.addInput({ name: "LGD_CURRENCY", value: "410" });
            // form.addInput({ name: "LGD_SP_ORDER_USER_ID", value: "" });

            if (pay_mean_cd == "13") { // 무통장입금
                form.addInput({ name: "LGD_CLOSEDATE", value: bank.expiry_date + "235959", });

				form.addInput({ name: "LGD_USABLEBANK", value: van_bank_no });// 무통장입금 노출 제어
                // 가상계좌(무통장) 결제 연동을 하시는 경우 아래 LGD_CASNOTEURL 을 설정하여 주시기 바랍니다.
                form.addInput({ name: "LGD_CASNOTEURL", value: mers.site_url + "/lguplus/requestToken.action" });
            } else if (pay_mean_cd == "12") { // 실시간 계좌이체
                form.addInput({ name: "LGD_CASHRECEIPTYN", value: 'N' });
                form.addInput({ name: "LGD_USABLEBANK", value: '' });
                form.addInput({ name: "LGD_ACTIVEXYN", value: 'N' });
                form.addInput({ name: "LGD_CLOSEDATE", value: "", });
            } else if (pay_mean_cd == "11") { // 신용카드
                form.addInput({ name: "LGD_USABLECARD", value: van_cardcomp_no });// 신용카드 노출 제어

                var installment = $('#select_credit_card_installment').val();
                if(installment == null || installment == '') {
                    installment = '0';
                }
                form.addInput({ name: "LGD_INSTALLRANGE", value: installment });
                form.addInput({ name: "LGD_CLOSEDATE", value: "", });
                // 예시
                // form.addInput({ name: "LGD_INSTALLRANGE", value: '0:1:2:3:4:5:6:7:8:9:10:11:12' });
            } else {
                form.addInput({ name: "LGD_CLOSEDATE", value: "", });
            }
            
            if (pay_mean_cd == PAY_MEAN_CD_VBANK) {
				//무통장입금
            	ord_pay._payments_.LGD_OID = pay_no;
            	ord_pay._payments_.LGD_RESPCODE = code;
            	ord_pay._payments_.LGD_RESPMSG = msg;
            	ord_pay._payments_.LGD_TID = pg_id;
            	ord_pay._payments_.LGD_MID = mers_no;
            	ord_pay._payments_.pay_amt = pay_amt;
            	ord_pay._payments_.LGD_HASHDATA = LGD_HASHDATA;
            	ord_pay._payments_.LGD_PAYDATE = bank.expiry_date + "235959";
            	ord_pay._payments_.LGD_FINANCECODE = van_bank_no;
            	ord_pay._payments_.lgd_method = "ASSIGN"; //ASSIGN:할당, CHANGE:변경
            	ord_pay._payments_.LGD_AMOUNT = pay_amt; //금액("," 를 제외한 금액을 입력하세요)
				ord_pay._payments_.LGD_BANKCODE = van_bank_no; //입금계좌은행코드
				ord_pay._payments_.LGD_BUYER = LGD_BUYER; //구매자명
				ord_pay._payments_.LGD_BUYERPHONE = pay.cell_no; //구매자휴대폰번호	
				ord_pay._payments_.LGD_BUYEREMAIL = LGD_BUYEREMAIL; //구매자이메일(옵션)
				ord_pay._payments_.LGD_ACCOUNTOWNER = bank.morc_nm; //입금자명
				ord_pay._payments_.LGD_ACCOUNTPID = ""; //구매자 개인식별변호 (6자리~13자리)(옵션)
				ord_pay._payments_.LGD_CLOSEDATE = bank.expiry_date + "235959"; //입금 마감일
				ord_pay._payments_.LGD_CASHRECEIPTYN = "N"; //현금영수증 사용여부
				
				ord_pay._payments_.LGD_CASHCARDNUM = ""; //현금영수증 카드번호 / 휴대폰번호
				ord_pay._payments_.LGD_CASHRECEIPTUSE = "0"; //현금영수증 발행구분('1':소득공제, '2':지출증빙)
				ord_pay._payments_.LGD_TAXFREEAMOUNT = ""; //면세금액
				//ord_pay._payments_.lgd_casnoteurl = "https://dev-api.elandmall.com/lguplus/requestToken.action"; //입금결과 처리를 위한 상점페이지
				ord_pay._payments_.lgd_casnoteurl = mers.site_url + "/lguplus/requestToken.action"; //입금결과 처리를 위한 상점페이지
				ord_pay._payments_.LGD_ENCODING_NOTEURL = "UTF-8";
				
            	//가상계좌발급
				ord_pay._payments_.CST_PLATFORM = CST_PLATFORM; //토스페이먼츠 결제서비스 선택(test:테스트, service:서비스)
				ord_pay._payments_.CST_MID = mers_no; //토스페이먼츠으로 부터 발급받으신 상점아이디를 입력하세요.
				ord_pay._payments_.disp_goods_nm = pay.disp_goods_nm;
				ord_pay._payments_.LGD_TIMESTAMP = LGD_TIMESTAMP;
			}

            if (mobile === true) {	//모바일의 경우 아래값 추가 셋팅
                // ISP 앱에서 인증/인증 취소 진행 시, 동작 방식을 설정 합니다
                // A: ISP 처리(안드로이드), N: ISP 동기 결제처리(iOS Web-to-Web)
                var lgd_kvpmispautoappyn = '';
                var lgd_kvpmispautoiosappyn = '';
                if(elandmall.global.app_cd == "Android" || elandmall.global.apptype == "ANDROID") {
                    lgd_kvpmispautoappyn = 'A';
                    lgd_kvpmispautoiosappyn = 'A';
                } else if(elandmall.global.app_cd == "iOS" || elandmall.global.apptype == "IOS") {
                    lgd_kvpmispautoappyn = 'N';
                    lgd_kvpmispautoiosappyn = 'A';
                }
                if(elandmall.global.apptype == "IOS") {
                    lgd_kvpmispautoiosappyn = 'N';
                }
                console.log('lguplus app cd :: ', lgd_kvpmispautoappyn);
                console.log('lguplus realacct app cd :: ', lgd_kvpmispautoiosappyn);
                form.addInput({ name: "LGD_KVPMISPAUTOAPPYN", value: lgd_kvpmispautoappyn });
                form.addInput({ name: "LGD_MTRANSFERAUTOAPPYN", value: lgd_kvpmispautoappyn });

                // ISP 승인완료 화면처리 URL (ISP 인증 신용카드,실시간계좌이체 사용시 필수)
                form.addInput({ name: "LGD_KVPMISPWAPURL", value: '' });
                form.addInput({ name: "LGD_MTRANSFERWAPURL ", value: '' });

                // ISP 결제취소 결과화면 URL (ISP 인증 신용카드,실시간계좌이체 사용시 필수)
                form.addInput({ name: "LGD_KVPMISPCANCELURL", value: '' });
                form.addInput({ name: "LGD_MTRANSFERCANCELURL", value: '' });
                
                if (pay_mean_cd == "12") {
                	if (elandmall.global.app_cd == "iOS") {
                		form.addInput({ name: "LGD_MONEPAYAPPYN", value: 'Y' });
                		form.addInput({ name: "LGD_MONEPAY_RETURNURL", value: LGD_RET_APP_SCHEME });
                	}
                }

                /*
                    롯데앱카드 결제 이후 고객사 앱 호출 스키마 설정
                    IOS 환경의 고객사 APP에서 결제시 필수
                    iOS의 경우 결제 이후 고객사 앱으로 자동리턴이 되지 않으므로 이 파라미터를 적용
                */
				if(pay_mean_cd != PAY_MEAN_CD_VBANK) {
					ord_pay["_payments_"] = $.extend({}, { appr_van_cd: lguplus_van_cd, mers_no: mers_no, LGD_CLOSEDATE: form.form.LGD_CLOSEDATE.value, lguplus: true });
				}
                ORDER.payments.payNext(pay.next);

                //"LGD_MTRANSFERAUTOAPPYN": app_cd == "20" ? "N" : "A",		//계좌이체 앱에서 인증/인증취소 진행 시, 동작 방식을 설정 합니다
                //"LGD_MTRANSFERWAPURL": scheme,			//계좌이체 승인 완료 후 사용자에게 보여 지는 승인 완료 URL
                //"LGD_MTRANSFERCANCELURL": scheme		//계좌이체 시 앱에서 취소 시 사용자에게 보여 지는 취소 URL
            } else {
                form.addInput({ name: "LGD_RETURNURL", value: location.protocol + "//" + location.host + "/order/ReturnLGUPlus.action" });
                form.appendBody();
                if(pay_mean_cd == PAY_MEAN_CD_VBANK) {
                	ORDER.payments.payNext(pay.next);
                } else {
                	openXpay(form.form, CST_PLATFORM, LGD_WINDOW_TYPE);
                }
            }
        },
        open: function(returnUrl) {
            if(returnUrl === '') {
                returnUrl = location.protocol + "//" + location.host + "/order/registOrder.action";
            }

            form.addInput({ name: "LGD_MPILOTTEAPPCARDWAPURL", value: returnUrl });
            form.addInput({ name: "LGD_RETURNURL", value: returnUrl });
            form.appendBody();
            open_paymentwindow(form.form, CST_PLATFORM, LGD_WINDOW_TYPE);
        },
        returnCallback : function(data){
            $.extend(_pay, data);

            if (data.resultCode == "0000") {
                ord_pay["_payments_"] = {
                    appr_van_cd		: lguplus_van_cd,
                    orderer_nm   	: _pay.orderer_nm,
                    email			: _pay.email,
                    disp_goods_nm	: _pay.disp_goods_nm,
                    lgd_paykey 		: _pay.paykey,
                    lgd_respcode 	: data.resultCode,
                    lgd_respmsg 	: data.returnMsg,
                    pay_no		    : ord_pay.pay_no,
                    isbn_use_yn: _pay.isbn_use_yn
                };

                ORDER.payments.payNext(_pay.next);
            } else{
                var returnMsg = data.returnMsg === '' ? '결제가 취소되었습니다.': data.returnMsg;
                ORDER.payments.throwError(returnMsg);
            }

            closeIframe();
        }
    };
})(jQuery);