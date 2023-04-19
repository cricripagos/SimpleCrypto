import { useState, useEffect } from "react";
import { useNetwork, useAccount } from "wagmi";
import { erc20ABI } from "wagmi";
import { useContractReads } from "wagmi";
import React from 'react'

const useCustomRead = (evm_contracts, address) => {
    const [res, setRes] = useState({ data: undefined, isError: undefined, isLoading: undefined })
    console.log('Contracts2...', evm_contracts)

    const contracts_to_read = evm_contracts.map(contract => {
        console.log('contract...', contract)
        return {
            address: contract.contract_address,
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [address],
            chainId: contract.chain_id
    }
    })
    const { data, isError, isLoading } = useContractReads({ contracts: contracts_to_read })
    useEffect(() => {
        setRes({ data, isError, isLoading })
    }, [data, isError, isLoading])
    console.log('res...', res)
    return res
}

export const useGetBalances = (contracts) => {
    console.log('Contracts1...', contracts)
    let evm_contracts = contracts.filter(contract => contract.evm == true)

    console.log('Contracts3...', evm_contracts)

    //TODO cambiar estos 2 hooks de abajo por parametros, para optimizar (no es urgente)
    const { chain, chains } = useNetwork()
    const { address, isConnecting, isDisconnected } = useAccount();
    const r = useCustomRead(evm_contracts, address)

    return r
}
