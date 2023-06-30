import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/less";
import G1808001635Inc from "./INC/G1808001635Inc";
import G1808001636Inc from "./INC/G1808001636Inc";
import G1808001638Inc from "./INC/G1808001638Inc";
import G1808001640Inc from "./INC/G1808001640Inc";
import G2106003204Inc from "./INC/G2106003204Inc";
import G1808001637Inc from "./INC/G1808001637Inc";
import G2010002664Inc from "./INC/G2010002664Inc";
import PlanShopMain from "../Shop/PlanShopMain";
import { useLocation } from "react-router-dom";
import Counter from "../Counter";

function Contents(props){
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    let mainContent = props.mainContent;
    let gnb_idx = params.get("gnb_idx");

    const [swiper, setSwiper] = useState();

	useEffect(()=>{
    	// 새로고침 시 swiper의 값은 default value인 null이므로 if 사용
        if (swiper && gnb_idx) {
            swiper.slideTo(gnb_idx, 0, false);
        }
    },[swiper, gnb_idx])

    return (
        <div className="m_cts" id="m_cts">
            <Swiper wrapperTag="ul" setWrapperSize="max-content" onSwiper={setSwiper}>
                <SwiperSlide tag="li">
                    <div className="slide_cont" data-index="0">
                        <G1808001635Inc home_mainbanner_list={mainContent.home_mainbanner_list}/>
                        <G1808001636Inc home_subbanner_list={mainContent.home_subbanner_list}/>
                        <G2106003204Inc home_categoryIcon_list={mainContent.home_categoryIcon_list}/>
                        <G1808001640Inc home_banner_top={mainContent.home_banner_top}/>
                        <G1808001638Inc home_shoppingvj={mainContent.home_shoppingvj}/>
                        <G1808001637Inc home_brand_list={mainContent.home_brand_list}/>
                        <G2010002664Inc home_imgbanner={mainContent.home_imgbanner}/>
                    </div>
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <div style={{paddingBottom:'400px'}}>럭키딜</div>
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <div style={{paddingBottom:'400px'}}>베스트</div>
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <div style={{paddingBottom:'400px'}}>E키즈샵</div>
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <div style={{paddingBottom:'400px'}}>리빙샵</div>
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <div style={{paddingBottom:'400px'}}>KIMS장보기</div>
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <div style={{paddingBottom:'400px'}}>오프라이스</div>
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <div style={{paddingBottom:'400px'}}>스토어쇼핑</div>
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <div style={{paddingBottom:'400px'}}>365아울렛</div>
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <PlanShopMain/> 
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <div style={{paddingBottom:'400px'}}>글로벌샵</div>
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <div style={{paddingBottom:'400px'}}>이벤트</div>
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <div style={{paddingBottom:'400px'}}>기획전상세</div>
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <div style={{paddingBottom:'400px'}}>스토어쇼핑</div>
                </SwiperSlide>
                <SwiperSlide tag="li">
                    <div style={{paddingBottom:'400px'}}>NC LIVE</div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Contents;