import { useContractRead, useContractReads } from 'wagmi'
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

export const useGetBalances = ({contracts, payer_address}) => {    
  const contracts_to_read = contracts.map(contract=>{
    return{
        address:contract.contract,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args:[payer_address],
        chainId:contract.chain_id
    }
  })
  
  const { data, isError, isLoading } = useContractReads({contracts:contracts_to_read})
  return { data, isError, isLoading }
}
