import {createContext, useEffect, useState} from "react"
import {fakeFetchCrypto, fetchAssets} from "../api/api.js";
import {percentDifference} from "../utils/percentDifference.js";

export const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false
})

export const CryptoContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])
    useEffect(() => {
        async function preload() {
            setLoading(true)
            const {result} = await fakeFetchCrypto()
            const assets = await fetchAssets()

            setAssets(assets.map(asset => {
                const coin = result.find(c => c.id === asset.id)
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDifference(asset.price, coin.price),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                    name: coin.name,
                    ...asset
                }
            }))
            setCrypto(result)
            setLoading(false)
        }

        preload()
    }, []);

    return (
        <CryptoContext.Provider value={{loading, crypto, assets}}>
            {children}
        </CryptoContext.Provider>
    )
}