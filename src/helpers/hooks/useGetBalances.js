import { useState, useEffect } from "react";
import { useNetwork, useAccount } from "wagmi";
import { erc20ABI } from "wagmi";
import { useContractReads } from "wagmi";
import React from 'react'

const useCustomRead = (evm_contracts, address) => {
    const [res, setRes] = useState({ data: undefined, isError: undefined, isLoading: undefined })

    const contracts_to_read = evm_contracts.map(contract => {
        return {
            address: contract.contract_address,
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [address],
            chainId: contract.chain_id
        }
    })
    const { data, isError, isLoading } = useContractReads({ contracts: contracts_to_read })
    const dataWithId = data.map((item, index) => [item, evm_contracts[index].id])
    useEffect(() => {
        setRes({ dataWithId, isError, isLoading })
    }, [data, isError, isLoading])
    console.log('Cached balances...', res)
    return res
}

export const useGetBalances = (contracts) => {
    let evm_contracts = contracts.filter(contract => contract.evm == true)


    //TODO cambiar estos 2 hooks de abajo por parametros, para optimizar (no es urgente)
    const { chain, chains } = useNetwork()
    const { address, isConnecting, isDisconnected } = useAccount();
    const r = useCustomRead(evm_contracts, address)

    return r
}
