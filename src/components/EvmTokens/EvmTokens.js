import { useGetBalances } from "@/helpers/hooks/useGetBalances";
import { formatUnits } from "ethers/lib/utils.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CryptoCard, Spinner } from "../components";

const EvmTokens = () => {
  const { payment } = useSelector((state) => ({
    payment:
      process.env.NEXT_PUBLIC_ENV !== "prod"
        ? state.options.payment.filter((item) => item.evm === true)
        : state.options.payment.filter(
            (item) =>
              item.evm === true &&
              item.name !== "MATIC (Testing)" &&
              item.name !== "DOC (Dollar on Chain)"
          ),
  }));
  const { fiat_amount } = useSelector((state) => state.order);
  const balanceData = useGetBalances(payment);
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    console.log("BALANCE DATA", balanceData);
    if (balanceData?.dataWithId !== undefined) {
      let balance;
      let temp_payments = payment.map((item) => {
        try {
          balance = balanceData.dataWithId.filter(
            (balanceItem) => balanceItem[1] === item.id
          )[0][0];
        } catch (err) {
          console.log(err);
          balance = 0;
        }
        const balance_toNum = balance ? formatUnits(balance, item.decimals) : 0;
        const amount = (fiat_amount / item.price).toPrecision(6);
        // const amount_in_fn = FixedNumber.from((fiat_amount / item.price).toPrecision(6))
        //TODO esta funcion enrealidad esta mal, hay que adaptar el balance para que se pase de wei a Eth. Creo que con formatEth sale
        const enough_balance = parseFloat(balance_toNum) >= parseFloat(amount);
        // console.log(balance_toNum, amount, enough_balance)

        return { ...item, balance, enough_balance };
      });
      temp_payments.sort((a, b) => {
        return b.enough_balance - a.enough_balance;
      });
      setPaymentInfo(temp_payments);
      setLoading(false);
    }
  }, [balanceData]);

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : (
        paymentInfo?.map((item, index) => {
          // const balance = balanceData.data && balanceData.data[index]
          // const currency = {...item, balance: balance}
          // contract = {...contract, balance: balance}
          // const contract = {balance:1203, contract:'aaaa'}
          return <CryptoCard {...item} key={index} />;
        })
      )}
      {/* <CardWrapper balanceData={balanceData} contracts={contracts} /> */}
    </div>
  );
};

export default EvmTokens;
