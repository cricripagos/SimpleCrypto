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

  const isCustomProtocolSupported = (protocol, onSuccess, onFailure) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = protocol;

    const timeout = setTimeout(() => {
      onFailure();
      cleanUp();
    }, 1000);

    iframe.onload = () => {
      clearTimeout(timeout);
      onSuccess();
      cleanUp();
    };

    iframe.onerror = () => {
      clearTimeout(timeout);
      onFailure();
      cleanUp();
    };

    function cleanUp() {
      document.body.removeChild(iframe);
    }

    document.body.appendChild(iframe);
  };

  const generateInvoice = async () => {
    const promise = await fetch("/api/btcGenerateInvoice", {
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
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          console.log(data);
          const inv = {
            invoice: data.payment_request,
            hash: Buffer.from(data.r_hash).toString("hex"),
          };
          return inv;
        } catch (e) {
          return console.log(e);
        }
      });
    return promise;
  };

  const checkInvoice = async (payment_request) => {
    console.log("Running Check invoice");
    const invoice = { invoice: payment_request };

    const dataInvoiceStream = await fetch("/api/btcCheckInvoice", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(invoice),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          console.log("entro aca ", data);
          const d = data;
          const inv = {
            settled: d.settled,
            address: Buffer.from(d.payment_addr).toString("hex"),
          };
          return inv;
        } catch (e) {
          return console.log("There was an error", e);
        }
      });

    if (dataInvoiceStream.settled === true) {
      return dataInvoiceStream;
    } else {
      return false;
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
          txHash: invoice.hash,
        });

        const customProtocol = "lightning://";
        const redirectTo = customProtocol + invoice.invoice;

        isCustomProtocolSupported(
          customProtocol,
          () => {
            // Redirect to the custom protocol URL
            router.push(redirectTo);
          },
          () => {
            // Stay on the same page (or take any other action if the protocol is not supported)
            console.log("Custom protocol not supported");
          }
        );
        setBtnLoading(false);
      }
    }
  };

  return {
    generateAttempt,
    checkInvoice,
  };
}
