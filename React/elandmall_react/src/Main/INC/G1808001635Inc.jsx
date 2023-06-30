import React, {useState} from "react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/less';
import 'swiper/less/navigation';

/*
    내 용 : 2018_MO메인_프로모션배너
*/
function G1808001635Inc(props){
    let [curHomeMainBanner, setCurHomeMainBanner] = useState(0);

    let home_mainbanner_list = props.home_mainbanner_list;
    const homeMainBannerCnt = home_mainbanner_list.length;

    const onSlideChange = (e) => {
        const index = e.activeIndex % homeMainBannerCnt;

        if (index === 0) {
            return homeMainBannerCnt;
        }

        return index;
    }

    return (
        <>
            {/* TOP_BN */}
            <div className="main_bn_wrap new ready" id="main_bn_wrap">
				<Swiper wrapperTag="ul" className="main_bn swiper-container" id="main_bn" setWrapperSize="max-content" loop="true"
                    modules={[Navigation, Autoplay]} navigation={false} slidesPerView={1} autoplay={{delay:3000}} simulateTouch="true" updateOnWindowResize="true"
                    onInit={(e) => {setCurHomeMainBanner(e.activeIndex)}}
                    onSlideChange={(e) => {setCurHomeMainBanner(onSlideChange(e))}}> 
                    {home_mainbanner_list.map((menu,idx) => (
                    <SwiperSlide tag="li" key={idx}>
                        <a href="{() => false}" data-ga-tag={menu.ga_category + "||" + menu.ga_action + "||" + menu.ga_label}>
                            <img src={menu.image_url} alt={menu.rel_cont_nm} />
                        </a>
                    </SwiperSlide>
                    ))}
                </Swiper>
                <div className="main_bn_option">
				    <div className="pg_num"><b>{curHomeMainBanner}</b>/<em>{homeMainBannerCnt}</em></div>
				    <a href="{() => false}" className="bt_opa_lyr_new"><b className="ir">배너 전체 보기</b></a>
			    </div>
		    </div>
            
            {/* EVENT ALL LAYER */}
            <div id="layer_main_bn" className="layer_opacity">
			<h3 className="pop_tit">이벤트 전체</h3>
			<div className="pop_con">
				<div className="main_bn_lyr">
					<ul>
						<li>
                            <a href="{() => false}" data-ga-tag="MW_메인||메인플래시||dev테스트배너_01">
                                <img src="//dev.elandrs.com/upload/dspl/banner/90/371/00/210600000013371.jpg" width="640" height="417" alt="dev테스트배너_01"/>
                            </a>
                        </li>				 
					</ul>
				</div>
			</div>
			<a href="{() => false}" className="btn_close"><span className="ir">팝업 닫기</span></a>
		</div>
        </>
    )
}

export default G1808001635Inc;