import { lndClient } from "@/helpers/lndClient";

//test.
export default async function generateInvoice(req, res) {
  const body = JSON.parse(req.body);
  //const merchant = JSON.parse(req.body).merchant;
  const crypto_amount = body.crypto_amount * 100000000; // 1 BTC = 100000000 satoshis
  const merchant = body.merchant;

  let request = {
    value: crypto_amount,
    memo: merchant,
  };

  await lndClient.addInvoice(request, function (err, response) {
    if (err) {
      console.log("Error: " + err);
    }
    res.json(response);
  });
}
