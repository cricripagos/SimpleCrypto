import Stablecoins from "@/components/WalletConnectComponents/Stablecoins";
import StepWrapper from "@/components/Wrappers/StepWrapper";
import { asyncCallWithTimeout } from "@/helpers/helpers";
import usePayBTC from "@/helpers/hooks/usePayBTC";
import useSupabase from "@/helpers/hooks/useSupabase";
import useVisibilityChange from "@/helpers/hooks/useVisibilityChange";
import useWhatsApp from "@/helpers/hooks/useWhatsApp";
import {
  setBtnDisabled,
  setBtnLoading,
  setStepForward,
  setToast,
} from "@/store/reducers/interactions";
import { CryptoCard, Footer, Header } from "@components/components";
import { Web3Button } from "@web3modal/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

const Step2 = () => {
  const { address } = useAccount();
  const dispatch = useDispatch();
  const { payment } = useSelector((state) => state.options);
  const { payment_method } = useSelector((state) => state.order);
  const { invoice } = useSelector((state) => state.interactions);
  const { checkInvoice } = usePayBTC();
  const { sendReceipt } = useWhatsApp();
  const { updatePayment } = useSupabase();
  const router = useRouter();
  const [autoRedirect, setAutoRedirect] = useState(false);
  // Aqui se deben de cambiar los endpoints y lógica
  // para que escuche la transacción en BTC y EVM
  const handleVisibilityHidden = () => {
    fetch("/api/visibility/hidden");
  };

  const handleVisibilityVisible = () => {
    fetch("/api/visibility/visible");
  };

  useVisibilityChange(handleVisibilityHidden, handleVisibilityVisible);

  useEffect(() => {
    if (address == undefined) setAutoRedirect(true);
    if (address !== undefined) {
      if (autoRedirect) dispatch(setStepForward());
    }
  }, [address]);

  useEffect(() => {
    if (address !== undefined || payment_method !== null) {
      dispatch(setBtnDisabled(false));
    } else {
      dispatch(setBtnDisabled(true));
    }
  }, [payment_method, address]);

  const awaitInvoice = async () => {
    try {
      //MODIFICAR el numero en base al timepo que se quiere "esperar" una respuesta del usuario
      const uuid = invoice.uuid;
      const i = await asyncCallWithTimeout(
        checkInvoice(invoice.invoice),
        20000
      );

      // const i = await checkInvoice(invoice.invoice)
      console.log("Invoice is, ", i);
      if (i) {
        //Successfully Paid
        console.log("Successfully paid", i);
        sendReceipt(i.address);
        await updatePayment({
          attempt: uuid,
          status: "success",
          userAddress: i.address,
        });
        router.push(`/success/${i.address}`);
        dispatch(
          setToast({
            message: "Successfully paid",
            status: "success",
            loading: false,
            show: true,
          })
        );
      } else {
        //Not paid

        dispatch(
          setToast({
            message:
              "Hubo un error, tu transaccion, no ha sido pagada (Not paid) ",
            status: "error",
            loading: false,
            show: true,
          })
        );
      }
    } catch (e) {
      dispatch(
        setToast({
          message: `${e.message}`,
          status: "error",
          loading: false,
          show: true,
        })
      );
      dispatch(setBtnDisabled(false));
      dispatch(setBtnLoading(false));
    }
  };

  useEffect(() => {
    if (invoice) {
      //Run check invoice transaction
      awaitInvoice();
    }
  }, [invoice]);

  return (
      <StepWrapper>
        {/*invoice && <Modal />*/}
        <div className="flex bg-green-1 rounded-b-lg justify-center items-center flex-col pb-5 px-7 flex-1/3">
          <Header />
        </div>
        <div className="px-7 flex flex-col items-center w-full flex-1/4 overflow-scroll
        overflow-x-hidden scrollbox">
          <p className="text-lg font-semibold pt-3 text-center">Conecta tu wallet y paga con Stable coins</p>
          <Stablecoins />
          <Web3Button balance="show" icon="show" />
          <p className="text-lg font-semibold py-2">O paga con</p>
          {payment
            .filter((item) => item.evm === false)
            .sort(function (a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
            .map((item, index) => {
              return <CryptoCard {...item} key={index} />;
            })}
        </div>
        <Footer />
        </StepWrapper>
  );
};

export default Step2;
