import React, { useState } from 'react'
import { useEffect } from 'react'
import { formatEther } from 'ethers/lib/utils.js'
import { useSelector } from 'react-redux'
import { CryptoCard } from '../components'
import { useGetBalances } from '@/helpers/hooks/useGetBalances'


const EvmTokens = () => {
    const { payment } = useSelector(state => ({
        payment: state.options.payment.filter(item => item.evm === true)
    }));
    const { fiat_amount } = useSelector(state => state.order)
    const balanceData = useGetBalances(payment)
    const [loading, setLoading] = useState(true)
    const [paymentInfo, setPaymentInfo] = useState(null)
    useEffect(() => {
        if (balanceData.dataWithId !== undefined) {
            const obj = payment.map((item) => {
                console.log(item)
                //const balance = balanceData.data[index]
                //console.log('ver ak', balanceData.data, item)
                //return { ...item, balance: balance }
            })
            setPaymentInfo(obj)
            setLoading(false)
        }
    }, [balanceData])

    return (
        <div className='w-full'>
            {loading ? <div>Loading...</div> :
                paymentInfo.sort((a, b) => (formatEther(a?.balance) < fiat_amount / a?.price) - (formatEther(b?.balance) < fiat_amount / b?.price)).map((item, index) => {

                    // const balance = balanceData.data && balanceData.data[index]
                    // const currency = {...item, balance: balance}
                    // contract = {...contract, balance: balance}
                    // const contract = {balance:1203, contract:'aaaa'}
                    return <CryptoCard {...item} key={index} />
                })}
            {/* <CardWrapper balanceData={balanceData} contracts={contracts} /> */}
        </div>
    )
}

export default EvmTokens