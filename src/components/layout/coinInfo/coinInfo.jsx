import React from 'react';
import {Flex, Typography} from "antd";

export const CoinInfo = ({coin}) => {
    return (
        <Flex align='center'>
            <img src={coin.icon} alt={coin.name} style={{width: '30px', marginRight: '10px'}}/>
            <Typography.Title level={2} style={{margin: 0}}>
                {coin.name}
            </Typography.Title>
        </Flex>
    );
};
