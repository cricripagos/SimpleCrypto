//import { lndClient } from "@lib/lndClient";

import { createLnRpc } from "@radar/lnrpc";

const lndClient = await createLnRpc({
  server: process.env.NEXT_PUBLIC_HOST_PORT,
  tls: false,
  macaroon: process.env.NEXT_PUBLIC_MACAROON,
});

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
    try {
      console.log(response);
      res.json(response);
    } catch (e) {
      console.log(e);
    }
  });
}
