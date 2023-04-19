import React from 'react'
import { FooterPay, InputComponent, Layout } from "@/pages/components/components"
import EvmTokens from '@/pages/components/EvmTokens/EvmTokens'
import { Web3Button } from "@web3modal/react";


const Step3 = () => {
    return (
        <Layout>
            <div className="flex flex-col h-screen justify-between">
                <Web3Button balance="show" icon="show" />
                <EvmTokens />
                <FooterPay btn_msg='Pagar' />
            </div>
        </Layout>
    )
}

export default Step3