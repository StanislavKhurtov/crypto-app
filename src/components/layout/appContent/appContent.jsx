import React from 'react';
import {Layout, Typography} from "antd";
import {useCrypto} from "../../../hooks/useCrypto";
import {PortfolioChart} from "../../ui/portfolioChart/index.js";
import {AssetsTable} from "../../ui/assetsTable/index.js";


const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
};

export const AppContent = () => {
    const { assets, crypto } = useCrypto()

    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price
        return acc
    }, {})

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
                Portfolio:{' '}
                {assets
                    .map((asset) => asset.amount * cryptoPriceMap[asset.id])
                    .reduce((acc, v) => (acc += v), 0)
                    .toFixed(2)}
                $
            </Typography.Title>
            <PortfolioChart />
            <AssetsTable />
        </Layout.Content>
    );
};

