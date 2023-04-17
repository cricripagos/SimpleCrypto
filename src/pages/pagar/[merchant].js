import { useRouter } from "next/router";
// import { PageWrapper } from "../components/components";
import { useSelector } from "react-redux";
import { PageWrapper } from "../components/components";
import { Step1, Step2 } from "./pagar";

const Pagar = () => {
  const router = useRouter();
  const { merchant } = router.query;
  console.log(router.query);
  const {step} = useSelector(state => state.interactions)
  const stepper = () => {
    switch (step) {
      case 1:
        return <Step1/>;
      case 2:
        return <Step2/>;
      case 3:
        return <div>Step 3</div>;
    }
  }
  
  //TODO Fetch Merchant data

  return (
    <PageWrapper>
      {stepper()}
      
    </PageWrapper>
  );
};

export default Pagar;
