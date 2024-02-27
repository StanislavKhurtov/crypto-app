import {useContext} from "react";
import {CryptoContext} from "../context/crypto-context.jsx";

export const useCrypto = () => {
    return useContext(CryptoContext)
}