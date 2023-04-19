import { useState, useEffect } from "react";
import { useNetwork, useAccount } from "wagmi";
import { erc20ABI } from "wagmi";
import { useContractReads } from "wagmi";
import React from 'react'

const useCustomRead = (contracts, address) => {
    const [res, setRes] = useState({ data: undefined, isError: undefined, isLoading: undefined })
    const contracts_to_read = contracts.map(contract => {
        return {
            address: contract.contract,
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
    return res
}

export const useGetBalances = ({ contracts }) => {


    //TODO cambiar estos 2 hooks de abajo por parametros, para optimizar (no es urgente)
    const { chain, chains } = useNetwork()
    const { address, isConnecting, isDisconnected } = useAccount();
    const r = useCustomRead(contracts, address)

    return r
}
