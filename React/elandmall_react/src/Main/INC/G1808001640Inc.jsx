import React from "react";

/*
    내 용 : 2021_킴스클럽_메인_카테고리(MO)
*/

function G1808001640Inc(props){
    let home_banner_top = props.home_banner_top;
    return (
        <div className="main_evt_bn3">
		    <a href="{() => false}" data-ga-tag={home_banner_top.ga_category + "||" + home_banner_top.ga_action + "||" + home_banner_top.ga_label}>
                <img src={home_banner_top.image_url} width="320" height="140" alt={home_banner_top.rel_cont_nm}/>
            </a>
		</div>
    )
}

export default G1808001640Inc;