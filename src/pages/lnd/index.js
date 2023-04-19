import { useState } from "react";
var Promise = require("promise");

const App = ({ cliente }) => {
  const [amount, setAmount] = useState("");
  const [invoice, setInvoice] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setAmount(result);
  };

  const sleep = (ms) => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
    return promise;
  };

  const generateInvoice = async () => {
    if (amount.length == 0) {
      alert("Ingresa una cantidad");
      return;
    }

    console.log("Generating invoice...");

    // Set loading has started
    setIsProcessing(true);
    /*
    const response = await fetch("/api/btcGenerateInvoice", {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({ amount }),
    })*/
    const fact = await fetch("/api/btcGenerateInvoice", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({ amount }),
    })
      .then((res) => {
        try {
          console.log("res", res);
          res.json();
        } catch (e) {
          console.log(e);
        }
      })
      .then((data) => {
        console.log(data);
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
    setInvoice(fact.invoice);
    console.log("Invoice: ", fact.invoice);
    console.log("Hash: ", fact.hash);

    await sleep(10000);
    console.log("Invoice generated!");

    setAmount("");
    setIsProcessing(false);
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
          <a href={invoice}>
            {/* Tweak to show a loading indicator */}
            <div>
              <p className="text-sky-500 hover:text-sky-600">
                Click para pagar
              </p>
            </div>
          </a>
          <textarea
            style={{ resize: "none" }}
            rows="9"
            cols="32"
            value={invoice}
            readOnly
          ></textarea>
        </>
      ) : null}

      <br></br>
    </>
  );
};

export default App;
