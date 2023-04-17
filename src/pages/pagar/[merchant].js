import { Web3Button } from "@web3modal/react";
import { useRouter } from "next/router";

const Pagar = () => {
  const router = useRouter();
  const { merchant } = router.query;
  console.log(router.query);

  // Fetch data or perform operations based on the dynamicSlug value
  // ...

  return (
    <div>
      <h1>Pagar: {merchant}</h1>
      {/* Render your component or data here */}
      <Web3Button balance="show" icon="show" />
    </div>
  );
};

export default Pagar;
