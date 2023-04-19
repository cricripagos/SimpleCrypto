import { lndClient } from "@lib/lndClient";

export default async function generateInvoice(req, res) {
  const merchant = "Tule";
  //const merchant = JSON.parse(req.body).merchant;
  const amount = JSON.parse(req.body).amount;

  console.log("Procesando ", amount, " satoshis");
  let request = {
    value: amount,
    memo: merchant,
  };

  await lndClient.addInvoice(request, function (err, response) {
    if (err) {
      console.log("Error: " + err);
    }
    res.json(response);
  });
}
