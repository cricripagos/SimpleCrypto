import { lndClient } from "@lib/lndClient";


//test.
export default async function generateInvoice(req, res) {
  const body = JSON.parse(req.body)
  console.log(body)
  //const merchant = JSON.parse(req.body).merchant;
  const crypto_amount = body.crypto_amount;
  const merchant = body.merchant

  console.log("Procesando ", crypto_amount, " satoshis");

  let request = {
    value: crypto_amount,
    memo: merchant,
  };

  console.log("Request: ", request);
  await lndClient.addInvoice(request, function (err, response) {
    if (err) {
      console.log("Error: " + err);
    }
    console.log(response);
    res.json(response);
  });
}
