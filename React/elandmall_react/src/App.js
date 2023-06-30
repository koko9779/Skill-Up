import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main/Main';
import LeftMenu from './LeftMenu';
import NotFound from './Main/NotFound';


function App() {

    return (
        <>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/*" element={<Main/>}></Route>
                <Route path="/leftMenu/*" element={<LeftMenu/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;