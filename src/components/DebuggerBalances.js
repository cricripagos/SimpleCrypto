import React, { useEffect, useState } from 'react'
import { useGetBalance, useGetBalances } from '../../lib/const/hooks/wagmiHooks'



export const ErcBalances = ({ payer_address, contracts, setBalances }) => {
    const { data, isError, isLoading } = useGetBalances({ contracts, payer_address })
    useEffect(() => {
        if (data !== undefined) {
            const newBalances = data.map((item, index) => ({ contract: contracts[index].contract, chainId: contracts[index].chain_id, balance: item, token: contracts[index].token }))
            setBalances(newBalances)
        }
    }, [data, isError, isLoading])
    if (data == undefined) return <div>loading balances...</div>
    return (
        <>
            <div>ErcBalances</div>
            {data.map((item, index) => (
                <div key={index}><h1>ChainId: {contracts[index].chain_id} - Token:{contracts[index].token}  - Balance: {item?.toString()}</h1><br /> </div>
            ))}
        </>
    )
}



const DebuggerBalances = ({ current_blockchain, payer_address, setBalances }) => {
    return (
        <>
            <ErcBalances
                {... {
                    payer_address, setBalances,
                    //TODO esto deberia salir de la payment_options de la BD
                    contracts: [
                        { contract: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', token: 'DAI', chain_id: 137 },
                        { contract: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', token: 'USDC', chain_id: 137 },
                        { contract: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', token: 'USDT', chain_id: 137 },
                        { contract: '0x55d398326f99059fF775485246999027B3197955', token: 'USDT', chain_id: 56 },
                        { contract: '0xe9e7cea3dedca5984780bafc599bd69add087d56', token: 'BUSD', chain_id: 56 },
                        { contract: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB', token: 'LINK', chain_id: 80001 }]
                }}
            />
        </>
    )


}

export default DebuggerBalances