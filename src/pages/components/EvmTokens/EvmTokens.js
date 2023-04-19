import React from 'react'
import { useGetBalances } from '@lib/hooks/useGetBalances'
import { useEffect } from 'react'
import { formatEther } from 'ethers/lib/utils.js'

export const CardWrapper = ({ balanceData, contracts }) => {
    if (balanceData.data == undefined) return <div>Loading...</div>
    return (
        <>
            <div>Wrapper</div>
            {balanceData.data.map((item, index) => (
                <div key={index}>
                    Este es el selector de {contracts[index].token} en {contracts[index].chain_id}
                    <br />
                    Holdings aca: {formatEther(item)}
                    <br />
                </div>
            ))}
        </>
    )
}


const EvmTokens = () => {
    //TODO cambiar esto hardcodeado por endpoint API
    const contracts = [
        { contract: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', token: 'DAI', chain_id: 137 },
        { contract: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', token: 'USDC', chain_id: 137 },
        { contract: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', token: 'USDT', chain_id: 137 },
        { contract: '0x55d398326f99059fF775485246999027B3197955', token: 'USDT', chain_id: 56 },
        { contract: '0xe9e7cea3dedca5984780bafc599bd69add087d56', token: 'BUSD', chain_id: 56 },
        { contract: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB', token: 'LINK', chain_id: 80001 }]
    // Muestro un boton por cada uno
    // Disableo los que no tienen balance
    // si clickeas mandamos una variable a estado que cuando haces click en pagar pasa
    const balanceData = useGetBalances({ contracts })

    return (
        <>
            <div>EvmTokens</div>
            <div> selector de cada token...</div>
            <CardWrapper balanceData={balanceData} contracts={contracts} />
        </>
    )
}

export default EvmTokens