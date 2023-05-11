import usePendingAttempts from "@/helpers/hooks/usePendingAttempts";
import { setBtnLoading, setInvoice } from "@/store/reducers/interactions";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { requestProvider } from "webln";
import useSupabase from "./useSupabase";

export default function usePayBTC() {
  const { createPayment, updatePayment } = useSupabase();
  const { crypto_amount, payment_method } = useSelector((state) => state.order);
  const { name } = useSelector((state) => state.merchant);
  const router = useRouter();
  const dispatch = useDispatch();
  const { setUUID } = usePendingAttempts();

  const generateInvoice = async () => {
    try {
      const response = await fetch("/api/btcGenerateInvoice", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify({
          crypto_amount: crypto_amount,
          merchant: name,
        }),
      });

      const data = await response.json();
      const inv = {
        invoice: data.payment_request,
        hash: Buffer.from(data.r_hash).toString("hex"),
      };
      return inv;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const checkInvoice = async (payment_request) => {
    try {
      console.log("Running Check invoice");
      const invoice = { invoice: payment_request };

      const response = await fetch("/api/btcCheckInvoice", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify(invoice),
      });

      const data = await response.json();
      const inv = {
        settled: data.settled,
        address: Buffer.from(data.payment_addr).toString("hex"),
      };

      return inv;
    } catch (e) {
      console.log("There was an error", e);
      return false;
    }
  };

  const checkPendingInvoices = async () => {
    const pendingUUIDs = await getPendingUUIDs(); // Implement this function to get all UUIDs with a pending status

    for (const uuid of pendingUUIDs) {
      const payment_request = await getPaymentRequestByUUID(uuid); // Implement this function to get the payment_request for a given UUID

      if (payment_request) {
        const settled = await checkInvoice(payment_request);

        if (settled) {
          // Update the payment status in the database
          await updatePayment({
            attempt: uuid,
            status: "success",
          });
        }
      }
    }
  };

  const getWalletProvider = async () => {
    try {
      let provider = await requestProvider();
      return provider;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };

  const generateAttempt = async () => {
    dispatch(setBtnLoading(true));
    console.log("Generating invoice........", crypto_amount, payment_method);
    const { uuid } = await createPayment({
      crypto_amount: crypto_amount,
      payment_option: payment_method,
    });
    const invoice = await generateInvoice();

    console.log("Information gathered is", uuid, invoice);

    // ERROR HANDLERS
    if (!uuid) {
      //ERROR: en la creacion de la DB
      alert("Hubo un error al generar tu pago, vuelve a intentar.");
      setBtnLoading(false);
      return;
    }

    invoice.uuid = uuid;
    setUUID(uuid);

    if (!invoice.invoice || !invoice.hash) {
      //ERROR: en la creaction de un invoice
      const update = updatePayment({
        attempt: uuid,
        status: "failed",
      });
      console.log(update);
      alert("Hubo un error al generar tu pago, vuelve a intentar.");
      dispatch(setBtnLoading(false));
      return;
    } else {
      // const wallet = await getWalletProvider();
      const wallet = false;
      if (wallet) {
        try {
          const sendPaymentResponse = await wallet.sendPayment(invoice.invoice);
          console.log(sendPaymentResponse);
        } catch (e) {
          alert("Error", e);
          dispatch(setBtnLoading(false));
        }
      } else {
        dispatch(setInvoice(invoice));
        await updatePayment({
          attempt: uuid,
          status: "pending",
          txHash: invoice.invoice,
        });
        //Open wallet
        router.push("lightning://" + invoice.invoice);
        setBtnLoading(false);
      }
    }
  };

  return {
    generateAttempt,
    checkInvoice,
    checkPendingInvoices,
  };
}
