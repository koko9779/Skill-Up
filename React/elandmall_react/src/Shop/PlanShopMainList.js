import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

const PlanShopMainList = ({params}) => {
    let [planShopList, setPlanShopList] = useState(null);

    useEffect(() => {
        axios.get("https://dev-m.elandmall.com/api/shop/initPlanShopGoodsMainJson.action", {params : params})
        .then(response => {
            setPlanShopList(response.data);
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [params]);

    if (planShopList === null) return;

    if (planShopList.data.plan_list.length > 0) {
        return (
            <>
                {
                    planShopList.data.plan_list.map((plan, index) => (
                        <div className="scont_plan" id={'scontPlan_' + plan.move_cont_no} key={index}>
                            <div className="big_thumb">
                                <a href="#javascript">
                                    <img src={plan.image_url} alt={plan.rel_cont_nm}/>
                                </a>
                            </div>
                            <Swiper wrapperTag='ul' setWrapperSize='max-content' slidesPerView='2.5' className='swiper-container'
                                    onInit={(e) => e.wrapperEl.classList.add('list_small_thumb')}>
                                {
                                    plan.goods_list !== undefined &&
                                    plan.goods_list.map((goods, goodsIndex) => (
                                        <SwiperSlide tag='li' key={goodsIndex}>
                                            <a className='g_link' href='#javascript' onClick={() => (console.log(goods.goods_nm))}>
                                                <span className='g_img'>
                                                    <img className='lazyload' src={goods.image_url} style={{display:'inline'}} alt={goods.goods_nm} width='200' height='200'/>
                                                </span>
                                                <span className='g_tit'>{goods.goods_nm}</span>
                                                <span className='g_nor'>
                                                    <span className='sale'>
                                                        <em className='ir'>판매가:</em>
                                                        <b>{goods.cust_sale_price}</b>
                                                        원
                                                    </span>
                                                </span>
                                            </a>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    ))
                }
            </>
        )
    } else {
        return (
            <div className="no_plan">
                <span className="no_info">기획전을 <b>준비중</b>입니다.</span>
            </div>
        );
    }
}

export default PlanShopMainList;