import Button from '../Buttons/Button'
import { setStepBackward, setStepForward, setToast } from "@/pages/store/reducers/interactions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { useState } from 'react'
import { useSwitchNetwork, useNetwork, usePrepareContractWrite, useContractWrite, useWaitForTransaction, erc20ABI } from 'wagmi'
import { useRouter } from 'next/router'

const PayButton = ({ text }) => {
    const [chainOk, setChainOk] = useState(false)
    const {btn_disabled} = useSelector(state => state.interactions)
    const [triggerAfterSwitch, setTriggerAfterSwitch] = useState(false)
    //Payment method selected by user
    const {payment_method, crypto_amount} = useSelector(state => state.order)
    //Existing payment options & merchant
    const {payment} = useSelector(state => state.options)
    const {keys} = useSelector(state => state.merchant)
    const selectedMethod = payment.find((item) => item.id === payment_method)
    console.log('selected method: ', selectedMethod)
    // Este deberia cambiarse por hook a store, pero tambien se tiene que editar a medida que sucedan cosas para que se renderize en otro componente
    const [status, setStatus] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()
    //TODO cambiar variable de abajo por hook a store
    console.log(keys)
    const chosen_network = 80001
    const chosen_contract = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
    const amount = 1
    const beneficiary_address = '0x5139A3CBD90800Ca9783010B5d984363D6E77dc6'
    // 
    const { chain, chains } = useNetwork()
    const { error, isLoading: isloadingNetwork, pendingChainId, switchNetwork } = useSwitchNetwork()

    console.log('Crypto amount: ', crypto_amount)


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
        address: selectedMethod?.contract_address,
        abi: erc20ABI,
        functionName: 'transfer',
        args: [beneficiary_address, 10],
        chainId: selectedMethod?.chain_id,
        onError(error) {
            setChainOk(false)
            
            dispatch(setToast({ message: `Estas en la network ${chain.name}. Al intentar pagar te solicitaremos cambiar a ${selectedMethod?.chain_id.toString()} para poder realizar el pago en el token seleccionado`, status: 'warning', loading: false, show: true}))
            // setStatus('Estas en la network' + chain.name + '. Al intentar pagar te solicitaremos cambiar a ' + selectedMethod?.chain_id.toString() + ' para poder realizar el pago en el token seleccionado')
        },
        onSuccess(data) {
            setChainOk(selectedMethod?.chain_id == chain.id)
        },
    })


    const { data, isLoading: isLoadingPay, isSuccess: isSuccessPay, write } = useContractWrite({
        ...config, onSuccess(data) {
            dispatch(setToast({ message: 'La transaccion esta en proceso', status: '', loading: true, show: true}))
            // setStatus('La transaccion esta en proceso')
        }
    })
    useEffect(() => {
        if (triggerAfterSwitch) {
            // pagar
            write?.()
            setTriggerAfterSwitch(false)
        }
    }, [chain.id, selectedMethod?.chain_id])
    const handleClick = () => {
        if (!chainOk) {
            switchNetwork(selectedMethod?.chain_id)
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
            router.push('/success/000')
            dispatch(setToast({ message: 'La transaccion fue correctamente procesada con hash:' + d.transactionHash, status: 'success', loading: false, show: true}))
            // setStatus('La transaccion fue correctamente procesada con hash:' + d.transactionHash)
        },
    })
    return (
        <>
            <button className={`text-white px-7 font-semibold rounded-md ${btn_disabled ? 'bg-stone-400' : 'bg-green-1'}`} disabled={btn_disabled} onClick={handleClick}>
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
                <Button text='Volver' filled={false} onClick={() => dispatch(setStepBackward())} />
                <PayButton filled={true} text={btn_msg} />
            </div>
        </div>
    )
}

export default FooterPay