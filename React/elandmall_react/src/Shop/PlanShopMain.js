import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import PlanShopMainList from './PlanShopMainList';

const PlanShopMain = () => {
    let [ctgList, setCtgList] = useState(null);
    let [params, setParams] = useState(null);

    const md_re_bn = useRef();

    const getCtgListApi = () => {
        axios.get("https://dev-m.elandmall.com/api/shop/initPlanShopGoodsMainJson.action")
        .then(response => {
            setCtgList(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getCtgListApi();
    }, [])

    if (ctgList === null) return;

    const activeSwiper =  (e) => {
        console.log("test");
        console.log("testttt"+md_re_bn.removeClass());
        
    }

    return (
        <div className="slide_cont" data-index="0">
            <div className="search_wrap">
		        <div className="box_plan"> 
                    <Swiper wrapperTag="ul" className="md_re_bn swiper-container" ref={md_re_bn} setWrapperSize="max-content" slidesPerView='5.6'
                            onTap={(e) => e.clickedSlide.classList.add("on")}
                            modules={{FreeMode}} freeMode={true} >
                        <SwiperSlide tag="li" className="all_view" disp-ctg_no="">
                            <a href='#javascript' onClick={(e) => {activeSwiper(e); setParams(null)}}>
                                <span>전체보기</span>
                            </a>
                        </SwiperSlide>
                        {ctgList.data.ctg_list.map((ctg, index) => (
                            <SwiperSlide tag="li" disp-ctg-no={ctg.disp_ctg_no} key={index}>
                                <a href="#javascript" onClick={(e) => {activeSwiper(e); setParams({list_only_yn : 'Y', disp_ctg_no : ctg.disp_ctg_no})}}>
                                    <img src={ctg.img_path} alt={ctg.disp_ctg_nm}/>
                                    <span>{ctg.disp_ctg_nm}</span>
                                </a>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* 기획전 리스트 영역 */}
                    <div className="main_4thumb_plan2">
                        <PlanShopMainList params={params}/>
                    </div>
                </div>    
            </div>
        </div>
    );
}

export default PlanShopMain;