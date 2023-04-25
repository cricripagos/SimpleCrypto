export default async function generateInvoice(req, res) {
  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
  const authToken = process.env.NEXT_PUBLIC_TWILIO_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  const amount = JSON.parse(req.body).amount;
  const message =
    "Hola, Tule acabas de recibir " +
    amount +
    " satoshis.\nAcá puedes ver la transacción https://blockstream.info/tx/";

  console.log(message);

  client.messages
    .create({
      body: message,
      //  from: "whatsapp:+14155238886",
      from: "whatsapp:+16319003288",
      to: "whatsapp:+5215544944051",
    })
    .then((message) => {
      console.log(message.sid);
      res.json(message);
    })
    .catch((error) => console.log(error));
}
