import React from "react";

/*
    내 용 : 2021_MO 메인 카테고리아이콘
*/

function G2106003204Inc(props) {
    let home_categoryIcon_list = props.home_categoryIcon_list;

    return (
        <div className="main-new-ctg">
            <ul>
                {home_categoryIcon_list.map((menu,idx) => (
                <li key={idx}>
                    <a href="{() => false}" data-ga-tag={((menu.ga_category === undefined || menu.ga_action === undefined || menu.ga_label === undefined) ? "" : menu.ga_category + "||" + menu.ga_action + "||" + menu.ga_label)}>
                        <span><img src={(menu.image_url !== undefined ? menu.image_url: "//dev.elandrs.com/20220524173421/images/mobile/common/60_noimg.gif")} alt={menu.title}/></span><em>{menu.title}</em>
                    </a>
                </li>
                ))}
                <li className="more">
                    <button type="button">
                        <em>더보기</em>
                    </button>
                </li>
            </ul>
            <div className="close">
                <button type="button">
                    <em>닫기</em>
                </button>
            </div>
        </div>
    )
};

export default G2106003204Inc;