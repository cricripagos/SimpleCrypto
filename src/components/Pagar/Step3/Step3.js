import Toast from "@/components/Toast/Toast";
import StepWrapper from "@/components/Wrappers/StepWrapper";
import { setBtnDisabled } from "@/store/reducers/interactions";
import { EvmTokens, Footer, Header } from "@components/components";
import { Web3Button } from "@web3modal/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

const Step3 = () => {
  const { payment_method } = useSelector((state) => state.order);
  const { address } = useAccount();
  const { toast } = useSelector((state) => state.interactions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (address !== undefined && payment_method !== null) {
      dispatch(setBtnDisabled(false));
    } else {
      dispatch(setBtnDisabled(true));
    }
  }, [payment_method, address]);

  return (
    <StepWrapper>
        <div className="flex bg-green-1 rounded-b-lg justify-center items-center flex-col pb-5 px-7 flex-1/3">
          <Header />
        </div>
        <div
          className="flex flex-col h-full overflow-scroll overflow-x-hidden overflow-y-scroll scrollbar-hide px-7 py-3 scrollbox flex-1/3"
        >
          <Web3Button balance="show" icon="show" />
          <EvmTokens />
        </div>
        {toast.show && <Toast />}
        <Footer />
        {/* <FooterPay btn_msg="Pagar" /> */}
    </StepWrapper>
  );
};

export default Step3;
