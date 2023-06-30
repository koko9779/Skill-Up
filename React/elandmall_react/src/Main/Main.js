import React, { useState, useEffect } from 'react';
import Header from './Header';
import Contents from './Contents';
import axios from 'axios';
import Counter from '../Counter';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainTop from './MainTop';

function Main() {
    const [header, setHeader] = useState(null);
    const [mainContent, setMainContent] = useState(null);

    // axios 멀티 리퀘스트 보내기
    useEffect(() => {
        axios
        .all([axios.get("https://dev-m.elandmall.com/api/main/mainTabJsonNew.action"), axios.get("https://dev-m.elandmall.com/api/main/mainContentTotalJson.action")])
        .then(
            axios.spread((response1, response2) => {
                setHeader(response1.data);
                setMainContent(response2.data);
            })
        )
        .catch((err) => console.log(err));

    }, []);

    if (!header) return null;
    if (!mainContent) return null;

    console.log(header);
    console.log(mainContent);

    return (
        <>
            <Header top_banner={header.data.top_banner} search_ad={header.data.search_ad}/>
            <div className="contents" id="contents">
                <MainTop header_icon_list={header.data.header_icon_list} />
                <Routes>
                    <Route path="/*" element={<Navigate to="/main/initMain.action"/>}></Route>
                    <Route path="/main/initMain.action/*" element={<Contents header_icon_list={header.data.header_icon_list} mainContent={mainContent.data}/>}></Route>
                    <Route path="/shop/searchPlanShopMainJson.action" element={<Navigate to="/main/initMain.action?gnb_idx=1"/>}></Route>
                    <Route path="/counter" element={<Counter/>}></Route>
                </Routes>
            </div>
        </>
    )
}

export default Main;