import React from 'react'
import PagarHandler from '../src/pages/components/WalletConnectComponents/PagarHandler'

export const PagarLogic = ({ amount, current_blockchain, balance, beneficiary_address }) => {
    //check balance
    if (balance.balance?.gte(amount)) {
        if (balance.chainId !== current_blockchain) return <div>No se puede pagar con {balance.token} en {balance.chainId}, porque estas en {current_blockchain}  <br /><br /></div>
        return (
            <>
                <PagarHandler
                    amount={amount}
                    beneficiary_address={beneficiary_address}
                    chain_id={balance.chainId}
                    contract_address={balance.contract}
                />
                <div>Si se puede pagar con {balance.token} en {balance.chainId}<br /><br /></div>
            </>
        )
    } else {
        return <div>No se puede pagar xq no hay balance de {balance.token} en la chain {balance.chainId} <br /><br /></div>
    }
}



const DebuggerPagar = ({ balances, amount, current_blockchain, beneficiary_address }) => {
    if (!balances) return <div>balances vacio</div>
    return (
        <>
            {balances.map((balance, index) =>
                <PagarLogic
                    key={index}
                    amount={amount}
                    current_blockchain={current_blockchain}
                    balance={balance}
                    beneficiary_address={beneficiary_address}
                />
            )}
        </>
    )
}

export default DebuggerPagar