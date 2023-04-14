import React, { useState, useEffect } from 'react';
import { erc20ABI } from 'wagmi';
import { useNetwork, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { useGetBalance } from '../../lib/const/hooks/wagmiHooks';


const PagarHandler = ({ current_blockchain, token, chosen_blockchain, contract_address, payer_address, amount, beneficiary_address, chain_id }) => {
    const [message, setMessage] = useState('');
    const { config } = usePrepareContractWrite({
        address: contract_address,
        abi: erc20ABI,
        functionName: 'transfer',
        args: [beneficiary_address, amount],
        chainId: chain_id
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)
    const handleClick = () => {
        console.log('ya va a armarse')
        write?.()
    };

    return (
        <div className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
            <button onClick={handleClick}>Pagar </button>
            <p>{message}</p>
        </div>
    );
};

export default PagarHandler;