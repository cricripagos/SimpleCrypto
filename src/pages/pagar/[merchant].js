import { useRouter } from "next/router";
import { Provider } from "react-redux";
// import { PageWrapper } from "../components/components";
import { PageWrapper } from "../components/components";
import { store } from "../store/store";
import { Step1 } from "./pagar";

const Pagar = () => {
  const router = useRouter();
  const { merchant } = router.query;
  console.log(router.query);
  

  // Fetch data or perform operations based on the dynamicSlug value
  // ...

  return (
    <Provider store={store}>
    <PageWrapper>
      <Step1 />
      
    </PageWrapper>
    </Provider>
  );
};

export default Pagar;
