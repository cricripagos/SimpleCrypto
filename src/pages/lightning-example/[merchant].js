import { useState } from "react";
import QRCode from "react-qr-code";
import { requestProvider } from "webln";

var Promise = require("promise");

const App = () => {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [invoice, setInvoice] = useState("");
  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setAmount(result);
  };

  function getCurrentURL() {
    const url = window.location.href;
    const merchant = url.substr(url.lastIndexOf("/") + 1);
    return merchant;
  }

  const sleep = (ms) => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
    return promise;
  };

  const updateAttempt = async (attempt) => {
    const payload = {
      attempt: attempt.attemptUuid,
      status: attempt.paymentStatus,
      txHash: attempt.transactionHash,
      userAddress: attempt.userAddress,
    };

    await fetch("/api/updatePaymentAttempt", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(payload),
    });
  };

  const isInvoicePaid = async (payment_request) => {
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
          const inv = {
            settled: data.settled,
            address: Buffer.from(data.payment_addr).toString("hex"),
          };
          return inv;
        } catch (e) {
          return console.log(e);
        }
      });

    if (dataInvoiceStream.settled === true) {
      setIsPaid(true);
      return dataInvoiceStream;
    }
  };

  const generateInvoice = async () => {
    // Validamos el monto.
    if (amount.length == 0) {
      alert("Ingresa una cantidad");
      return;
    }

    // Create payment attempt
    const attemptUuid = await fetch("/api/createPaymentAttempt", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({
        merchant: 3,
        fiat_amount: amount,
        crypto_amount: amount,
        payment_option: 2,
        expiration_date: null,
        userAddress: null,
        transactionHash: null,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          const att = data[0].uuid;
          return att;
        } catch (e) {
          return console.log(e);
        }
      });

    /* La unica forma de actualizar el status del payment attempt
    es teniendo el identificador a la mano. Si no lo hay, rechazamos
    el pago.*/

    if (!attemptUuid) {
      alert("Hubo un error al generar tu pago, vuelve a intentar.");
      return;
    }

    // Get wallet provider
    let webln;
    try {
      webln = await requestProvider();
    } catch (err) {
      //El alert deberia ser un modal.
      /*
      alert(
        "No encontramos tu wallet de Lightning. \
        Da click en el enlace\
        o copia y pega la factura para pagar."
      );*/
      console.log(err.message);
    }

    console.log("Generating invoice...");

    // Set loading has started
    setIsProcessing(true);

    const mer = getCurrentURL();

    const fact = await fetch("/api/btcGenerateInvoice", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({ crypto_amount: amount, merchant: mer }),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          const inv = {
            invoice: data.payment_request,
            hash: Buffer.from(data.r_hash).toString("hex"),
          };
          return inv;
        } catch (e) {
          return console.log(e);
        }
      });

    const attempt = {
      attemptUuid: attemptUuid,
      paymentStatus: "pending",
      transactionHash: "",
      userAddress: "",
    };

    /* Si no se pudo generar la factura, rechazamos el pago. */
    if (!fact.invoice || !fact.hash) {
      attempt.paymentStatus = "failed";
      updateAttempt(attempt);
      setIsProcessing(false);
      setAmount("");
      alert("Hubo un error al generar tu pago, vuelve a intentar.");
      return;
    }
    console.log("Invoice generated!");

    setInvoice(fact.invoice);
    attempt.transactionHash = fact.hash;

    if (webln) {
      try {
        const sendPaymentResponse = await webln.sendPayment(fact.invoice);
        console.log(sendPaymentResponse);
      } catch (e) {
        console.log(e.message);
        if (e.message == "User rejected") {
          attempt.paymentStatus = "rejected";
          updateAttempt(attempt);
          alert("El usuario cancelo la transacción");
        }
      }
    }
    // Esperamos 10 segundos para simular que el pago se esta procesando
    console.log("Waiting for payment to be processed...");
    console.log(fact.invoice);
    const confirm = await isInvoicePaid(fact.invoice);
    console.log("Payment pro!");

    //await sleep(50000);
    /*
    Aqui se deberia hacer una consulta a la red de Lightning o Ethereum para
    verificar si el pago fue exitoso. 
    */
    if (confirm.settled == true) {
      console.log("Payment processed!");
      attempt.paymentStatus = "success";
      attempt.userAddress = confirm.address;
      console.log(attempt);
      updateAttempt(attempt);
      const merchant = getCurrentURL();
      await fetch("/api/sendReceipt", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify({
          amount: amount,
          merchant: merchant,
          txHash: fact.hash,
        }),
      });
    }
    // Esperamos 7 segundos para que el usuario vea que ya paso el pago

    await sleep(7000);
    setIsProcessing(false);
    setInvoice("");
    setIsPaid(false);
    setAmount("");
  };

  return (
    <>
      <div>
        <div>
          <h1>Cantidad en satoshis a pagar:</h1>
        </div>
        <br></br>
        <input
          type="text"
          placeholder="Ingresa la cantidad"
          value={amount}
          onChange={handleChange}
        />
        <br></br>
      </div>
      <br></br>
      {amount.length > 0 && (
        <div>
          <p>Total en Satoshis: {amount}</p>
        </div>
      )}
      <br></br>
      <div>
        <a onClick={generateInvoice}>
          {/* Tweak to show a loading indicator */}
          <div>
            {isProcessing ? (
              <p className="text-red-500">Procesando</p>
            ) : (
              <p className="text-sky-500 hover:text-sky-600">Pagar</p>
            )}
          </div>
        </a>
      </div>
      <br></br>
      {invoice.length > 0 ? (
        <>
          {isPaid ? (
            <p className="text-green-500">Pagado</p>
          ) : (
            <p className="text-red-500">Pendiente</p>
          )}
          <br></br>
          <a href={"lightning://" + invoice}>
            {/* Tweak to show a loading indicator */}
            <div>
              <p className="text-sky-500 hover:text-sky-600">
                Click para abrir tu wallet
              </p>
            </div>
          </a>
          <br></br>
          <textarea
            style={{ resize: "none" }}
            rows="9"
            cols="32"
            value={invoice}
            readOnly
            onClick={() => navigator.clipboard.writeText(invoice)}
          ></textarea>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 200,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"lightning://" + invoice}
              viewBox={`0 0 256 256`}
            />
          </div>
        </>
      ) : null}

      <br></br>
    </>
  );
};

export default App;
