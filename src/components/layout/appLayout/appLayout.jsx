import React from 'react';
import {Layout, Spin} from "antd";
import {AppHeader} from "../appHeader/appHeader.jsx";
import {AppSider} from "../appSider/appSider.jsx";
import {AppContent} from "../appContent/appContent.jsx";
import {useCrypto} from "../../../hooks/useCrypto.js";

export const AppLayout = () => {
    const {loading} = useCrypto()

    if (loading) {
        return <Spin fullscreen/>
    }
    return (
        <Layout>
            <AppHeader/>
            <Layout>
                <AppSider/>
                <AppContent/>
            </Layout>
        </Layout>
    );
};

