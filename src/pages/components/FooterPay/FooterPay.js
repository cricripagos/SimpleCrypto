import Button from '../Buttons/Button'
import { setStepBackward, setStepForward } from "@/pages/store/reducers/interactions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { useState } from 'react'
import { useSwitchNetwork, useNetwork, usePrepareContractWrite, useContractWrite, useWaitForTransaction, erc20ABI } from 'wagmi'

const PayButton = ({ text }) => {
    const [chainOk, setChainOk] = useState(false)
    const [triggerAfterSwitch, setTriggerAfterSwitch] = useState(false)
    // Este deberia cambiarse por hook a store, pero tambien se tiene que editar a medida que sucedan cosas para que se renderize en otro componente
    const [status, setStatus] = useState('')
    //TODO cambiar variable de abajo por hook a store
    const chosen_network = 80001
    const chosen_contract = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
    const amount = 1
    const beneficiary_address = '0x5139A3CBD90800Ca9783010B5d984363D6E77dc6'
    const token_selected = true
    // 
    const { chain, chains } = useNetwork()
    const { error, isLoading: isloadingNetwork, pendingChainId, switchNetwork } = useSwitchNetwork()
    // Este Hook me 
    {/*useEffect(() => {
        console.log('cambio el chain id: ', chain.id)
        //Esto corre para actualizar si la network ya no matchea
        if (chosen_network == chain.id) {
            setChainOk(chosen_network == chain.id)
        } else {
            setStatus('Estas en la network' + chain.name + '. Al intentar pagar te solicitaremos cambiar a ' + chosen_network.toString() + ' para poder realizar el pago en el token seleccionado')
            setChainOk(false)
        }
    },
    [chain.id, chosen_network])*/}
    // Este Hook me mantiene actualizado lo que quiero hacer en el contrato
    const { config } = usePrepareContractWrite({
        address: chosen_contract,
        abi: erc20ABI,
        functionName: 'transfer',
        args: [beneficiary_address, amount],
        chainId: chosen_network,
        onError(error) {
            setChainOk(false)
            setStatus('Estas en la network' + chain.name + '. Al intentar pagar te solicitaremos cambiar a ' + chosen_network.toString() + ' para poder realizar el pago en el token seleccionado')
        },
        onSuccess(data) {
            setChainOk(chosen_network == chain.id)
        },
    })


    const { data, isLoading: isLoadingPay, isSuccess: isSuccessPay, write } = useContractWrite({
        ...config, onSuccess(data) {
            setStatus('La transaccion esta en proceso')
        }
    })
    useEffect(() => {
        if (triggerAfterSwitch) {
            // pagar
            write?.()
            setTriggerAfterSwitch(false)
        }
    }, [chain.id, chosen_network])
    const handleClick = () => {
        if (!chainOk) {
            switchNetwork(chosen_network)
            setTriggerAfterSwitch(true)
        } else {
            //pagar
            write?.()
        }
    }
    useEffect(() => isloadingNetwork ? setStatus('Estamos esperando que aceptes la solicitud de cambio de Network en tu wallet') : undefined, [isloadingNetwork]);
    useEffect(() => isLoadingPay ? setStatus('Estamos esperando que firmes la transaccion en tu wallet') : undefined, [isLoadingPay]);
    const { dataWait, isErrorWait, isLoadingWait } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(d) {
            setStatus('La transaccion fue correctamente procesada con hash:' + d.transactionHash)
        },
    })
    return (
        <>
            <p className='text-xs'>Toast:{status}</p>
            <button className={`text-white px-7 font-semibold rounded-md ${token_selected ? 'bg-green-1' : 'bg-stone-400'}`} disabled={!token_selected} onClick={handleClick}>
                {text}
            </button>
        </>
    )
}

const FooterPay = ({ btn_msg }) => {
    const { fiat_amount } = useSelector(state => state.order)
    const { step } = useSelector(state => state.interactions)
    //TODO agregar que si el usuario desconecta su wallet vuelve al paso anterior
    return (
        <div className='bg-stone-100 py-5 px-7 flex flex-row justify-between'>
            <div>
                <p className='font-bold'>Orden: #001</p>
                <p>{fiat_amount} ARS($)</p>
            </div>
            <div className='flex'>
                <PayButton filled={true} text={btn_msg} />
            </div>
        </div>
    )
}

export default FooterPay