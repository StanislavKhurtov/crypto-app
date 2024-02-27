import React, {useContext} from 'react'
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons'
import {Card, Layout, List, Statistic, Tag, Typography} from "antd"
import {capitalize} from "../../../utils/capitalize.js";
import {CryptoContext} from "../../../context/crypto-context.jsx";

const siderStyle = {
    color: '#fff',
    backgroundColor: '#1677ff',
    padding: '1rem'
};

export const AppSider = () => {
    const {assets} = useContext(CryptoContext)


    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(asset => (
                <Card key={asset.id} style={{marginBottom: '1rem'}}>
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{color: asset.grow ? '#3f8600' : '#cf1322'}}
                        prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                        suffix="$"
                    />
                    <List
                        size={'small'}
                        dataSource={[
                            {title: 'Total profit', value: asset.totalProfit, withTag: true},
                            {title: 'Asset Amount', value: asset.amount, toPlain: true},
                            /* {title: 'Difference', value: asset.growPercent},*/
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{capitalize(item.title)}</span>
                                <span>
                                    {item.withTag &&
                                        <Tag color={asset.grow ? '#3f8600' : '#cf1322'}>{asset.growPercent}%</Tag>}
                                    {item.toPlain && item.value}
                                    {!item.toPlain && <Typography.Text
                                        type={asset.grow ? "success" : "danger"}>
                                        {item.value.toFixed(2)}$
                                    </Typography.Text>}
                                    </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    );
};

