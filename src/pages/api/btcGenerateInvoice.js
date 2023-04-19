import { lndClient } from "@lib/lndClient";
import { WeakSet } from "core-js";

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
/*
export default async function generateInvoice(req, res) {
  const merchant = "Tule";
  //const merchant = JSON.parse(req.body).merchant;
  const amount = JSON.parse(req.body).amount;

  console.log("Procesando ", amount, " satoshis");
  let request = {
    value: JSON.parse(req.body).amount,
    memo: merchant,
  };

  console.log("Request: ", request);
  const resp = await lndClient.addInvoice(request, function (err, response) {
    if (err) {
      console.log("Error: " + err);
    }
    response;
  });

  const info = JSON.stringify(await resp, getCircularReplacer());

  res.status(200).json(info);
}
*/

export default async function generateInvoice(req, res) {
  const merchant = "Tule";
  //const merchant = JSON.parse(req.body).merchant;
  const amount = JSON.parse(req.body).amount;

  console.log("Procesando ", amount, " satoshis");
  let request = {
    value: JSON.parse(req.body).amount,
    memo: merchant,
  };

  console.log("Request: ", request);
  await lndClient.addInvoice(request, function (err, response) {
    if (err) {
      console.log("Error: " + err);
    }
    res.json(response);
  });
}
