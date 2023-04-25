export default async function generateInvoice(req, res) {
  const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
  const authToken = process.env.NEXT_PUBLIC_TWILIO_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  const amount = JSON.parse(req.body).amount;
  const message = "Hola, Tule! te acaban de pagar " + amount + " satoshis. 🤑";

  client.messages
    .create({
      body: message,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+5491154865055",
    })
    .then((message) => {
      console.log(message.sid);
      res.json(message);
    })
    .catch((error) => console.log(error));
}
