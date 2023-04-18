import { useRouter } from "next/router";
// import { PageWrapper } from "../components/components";
import { useDispatch, useSelector } from "react-redux";
import { PageWrapper, Spinner } from "../components/components";
import WagmiWrapper from "../components/WalletConnectComponents/WagmiWrapper";
import { Step1, Step2, Step3 } from "./pagar";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { setStepBackward, setStepForward } from "../store/reducers/interactions";
import useSupabase from "@/helpers/hooks/useSupabase";

const Pagar = () => {
  const router = useRouter();
  const { merchant } = router.query;
  const { step } = useSelector(state => state.interactions)
  const { address } = useAccount();
  const dispatch = useDispatch()
  const {getMerchant, getPaymentMethods, getNetworks} = useSupabase()
  const [data, setData] = useState(false)

  const getData = async () => {
    await getMerchant(merchant)
    await getPaymentMethods()
    await getNetworks()
  }

  useEffect(() => {
    //Get intial data
    getData()
    setTimeout(() => {
    setData(true)
    }, 3000)
  }, [])


  const stepper = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        if (address == undefined) {
          dispatch(setStepBackward())
          return <Step2 />
        }
        if (address !== undefined) return <Step3 />
        
    }
  }

  //TODO Fetch Merchant data

  return (
    <WagmiWrapper>
      <PageWrapper>
        {!data ? <Spinner size={2} color='text-green-1' /> :
        stepper()
} 
      </PageWrapper>
    </WagmiWrapper>
  );
};

export default Pagar;
