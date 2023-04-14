import React, { useEffect, useState } from 'react'
import { useGetBalance } from '../../lib/const/hooks/wagmiHooks'
import dynamic from 'next/dynamic'

const ErcBalance = ({ contract, token, payer_address, chain_id }) => {
    //console.log('elpayer address es:', payer_address)
    if (payer_address == undefined) { return <div>wallet sin conectar</div> }
    const [hasMounted, setHasMounted] = useState(false)
    const [valor, setValor] = useState('loading')
    const { data, isError, isLoading } = useGetBalance({ contract, payer_address, chain_id })
    useEffect(() => {
        console.log('El hook devuelve:', data?.toString(), isError, isLoading)
        setValor(data.toString())
    }, [data, isError, isLoading])
    useEffect(() => { setHasMounted(true) }, [])
    if (!setHasMounted) return null;
    return (
        <div><h1>Chain:{chain_id} - Holdings for {token} = {valor}</h1><br /> </div>
    )
}

const Debug = ({ payer_address }) => {
    const [hasMounted, setHasMounted] = useState(false)
    console.log(hasMounted)
    useEffect(() => { setHasMounted(true) }, [])
    if (setHasMounted) {
        console.log('corrio y set has mounted es true')
        return <div>{payer_address}</div>
    } else {
        console.log('corrio y set has mounted es false')
        return <div>corrio y set has mounted es false</div>
    }
}

const DebuggerBalances = ({ current_blockchain, payer_address }) => {
    const [network, setNetwork] = useState(false)
    useEffect(() => { setNetwork(current_blockchain) }, [current_blockchain])
    return (
        <>
            <Debug {...{ payer_address }} />
            {/*
            <ErcBalance {... { payer_address, contract: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', token: 'DAI', chain_id: 137 }} />
            <ErcBalance {... { payer_address, contract: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', token: 'USDC', chain_id: 137 }} />
            <ErcBalance {... { payer_address, contract: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', token: 'USDT', chain_id: 137 }} />
            <ErcBalance {... { payer_address, contract: '0x55d398326f99059fF775485246999027B3197955', token: 'USDT', chain_id: 56 }} />
            <ErcBalance {... { payer_address, contract: '0xe9e7cea3dedca5984780bafc599bd69add087d56', token: 'BUSD', chain_id: 56 }} />
            <ErcBalance {... { payer_address, contract: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB', token: 'LINK', chain_id: 80001 }} />
        */}
        </>
    )


}

export default DebuggerBalances