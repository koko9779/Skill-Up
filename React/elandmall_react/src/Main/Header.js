import React, { useRef } from 'react';

function Header(props){
    let top_banner = props.top_banner;
    let search_ad = props.search_ad;
    const header_bn = useRef();

    const fnShowLeftMenu =() => {
        window.location.href="/leftMenu";
    }

    const fnCloseHeaderBn = (e) => {
        e.preventDefault();
        header_bn.current.remove("header_bn");
        document.getElementsByTagName("body")[0].classList.remove("head_bn");
    }

    return (
        <>
            <div className="header_bn ready" id="header_bn" ref={header_bn} style={{top: '100px'}}>
                <a  href="{() => false}"
                    data-ga-tag={top_banner.ga_category + "||" + top_banner.ga_action + "||" + top_banner.ga_label}>
                    <img
                    src={top_banner.image_url}
                    width="640"
                    height="100"
                    alt={top_banner.ga_label}/>
                </a>
                <a href="#" className="cls" onClick={fnCloseHeaderBn}><img src="/images/mobile/common/btn_bn_close.png" width="25" height="25" alt="닫기" /></a>
            </div>
            <header className="header" id="header" style={{top: '0px'}}>
                <div className="head">
                    <div className="ctg">
                        <button
                            type="button"
                            id="left_open"
                            className="left_open"
                            data-ga-tag="MW_공통||상단메뉴||카테고리"
                            onClick={fnShowLeftMenu}>
                            <b className="ir">카테고리 전체메뉴 열기</b>
                        </button>
                    </div>
                    <h1>
                        <a
                            href="{() => false}"
                            data-ga-tag="MW_공통||상단메뉴||이랜드몰">
                            <b className="ir">ELANDMALL 메인</b>
                        </a>
                    </h1>

                    <div className="hnb">
                        <ul>
                            <li className="sch">
                                <button
                                    type="button"
                                    id="searchStrData"
                                    className="txt_btn"
                                    data-ga-tag={search_ad.ga_category + "||" + search_ad.ga_action + "||" + search_ad.ga_label}>
                                    <b id="searchStrView">{search_ad.searchAd}</b>
                                </button>
                                <button
                                    type="button"
                                    id="searchDirect"
                                    className="sch_btn">
                                    <em className="ir">검색결과로 이동</em>
                                </button>
                            </li>
                            <li className="cart">
                                <a
                                    href="{() => false}"
                                    data-ga-tag="MW_공통||상단메뉴||장바구니">
                                    <em>1<b className="ir">장바구니 이동</b>
                                    </em>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
};

export default Header;

