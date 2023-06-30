import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
//import Iframe from "react-iframe";

/*
    내 용 : 2018_MO메인_쇼핑VJ
*/

function G1808001638Inc(props){
    let home_shoppingvj = props.home_shoppingvj;
    let goods_list = home_shoppingvj[0].goods_list;
    const vdoRef = useRef(null);

    const playYoutube = () => {
        console.log(vdoRef.current);
        //vdoRef.current.playVideo();
    }

    const pauseYoutube = () => {
        console.log(vdoRef.current);
        //vdoRef.current.pause();
    }

    return(
        <div className="main_v_commerce">
            <div className="mtitle">
                <h3>홈-숏핑</h3>
                <span className="stit">지금 가장 핫 한 이상품</span>
            </div>
            <Swiper id="main_v_commerce" className="cont_comerce" wrapperTag="ul" setWrapperSize="max-content">
                {/* style={{width: '390px'}} */}
                {goods_list.map((goods,idx) => (
                <SwiperSlide tag="li" style={{width: '390px'}} key={idx}>
                    <div className="g_wrap">
                        <div className="g_vdo">
                            <img src="//dev.elandrs.com/20220527154422/images/mobile/renewal/bg_video_size.png" alt=""/>
                            <div className="set_vdo">
                                <button onClick={playYoutube} className="btn_vdo_play" type="button" data-ga-tag={"MW_메인||홈숏핑_영상||" + goods.goods_nm }><span className="ir">Play</span></button>
                                <button onClick={pauseYoutube} className="btn_vdo_pause" type="button"><span className="ir">Pause</span></button>
                                <iframe id="vdo_iframe1" ref={vdoRef}
                                        frameBorder="0" 
                                        allowFullScreen="1" 
                                        allow="autoplay; encrypted-media" 
                                        title="YouTube video player" 
                                        width="100%" 
                                        height="100%" 
                                        src="https://www.youtube.com/embed/2S24-y0Ij3Y?controls=0&amp;playsinline=1&amp;showinfo=0&amp;modestbranding=0&amp;rel=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fdev-m.elandmall.com&amp;widgetid=1">
                                </iframe>
                            </div>
                        </div>
                        <a href="{()=>false}" data-ga-tag={"MW_메인||홈숏핑_상품||" + goods.goods_nm} className="g_link">
                            <span className="g_tit"><b>{goods.brand_nm}</b>{goods.goods_nm}</span>
                            <span className="g_nor">
                                <span className="g_prc">
                                    <span className="sale"><em className="ir">판매가:</em><b>2,290</b>원</span>
                                    <span className="org"><em className="ir">정상가:</em><b>{goods.market_price}</b>원</span>
                                </span>
                            </span>
                            <span className="g_pinfo2"><em>무료 배송</em></span>
                            <span className="g_bnf">
                                <span>
                                    <span className="selp">{goods.sale_qty}</span>개 구매
                                </span>
                            </span>
                        </a>
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
};

export default G1808001638Inc;