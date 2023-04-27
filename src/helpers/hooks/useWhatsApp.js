import { useSelector } from "react-redux";

export default function useWhatsApp() {
  const { fiat_amount, crypto_amount, payment_method } = useSelector(
    (state) => state.order
  );
  const { name } = useSelector((state) => state.merchant);

  const sendReceipt = async (transaction_hash) => {
    const receipt = {
      amount: fiat_amount,
      crypto_amount: crypto_amount,
      merchant: name,
      txHash: transaction_hash,
      payment_option: payment_method,
    };

    const dataReceipt = await fetch("/api/sendReceipt", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(receipt),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          const res = data;
          return res;
        } catch (e) {
          return console.log(e);
        }
      });
    return dataReceipt;
  };

  return {
    sendReceipt,
  };
}
