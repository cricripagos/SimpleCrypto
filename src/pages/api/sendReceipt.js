export default async function generateInvoice(req, res) {
  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
  const authToken = process.env.NEXT_PUBLIC_TWILIO_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  const amount = JSON.parse(req.body).amount;
  const merchant = JSON.parse(req.body).merchant;
  //const blockscan = JSON.parse(req.body).blockscan;
  //const payment_option = JSON.parse(req.body).payment_option;
  const txHash = JSON.parse(req.body).txHash;

  const blockscan = "https://blockstream.info/tx/";
  const payment_option = "satoshis";

  const message =
    "Hola, " +
    merchant +
    " acabas de recibir " +
    amount +
    " " +
    payment_option +
    ".\nAcá puedes ver la transacción " +
    blockscan +
    txHash;

  console.log(message);

  client.messages
    .create({
      body: message,
      from: "whatsapp:+16319003288",
      to: "whatsapp:+5215544944051",
    })
    .then((message) => {
      console.log(message.sid);
      res.json(message);
    })
    .catch((error) => console.log(error));
}
