import Button from '../Buttons/Button'
import { resetToast, setBtnDisabled, setStepBackward, setStepForward, setToast } from "@/store/reducers/interactions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { useState } from 'react'
import { useSwitchNetwork, useNetwork, usePrepareContractWrite, useContractWrite, useWaitForTransaction, erc20ABI } from 'wagmi'
import { useRouter } from 'next/router'
import { parseEther } from 'ethers/lib/utils.js'

const PayButton = ({ text }) => {
    const [chainOk, setChainOk] = useState(false)
    const { btn_disabled } = useSelector(state => state.interactions)
    const [triggerAfterSwitch, setTriggerAfterSwitch] = useState(false)
    //Payment method selected by user
    const { payment_method, crypto_amount } = useSelector(state => state.order)
    console.log("chek store", payment_method, crypto_amount)
    //Existing payment options & merchant
    const { payment } = useSelector(state => state.options)
    const { keys } = useSelector(state => state.merchant)
    console.log("chek store", payment, keys)
    const selectedMethod = payment.find((item) => item.id === payment_method)
    // Este deberia cambiarse por hook a store, pero tambien se tiene que editar a medida que sucedan cosas para que se renderize en otro componente
    const [status, setStatus] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()
    //TODO cambiar variable de abajo por hook a store
    const beneficiary_address = '0x5139A3CBD90800Ca9783010B5d984363D6E77dc6'
    const { chain, chains } = useNetwork()
    const { error, isLoading: isloadingNetwork, pendingChainId, switchNetwork } = useSwitchNetwork()
    // Este Hook me mantiene actualizado lo que quiero hacer en el contrato
    const formated_amount = crypto_amount ? parseEther(crypto_amount.toString().slice(0, 18).toString()) : 0
    console.log("aca mirar", formated_amount.toString())
    const { config } = usePrepareContractWrite({
        address: selectedMethod?.contract_address,
        abi: erc20ABI,
        functionName: 'transfer',
        args: [keys?.key_evm, formated_amount],
        chainId: selectedMethod?.chain_id,
        onError(error) {
            setChainOk(false)
            dispatch(setBtnDisabled(true))
            dispatch(setToast({ message: `Estas en la network ${chain.name}. Al intentar pagar te solicitaremos cambiar a ${selectedMethod?.chain_id.toString()} para poder realizar el pago en el token seleccionado`, status: 'warning', loading: false, show: true }))
            // setStatus('Estas en la network' + chain.name + '. Al intentar pagar te solicitaremos cambiar a ' + selectedMethod?.chain_id.toString() + ' para poder realizar el pago en el token seleccionado')
        },
        onSuccess(data) {
            setChainOk(selectedMethod?.chain_id == chain.id)
            dispatch(setBtnDisabled(false))
            dispatch(resetToast())
        },
    })


    const { data, isLoading: isLoadingPay, isSuccess: isSuccessPay, write } = useContractWrite({
        ...config, onSuccess(data) {
            dispatch(setToast({ message: 'La transaccion esta en proceso', status: '', loading: true, show: true }))
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
    const handleNetworkChange = () => {
        if (!chainOk) {
            switchNetwork(selectedMethod?.chain_id)
        }
    }
    const handleClick = () => {
        if (chainOk) {
            write?.()
        }
    }
    useEffect(() => isloadingNetwork ? setStatus('Estamos esperando que aceptes la solicitud de cambio de Network en tu wallet') : undefined, [isloadingNetwork]);
    useEffect(() => isLoadingPay ? setStatus('Estamos esperando que firmes la transaccion en tu wallet') : undefined, [isLoadingPay]);
    const { dataWait, isErrorWait, isLoadingWait } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(d) {
            router.push(`/success/${d.transactionHash}`)
            // setStatus('La transaccion fue correctamente procesada con hash:' + d.transactionHash)
        },
    })
    console.log('la chain esta ok?', chainOk)
    return (
        <>
            <button className={`text-white px-7 font-semibold rounded-md ${chainOk ? 'bg-stone-400' : 'bg-green-1'}`} disabled={chainOk} onClick={handleNetworkChange}>
                Cambiar Network
            </button>
            <button className={`text-white px-7 font-semibold rounded-md ${btn_disabled ? 'bg-stone-400' : 'bg-green-1'}`} disabled={btn_disabled} onClick={handleClick}>
                {text}
            </button>
        </>
    )
}

const FooterPay = ({ btn_msg }) => {
    const { fiat_amount } = useSelector(state => state.order)
    const dispatch = useDispatch()
    const { step } = useSelector(state => state.interactions)
    //TODO agregar que si el usuario desconecta su wallet vuelve al paso anterior
    return (
        <div className='bg-stone-100 py-5 px-7 flex flex-row justify-between fixed bottom-0 w-full max-w-md'>
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