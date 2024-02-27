import React from 'react';
import {CryptoContextProvider} from "./context/crypto-context.jsx";
import {AppLayout} from "./components/layout/appLayout/appLayout.jsx";


export const App = () => {
    return (
        <CryptoContextProvider>
            <AppLayout/>
        </CryptoContextProvider>
    )
};

