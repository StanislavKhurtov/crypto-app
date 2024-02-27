import React, {useState} from 'react';
import {Flex, Select, Space, Typography, DatePicker, Divider, Form, Input, Button, InputNumber} from "antd";
import {useCrypto} from "../../../hooks/useCrypto.js";

export const AddAssetsForm = () => {
    const [form] = Form.useForm()
    const {crypto, addAsset} = useCrypto()
    const [coin, setCoin] = useState(null)

    const validateMessages = {
        required: '${label} is required!',
        types: {
            number: '${label} in not valid number',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    }

    if (!coin) {
        return (
            <Select
                style={{
                    width: '100%',
                }}
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
                placeholder={'Select coin'}
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon

                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: '20px', height: '20px'}} src={option.data.icon} alt={option.data.label}/>
                        {option.data.label}
                    </Space>
                )}
            />
        )
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    function handleAmountChange(value) {
        const price = form.getFieldValue('price')
        form.setFieldValue({
            total: +(value * price).toFixed(2)
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldValue({
            total: +(value * amount).toFixed(2)
        })
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: coin.price.toFixed(2)
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}

        >
            <Flex align='center'>
                <img src={coin.icon} alt={coin.name} style={{width: '30px', marginRight: '10px'}}/>
                <Typography.Title level={2} style={{margin: 0}}>
                    {coin.name}
                </Typography.Title>
            </Flex>
            <Divider/>

            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    {
                        required: true,
                        type: 'number',
                        min: 0,
                    },
                ]}
            >
                <InputNumber onChange={handleAmountChange} placeholder={'Enter coin amount'} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
            >
                <InputNumber onChange={handlePriceChange} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
                label="Date & Time"
                name="date"
            >
                <DatePicker showTime/>
            </Form.Item>


            <Form.Item
                label="Total"
                name="total"
            >
                <InputNumber disabled style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>
    )
}

