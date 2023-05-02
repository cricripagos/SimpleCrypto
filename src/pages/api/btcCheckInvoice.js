import { lndClient } from "@/helpers/lndClient";

export default async function checkInvoice(req, res) {
  const invoice = JSON.parse(req.body).invoice;

  let dataReturn = {};

  let stream = lndClient.subscribeInvoices({});

  stream.on("data", (data) => {
    console.log("### DATA");
    console.log(data);
    //console.log(data.settled)

    //This check for the correct invoice is important. If not doen all connected users will be marked as setteled
    if (data.settled === true && data.payment_request === invoice) {
      dataReturn = data;
      stream.destroy();
    }
  });

  stream.on("close", () => {
    console.log("### CLOSE");
    return res.json(dataReturn);
  });
  //console.log(dataReturn);
  //res.status(200).send(dataReturn);
}
