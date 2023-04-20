import React, { useState } from 'react'
import { useEffect } from 'react'
import { formatEther } from 'ethers/lib/utils.js'
import { useSelector } from 'react-redux'
import { CryptoCard } from '../components'
import { useGetBalances } from '@/helpers/hooks/useGetBalances'

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
    const {payment} = useSelector(state => state.options)
    const {fiat_amount} = useSelector(state => state.order)
    const balanceData = useGetBalances(payment)
    const [loading, setLoading] = useState(true)
    const [paymentInfo, setPaymentInfo] = useState(null)

    // const payment_methods = payment.filter(method => method.evm == true)
    // const sorted = payment_methods.sort((a) => console.log('aa', a.name, balanceData.data[a.id - 1]))
    // console.log('Sorted', sorted)

    useEffect(() => {
        if (balanceData.data !== undefined) {
            const obj = payment.filter(method => method.evm == true).map((item, index) => {
                const balance = balanceData.data && balanceData.data[index]
                return { ...item, balance: balance }
            })
            setPaymentInfo(obj)
            setLoading(false)
        }
    }, [balanceData])

    console.log('paymentInfo', paymentInfo)

    // console.log('paymentInfo', paymentInfo.sort((a, b) => (formatEther(a.balance) < fiat_amount/a.price) - (formatEther(b.balance) < fiat_amount/b.price)))

    // console.log('paymentInfo', paymentInfo.sort((a) => console.log( formatEther(a.balance) > fiat_amount/a.price)))

    return (
        <div className='w-full'>
            {loading ? <div>Loading...</div> :
            paymentInfo.sort((a, b) => (formatEther(a.balance) < fiat_amount/a.price) - (formatEther(b.balance) < fiat_amount/b.price)).map((item, index) => {
            
            // const balance = balanceData.data && balanceData.data[index]
            // const currency = {...item, balance: balance}
            // contract = {...contract, balance: balance}
            // const contract = {balance:1203, contract:'aaaa'}
            return <CryptoCard {...item}  key={index} />
          })}
            {/* <CardWrapper balanceData={balanceData} contracts={contracts} /> */}
        </div>
    )
}

export default EvmTokens