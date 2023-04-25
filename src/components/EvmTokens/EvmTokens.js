import React, { useState } from 'react'
import { useEffect } from 'react'
import { formatEther } from 'ethers/lib/utils.js'
import { useSelector } from 'react-redux'
import { CryptoCard } from '../components'
import { useGetBalances } from '@/helpers/hooks/useGetBalances'
import { FixedNumber } from 'ethers'


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
            let temp_payments = payment.map((item) => {
                const balance = balanceData.dataWithId.filter(balanceItem => balanceItem[1] === item.id)[0][0]
                const amount_in_fn = FixedNumber.from((fiat_amount / item.price).toPrecision(6))
                //TODO esta funcion enrealidad esta mal, hay que adaptar el balance para que se pase de wei a Eth. Creo que con formatEth sale
                const enough_balance = balance.gt(amount_in_fn)
                return { ...item, balance, enough_balance }
            })
            temp_payments.sort((a, b) => { return b.enough_balance - a.enough_balance })
            console.log(temp_payments)
            setPaymentInfo(temp_payments)
            setLoading(false)
        }
    }, [balanceData])

    return (
        <div className='w-full'>
            {loading ? <div>Loading...</div> :
                paymentInfo?.map((item, index) => {

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