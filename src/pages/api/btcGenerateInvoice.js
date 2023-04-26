import { lndClient } from "@/helpers/lndClient";

//test.
export default async function generateInvoice(req, res) {
  const merchant = "Tule";
  //const merchant = JSON.parse(req.body).merchant;
  const amount = JSON.parse(req.body).amount;

  const destination =
    "035e4ff418fc8b5554c5d9eea66396c227bd429a3251c8cbc711002ba215bfc226@170.75.163.209:9735";
  console.log("Procesando ", amount, " satoshis");
  let request = {
    value: amount,
    memo: merchant,
    destination: destination,
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
