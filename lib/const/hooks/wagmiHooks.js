import { useContractRead } from 'wagmi'
import { erc20ABI } from 'wagmi'

export const useGetBalance = ({ contract, payer_address, chain_id }) => {
    const { data, isError, isLoading } = useContractRead({
        address: contract,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [payer_address],
        chainId: chain_id
    })
    return { data, isError, isLoading }
}