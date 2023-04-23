import React, { useEffect } from 'react'
import { Footer, FooterPay, InputComponent, Layout } from "@components/components"
import EvmTokens from '@components/EvmTokens/EvmTokens'
import { Web3Button } from "@web3modal/react";
import Header from '@components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import { setBtnDisabled } from '@/store/reducers/interactions';


const Step3 = () => {
  const { payment_method } = useSelector(state => state.order)
  const { address } = useAccount()
  const dispatch = useDispatch()

  useEffect(() => {
    if (address !== undefined && payment_method !== null) {
      dispatch(setBtnDisabled(false))
    } else {
      dispatch(setBtnDisabled(true))
    }
  }, [payment_method, address])

  return (
    <Layout>
      <div className="flex flex-col h-screen justify-between">
        <div className="flex bg-green-1 rounded-b-lg justify-center items-center flex-col pb-5 px-7">
          <Header />
        </div>
        <div className="flex flex-col h-full justify-between overflow-scroll overflow-x-hidden overflow-y-scroll scrollbar-hide px-7 mb-24 py-3" id='scrollbox'>
          <Web3Button balance="show" icon="show" />
          <EvmTokens />
        </div>
        <FooterPay btn_msg='Pagar' />
      </div>
    </Layout>
  )
}

export default Step3