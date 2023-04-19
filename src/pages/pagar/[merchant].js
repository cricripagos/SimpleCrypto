import { useRouter } from "next/router";
// import { PageWrapper } from "../components/components";
import { useDispatch, useSelector } from "react-redux";
import { PageWrapper, Spinner } from "../components/components";
import WagmiWrapper from "../components/WalletConnectComponents/WagmiWrapper";
import { Step1, Step2, Step3 } from "./pagar";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { setStepBackward, setStepForward } from "../store/reducers/interactions";
import useSupabase, {supabase} from "@/helpers/hooks/useSupabase";
import { avgPrice } from "@/helpers/quotes";
import { setPaymentOptions } from "../store/reducers/options";
import { setMerchant } from "../store/reducers/merchant";


const Pagar = ({payment_options, merchant}) => {
  const router = useRouter();
  // const { merchant } = router.query;
  const { step } = useSelector(state => state.interactions)
  const { address } = useAccount();
  const dispatch = useDispatch()
  const {getMerchant, getNetworks} = useSupabase()
  const [data, setData] = useState(false)

  const getData = async () => {
    // await getMerchant(merchant)
    await getNetworks()
    dispatch(setPaymentOptions(payment_options))
    dispatch(setMerchant(merchant))
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

export async function getServerSideProps(context) {
  const slug = context.params.merchant;
  // Traemos los datos de la tabla payment_options
  // const data = await getPaymentMethods()
  let payment_options= await supabase.from("payment_options").select();
  let merchant = await supabase.from('merchants').select().eq('slug', slug)


  for (const [idx, coin] of payment_options.data.entries()) {
    payment_options.data[idx].price = await avgPrice(coin.symbol);
  }


  return {
    props: {
      payment_options: payment_options.data,
      merchant: merchant.data[0]
    },
  };
}
