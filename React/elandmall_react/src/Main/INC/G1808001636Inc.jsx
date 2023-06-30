import React from "react";

/*
    내 용 : 2018_MO메인 서브배너
*/

function G1808001636Inc(props){
    let home_subbanner_list = props.home_subbanner_list;

    return (
        <div className="main_evt_cp">		
            <ul>
                {home_subbanner_list.map((menu,idx) => (
                <li key={idx}>
                    <a href="/counter" data-ga-tag={menu.ga_category + "||" + menu.ga_action + "||" + menu.ga_label}>
                        <img src={menu.image_url} width="200" height="114" alt={menu.rel_cont_nm}/>
                    </a>
                </li>		
                ))}
            </ul>
        </div>
    )
};

export default G1808001636Inc;