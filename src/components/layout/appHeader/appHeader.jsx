import React, {useEffect, useState} from 'react';
import {Layout, Select, Space, Button, Modal, Drawer} from "antd";
import {useCrypto} from "../../../hooks/useCrypto.js";
import {CoinInfoModal} from "../../ui/coinInfoModal/coinInfoModal.jsx";
import {AddAssetsForm} from "../../ui/addAssetsForm/addAssetsForm.jsx";

const headerStyle = {
    width: '100%',
    color: '#fff',
    height: 60,
    padding: '1rem',
    backgroundColor: '#4096ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
};
export const AppHeader = () => {
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [coin, setCoin] = useState(null)
    const [drawer, setDrawer] = useState(false)
    const {crypto} = useCrypto()
    useEffect(() => {
        const keypress = (e) => {
            if (e.key === '/') {
                setSelect(prev => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, []);
    const handleSelect = (value) => {
        setCoin(crypto.find(c => c.id === value))
        setModal(prev => !prev)
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: '250px',
                }}
                open={select}
                onSelect={handleSelect}
                value={'press / to open'}
                onClick={() => setSelect(prev => !prev)}
                optionLabelProp="label"
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
            <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>
            <Modal open={modal} onOk={() => setModal(false)} onCancel={() => setModal(false)} footer={null}>
                <CoinInfoModal coin={coin}/>
            </Modal>
            <Drawer destroyOnClose title={'Add Assets'} onClose={() => setDrawer(false)} open={drawer}>
                <AddAssetsForm/>
            </Drawer>
        </Layout.Header>
    );
};

