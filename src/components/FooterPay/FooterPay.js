import useSupabase from "@/helpers/hooks/useSupabase";
import useWhatsApp from "@/helpers/hooks/useWhatsApp";
import {
  resetToast,
  setBtnDisabled,
  setStepBackward,
  setToast,
} from "@/store/reducers/interactions";
import { parseEther } from "ethers/lib/utils.js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  erc20ABI,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi";
import Button from "../Buttons/Button";

const PayButton = ({ text }) => {
  const [chainOk, setChainOk] = useState(null);
  const { btn_disabled } = useSelector((state) => state.interactions);
  const [triggerAfterSwitch, setTriggerAfterSwitch] = useState(false);
  //Payment method selected by user
  const { payment_method, crypto_amount } = useSelector((state) => state.order);
  //Existing payment options & merchant
  const { payment } = useSelector((state) => state.options);
  const { keys } = useSelector((state) => state.merchant);
  const selectedMethod = payment.find((item) => item.id === payment_method);
  // Este deberia cambiarse por hook a store, pero tambien se tiene que editar a medida que sucedan cosas para que se renderize en otro componente
  const [status, setStatus] = useState("");
  //Create payment attempt
  const { createPayment } = useSupabase();
  const { sendReceipt } = useWhatsApp();
  const dispatch = useDispatch();
  const router = useRouter();
  const { chain } = useNetwork();
  const { isLoading: isloadingNetwork, switchNetwork } = useSwitchNetwork();
  // Este Hook me mantiene actualizado lo que quiero hacer en el contrato
  const formated_amount = crypto_amount
    ? parseEther(crypto_amount.toString().slice(0, 18).toString())
    : 0;
  const { config } = usePrepareContractWrite({
    address: selectedMethod?.contract_address,
    abi: erc20ABI,
    functionName: "transfer",
    args: [keys?.key_evm, formated_amount],
    chainId: selectedMethod?.chain_id,
    onError() {
      setChainOk(false);
      dispatch(setBtnDisabled(true));
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
      // setStatus('Estas en la network' + chain.name + '. Al intentar pagar te solicitaremos cambiar a ' + selectedMethod?.chain_id.toString() + ' para poder realizar el pago en el token seleccionado')
    },
    onSuccess() {
      setChainOk(selectedMethod?.chain_id == chain.id);
      dispatch(setBtnDisabled(false));
      dispatch(resetToast());
    },
  });

  const paymentCreation = async (data) => {
    await createPayment(data);
  };

  const {
    data,
    isLoading: isLoadingPay,
    isSuccess: isSuccessPay,
    write,
  } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log("data------", data.hash);
      paymentCreation({
        crypto_amount: crypto_amount,
        payment_option: payment_method,
        transaction_hash: data.hash,
      });
      dispatch(
        setToast({
          message: "La transaccion esta en proceso",
          status: "",
          loading: true,
          show: true,
        })
      );
      console.log("Is success", isSuccessPay);
      // setStatus('La transaccion esta en proceso')
    },
  });
  useEffect(() => {
    if (triggerAfterSwitch) {
      write?.();
      setTriggerAfterSwitch(false);
    }
  }, [chain.id, selectedMethod?.chain_id, triggerAfterSwitch, write]);
  const handleNetworkChange = () => {
    if (!chainOk) {
      switchNetwork(selectedMethod?.chain_id);
    }
  };
  const handleClick = async () => {
    if (chainOk) {
      write?.();
    }
  };
  useEffect(
    () =>
      isloadingNetwork
        ? setStatus(
            "Estamos esperando que aceptes la solicitud de cambio de Network en tu wallet"
          )
        : undefined,
    [isloadingNetwork]
  );
  useEffect(
    () =>
      isLoadingPay
        ? setStatus("Estamos esperando que firmes la transaccion en tu wallet")
        : undefined,
    [isLoadingPay]
  );
  const { dataWait } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(d) {
      sendReceipt(d.transactionHash);

      router.push(`/success/${d.transactionHash}`);
      // setStatus('La transaccion fue correctamente procesada con hash:' + d.transactionHash)
    },
  });
  console.log("dataWait", dataWait);
  console.log(status);
  return (
    <>
      {chainOk === false ? (
        <button
          className={`text-white px-7 font-semibold rounded-md ${
            chainOk ? "bg-stone-400" : "bg-green-1"
          }`}
          disabled={chainOk}
          onClick={handleNetworkChange}
        >
          Cambiar Network
        </button>
      ) : (
        <button
          className={`text-white px-7 font-semibold rounded-md ${
            btn_disabled ? "bg-stone-400" : "bg-green-1"
          }`}
          disabled={btn_disabled}
          onClick={handleClick}
        >
          {text}
        </button>
      )}
    </>
  );
};

const FooterPay = ({ btn_msg }) => {
  const { fiat_amount } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  //TODO agregar que si el usuario desconecta su wallet vuelve al paso anterior
  return (
    <div className="bg-stone-100 py-5 px-7 flex flex-row justify-between fixed bottom-0 w-full max-w-md">
      <div>
        <p className="font-bold">Orden: #001</p>
        <p>{fiat_amount} ARS($)</p>
      </div>
      <div className="flex">
        <Button
          text="Volver"
          filled={false}
          onClick={() => dispatch(setStepBackward())}
        />
        <PayButton filled={true} text={btn_msg} />
      </div>
    </div>
  );
};

export default FooterPay;
