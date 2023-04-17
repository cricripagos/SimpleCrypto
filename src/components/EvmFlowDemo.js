import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import DebuggerPagar from './DebuggerPagar'
const DebuggerBalances = dynamic(() => import('../components/DebuggerBalances'), {
  ssr: false,
})

const EvmFlowDemo = ({ payer_address, beneficiary_address, amount, current_blockchain }) => {
  //TODO esta variable balances, deberia pasarse a store/redux/context 
  const [balances, setBalances] = useState(false)
  return (
    <>
      <div>EvmFlowDemo</div>
      <DebuggerPagar
        balances={balances}
        amount={amount}
        current_blockchain={current_blockchain}
        beneficiary_address={beneficiary_address}
      />
      {/* 
        <PagarHandler
          token
          chosen_blockchain
          contract_address
          payer_address
          amount
          beneficiary_address
          current_blockchain
          chain_id
        />
        */}
      <DebuggerBalances {... { current_blockchain, payer_address, setBalances }} />

    </>
  )
}

export default EvmFlowDemo