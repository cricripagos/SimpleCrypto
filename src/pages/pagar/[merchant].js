import { useRouter } from "next/router";
// import { PageWrapper } from "../components/components";
import { useSelector } from "react-redux";
import { PageWrapper } from "../components/components";
import WagmiWrapper from "../components/WalletConnectComponents/WagmiWrapper";
import { Step1, Step2, Step3 } from "./pagar";

const Pagar = () => {
  const router = useRouter();
  const { merchant } = router.query;
  const { step } = useSelector(state => state.interactions)
  const stepper = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
    }
  }

  //TODO Fetch Merchant data

  return (
    <WagmiWrapper>
      <PageWrapper>
        {stepper()}

      </PageWrapper>
    </WagmiWrapper>
  );
};

export default Pagar;
