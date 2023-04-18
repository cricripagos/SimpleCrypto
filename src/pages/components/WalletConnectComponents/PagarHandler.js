import { useEffect, useState } from 'react';
import { erc20ABI, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

const PagarHandler = ({ current_blockchain, token, chosen_blockchain, contract_address, payer_address, amount, beneficiary_address, chain_id }) => {
    const [message, setMessage] = useState('');
    const { config } = usePrepareContractWrite({
        address: contract_address,
        abi: erc20ABI,
        functionName: 'transfer',
        args: [beneficiary_address, 1],
        chainId: chain_id
    })
    const { data, isLoading, isSuccess, write } = useContractWrite({
        ...config, onSuccess(data) {
            setMessage('La transaccion esta en proceso')
        }
    })

    useEffect(() => {
        if (data?.hash) {
            console.log('deberia correr cuando se manda a la BCHAIN')
        }
    }, [data?.hash])

    const { dataWait, isErrorWait, isLoadingWait } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(d) {
            setMessage('La transaccion fue correctamente procesada con hash:' + d.hash)
            console.log('Success del wait', d)
        },
    })




    const handleClick = () => {
        write?.()
    };

    return (
        <>
            <div className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                <button onClick={handleClick}>Pagar </button>
            </div>
            <div className="bg-green-500 mb-5 p-4 rounded-lg w-40">
                <p className="text-white font-bold">Aca se pone el estado del pago:</p>
                <p className="text-white">{message}</p>
            </div>
        </>
    );
};

export default PagarHandler;