import { useState } from "react";
var Promise = require("promise");

const App = () => {
  const [amount, setAmount] = useState("");
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

    const response = await fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: JSON.stringify({ amount }),
    });

    await sleep(5000);

    const data = await response.json();
    console.log(data);

    if (response.status === 503) {
      // Set the estimated_time property in state
      console.log("validando nodo");
      return;
    }

    if (!response.ok) {
      console.log(`Error: ${data}`);
      setIsProcessing(false);

      return;
    }

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
      <textarea
        style={{ resize: "none" }}
        rows="9"
        cols="32"
        value={amount}
        readOnly
      ></textarea>
      <br></br>
    </>
  );
};

export default App;
