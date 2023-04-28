import { supabase } from "@/helpers/hooks/useSupabase";
const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_TOKEN;
const client = require("twilio")(accountSid, authToken);

export default async function sendReceipt(req, res) {
  const fiat_amount = JSON.parse(req.body).amount;
  const crypto_amount = JSON.parse(req.body).crypto_amount;
  const merchant = JSON.parse(req.body).merchant;
  //const blockscan = JSON.parse(req.body).blockscan;
  const payment_option = JSON.parse(req.body).payment_option;
  const txHash = JSON.parse(req.body).txHash;
  const elapsed_time = "12 s";
  const date = new Date().toJSON();

  const payment_method = await supabase
    .from("payment_options")
    .select("name, symbol, block_explorer")
    .eq("id", payment_option);

  const merchant_info = await supabase
    .from("merchants")
    .select("phone_number")
    .eq("slug", merchant);

  let phone = merchant_info?.data[0]?.phone_number;

  if (phone == undefined) {
    phone = "+5491154865055";
  }

  /*
  // Template receipt
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
*/
  // Template receipt_v1
  const message =
    "Hola, " +
    merchant +
    ", acabas de recibir un pago en " +
    payment_method?.data[0]?.name +
    " 🥳!" +
    "\n____________________\n\n*Fecha:* " +
    date +
    "\n*Monto en Pesos:* " +
    fiat_amount +
    " $" +
    "\n____________________\n*Monto en Crypto:* " +
    crypto_amount +
    " " +
    payment_method?.data[0]?.symbol +
    "\n*Demora en procesamiento:* " +
    elapsed_time +
    "\n*Confirmacion de Transaccion:* " +
    payment_method?.data[0]?.block_explorer +
    txHash;

  client.messages
    .create({
      body: message,
      from: "whatsapp:+16319003288",
      to: "whatsapp:" + phone,
    })
    .then((message) => {
      console.log(message.sid);
      res.json(message);
    })
    .catch((error) => console.log(error));
}
