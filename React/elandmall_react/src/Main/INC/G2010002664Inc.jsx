import React from "react";

/*
    내 용 : 2018_MO메인_이미지배너
*/

function G2010002664Inc(props) {
    let home_imgbanner = props.home_imgbanner;

    return (
        <div className="main_v_areaBn">
            <a href="{() => false}" data-ga-tag={home_imgbanner.ga_category + "||" + home_imgbanner.ga_action +"||" + home_imgbanner.ga_label}>
                <img src={home_imgbanner.image_url} aria-describedby="areaBn_desc0" alt={home_imgbanner.rel_cont_nm}/>
                <span id="areaBn_desc0" className="ir"></span>
            </a>
        </div>
    )
}

export default G2010002664Inc;