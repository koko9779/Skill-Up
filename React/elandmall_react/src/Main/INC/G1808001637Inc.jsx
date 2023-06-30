import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

/*
    내 용 : 2018_MO 메인 브랜드/카테고리
*/

function G1808001637Inc(props) {
    let home_brand_list = props.home_brand_list;

    return (
        <Swiper id="mainListBrand" className="main_br_cl swiper-free-mode" wrapperTag="ul" simulateTouch="true" updateOnWindowResize="true">
            {/* wrapperClass="swiper-wrapper evt_sp" style={{paddingLeft:"0px", paddingRight:"0px", width: "623px"}} */}
            {home_brand_list.map((menu,idx) => (
            <SwiperSlide tag="li" key={idx}>
                <a href={menu.link_url}>
                    <span>
                        <img src={menu.image_url} alt={menu.rel_cont_nm} />
                    </span>
                    <em>{menu.rel_cont_nm}</em>
                </a>
            </SwiperSlide>
            ))}
		</Swiper>
    )
}

export default G1808001637Inc;