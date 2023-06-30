import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/less';
import {Link} from 'react-router-dom';

function MainTop(props){
    let header_icon_list = props.header_icon_list;

    return (
        <>
            <div className="main_top" id="main_top" style={{top: '52px'}}>
            <div className="gnb_wrap" id="gnb_wrap">
                <Swiper wrapperTag="ul" className="gnb scroller swiper-free-mode" id="gnb"
                    modules={[FreeMode]} freeMode={true} slidesPerView="auto" roundLengths="true" setWrapperSize="max-content">                   
                    {header_icon_list.map((menu,idx) => (
                        <SwiperSlide tag="li" key={menu.menu_lank}
                            data-url={menu.link_url} data-ga_ctg_nm={menu.ga_label} data-ga-tag={menu.ga_category+"||"+menu.ga_action+"||"+menu.ga_label}>
                            <Link to={'/main/initMain.action?gnb_idx=' + idx}>
                                <span style={{ color : menu.color_code !== "" ? menu.color_code : "" }}>
                                    {menu.menu_nm}
                                    { menu.menu_subtitle !== "" && <q>{menu.menu_subtitle}</q>}
                                </span>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    </>
    )
};

export default MainTop;