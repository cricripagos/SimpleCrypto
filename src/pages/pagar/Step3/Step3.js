import React from 'react'
import { Footer, InputComponent, Layout } from "@/pages/components/components"
import EvmTokens from '@/pages/components/EvmTokens/EvmTokens'
import { Web3Button } from "@web3modal/react";
import Header from '@/pages/components/Header/Header';

const Step3 = () => {
    
    return (
        <Layout>
                    <div className="flex flex-col h-screen justify-between">
        <div className="flex bg-green-1 rounded-b-lg justify-center items-center flex-col pb-5 px-7">
          <Header />
        </div>
            <div className="flex flex-col h-full justify-between overflow-scroll overflow-x-hidden overflow-y-scroll scrollbar-hide px-7" id='scrollbox'>
                <Web3Button balance="show" icon="show" />
                <EvmTokens />

            </div>
            <Footer btn_msg='Pagar' />
        </div>
        </Layout>
    )
}

export default Step3