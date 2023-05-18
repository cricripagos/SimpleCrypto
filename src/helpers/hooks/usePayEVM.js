import sendReceipt from "@/pages/api/sendReceipt";
import { resetToast, setBtnDisabled, setBtnText, setToast } from "@/store/reducers/interactions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { erc20ABI, useContractWrite, useNetwork, usePrepareContractWrite, useSwitchNetwork, useWaitForTransaction } from "wagmi";
import { formatAmountParse } from "../helpers";
import useSupabase from "./useSupabase";

//Constant Variables = Testing

const selectedMethod = {
    decimals: 10,
}

const keys = {

}

export default function usePayEVM() {
    //Payment method selected by user
    const { payment_method, crypto_amount } = useSelector((state) => state.order);
    //Existing payment options & merchant
    const { payment } = useSelector((state) => state.options);
    const { keys } = useSelector((state) => state.merchant);
    const selectedMethod = payment.find((item) => item.id === payment_method);
    //States
    const [chainOk, setChainOk] = useState(null); 
    //Redux
    const dispatch = useDispatch()
    //Wagmi
    const { chain } = useNetwork();
    const { isLoading: isloadingNetwork, switchNetwork } = useSwitchNetwork();
    //Supabase
    const { createPayment, updatePayment } = useSupabase(); 
    //Navigation
    const router = useRouter();
    //configuration



    //Pay EVM funct

    //Prepare config for contract
    const { config, error } = usePrepareContractWrite({
        address: selectedMethod?.contract_address,
        abi: erc20ABI,
        functionName: "transfer",
        args: [keys?.key_evm, formatAmountParse(crypto_amount, selectedMethod?.decimals)],
        chainId: selectedMethod?.chain_id,
        onError(error) {
          const e = error?.message;
          const chainError = "Chain mismatch";
          if (e.includes(chainError)) {

            //If chains do not match run an alert message
            setChainOk(false);
            dispatch(setBtnDisabled(false));
            dispatch(setBtnText('Cambiar network'))
            dispatch(
              setToast({
                message: `Estas en la network ${
                  chain.name
                }. Al intentar pagar te solicitaremos cambiar a ${selectedMethod?.chain_id.toString()} para poder realizar el pago en el token seleccionado`,
                status: "warning",
                loading: false,
                show: true,
              })
            );
          } else {
            console.log("otro error", error.message);
          }
          // setStatus('Estas en la network' + chain.name + '. Al intentar pagar te solicitaremos cambiar a ' + selectedMethod?.chain_id.toString() + ' para poder realizar el pago en el token seleccionado')
        },
        onSuccess() {
          setChainOk(selectedMethod?.chain_id == chain.id);
          dispatch(setBtnText('Pagar'))
          dispatch(setBtnDisabled(false));
          dispatch(resetToast());
        },
      });

      if (error){
        console.log('error', error)
      }

      const {
        data,
        isLoading: isLoadingPay,
        isSuccess: isSuccessPay,
        write,
      } = useContractWrite({
        ...config, //Pass configuration Data
        async onSuccess(data) {
          console.log("data------", data.hash);

          //Run payment creation function - supabase
          const { uuid } = await createPayment({
            crypto_amount: crypto_amount,
            payment_option: payment_method,
            transaction_hash: data.hash,
          });
          // Agregamos el identificador
          data.uuid = uuid;
          dispatch(
            setToast({
              message: "La transaccion esta en proceso",
              status: "warning",
              loading: true,
              show: true,
            })
          );
          // setStatus('La transaccion esta en proceso')
        },
      });

      const handleNetworkChange = () => {
        if (!chainOk) {
          switchNetwork(selectedMethod?.chain_id);
        }
      };

      const { dataWait } = useWaitForTransaction({
        hash: data?.hash,
        async onSuccess(d) {
          await updatePayment({
            attempt: data.uuid,
            status: "success",
          });
          sendReceipt(d.transactionHash);
    
          router.push(`/success/${d.transactionHash}`);
          // setStatus('La transaccion fue correctamente procesada con hash:' + d.transactionHash)
        },
      });

    const payEVM = () => {
        //Check if chain is ok
        if(chainOk){
          write();
        }
    }

    useEffect(() => {
      if (isloadingNetwork) {
        dispatch(
          setToast({
            message:
              "Estamos esperando que aceptes la solicitud de cambio de Network en tu wallet",
            status: "",
            loading: true,
            show: true,
          })
        );
      }
    }, [isloadingNetwork]);

    useEffect(() => {
      if (isLoadingPay) {
        dispatch(
          setToast({
            message:
              "Estamos esperando que firmes la transaccion en tu wallet",
            status: "",
            loading: true,
            show: true,
          })
        );
      }
    }, [isLoadingPay]);

    useEffect(() => {
      if(payment_method === null){
        dispatch(resetToast())
      }
    }, [payment_method])

    return {
        payEVM,
        chainOk,
        handleNetworkChange
    }
}