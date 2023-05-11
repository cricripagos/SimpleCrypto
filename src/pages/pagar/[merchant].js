import useSupabase, { supabase } from "@/helpers/hooks/useSupabase";
import { avgPrice } from "@/helpers/quotes";
import { setStepBackward } from "@/store/reducers/interactions";
import { setMerchant } from "@/store/reducers/merchant";
import { setPaymentOptions } from "@/store/reducers/options";
import Toast from "@components/Toast/Toast";
import WagmiWrapper from "@components/WalletConnectComponents/WagmiWrapper";
import { PageWrapper, Spinner } from "@components/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { Step1, Step2, Step3 } from "@components/Pagar/pagar";

const Pagar = ({ payment_options, merchant }) => {
  const { getNetworks } = useSupabase();
  const [loading, setLoading] = useState(true);
  const { step, toast } = useSelector((state) => state.interactions);
  const { address } = useAccount();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPaymentOptions(payment_options));
    dispatch(setMerchant(merchant));
    getNetworks()
    setLoading(false)
  }, []);
  

  const stepper = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        if (address == undefined) {
          dispatch(setStepBackward());
          return <Step2 />;
        } else {
          return <Step3 />
        }
    }
  };

  return (
    <WagmiWrapper>
      <PageWrapper>
        {loading ? (
          <Spinner size={2} color="text-green-1" />
        ) : (
          <div className="relative flex w-full overflow-x-hidden">
            {stepper()}
            {toast.show && <Toast />}
          </div>
        )}
      </PageWrapper>
    </WagmiWrapper>
  );
};

export default Pagar;

export async function getServerSideProps(context) {
  const slug = context.params.merchant;
  let payment_options = await supabase.from("payment_options").select();
  let merchant = await supabase.from("merchants").select().eq("slug", slug);
  for (const [idx, coin] of payment_options.data.entries()) {
    payment_options.data[idx].price = await avgPrice(coin.symbol);
  }
  return {
    props: {
      payment_options: payment_options.data,
      merchant: merchant.data[0],
    },
  };
}
