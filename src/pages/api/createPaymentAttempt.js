import { supabase } from "@/helpers/hooks/useSupabase";
const { v4: uuidv4 } = require("uuid");

export default async function createPaymentAttempt(req, res) {
  console.log("Creating payment attempt....", req.body);
  const body = req.body;
  const merchant = body.merchant
    ? body.merchant
    : JSON.parse(req.body).merchant;
  const crypto_amount = body.crypto_amount
    ? body.crypto_amount
    : JSON.parse(req.body).crypto_amount;
  const fiat_amount = body.fiat_amount
    ? body.fiat_amount
    : JSON.parse(req.body).fiat_amount;
  const payment_option = body.payment_option
    ? body.payment_option
    : JSON.parse(req.body).payment_option;
  const expiration_date = body.expiration_date
    ? body.expiration_date
    : JSON.parse(req.body).expiration_date;
  const user_address = body.user_address
    ? body.user_address
    : JSON.parse(req.body).user_address;
  const transaction_hash = body.transaction_hash
    ? body.transaction_hash
    : JSON.parse(req.body).transaction_hash;

  /* Usamos uuid como identificador unico para el intento de pago.
    Esto nos permite idetificar el intento aunque se hayan creado
    multiples intentos con el mismo monto y merchant al mismo tiempo. */

  const attempt = {
    fiat_total_amount: fiat_amount,
    payment_option: payment_option, // cambiar por el payment option id
    crypto_total_amount: crypto_amount, // cambiar por la crypto con la que se paga
    user_address: user_address,
    transaction_hash: transaction_hash,
    merchant: merchant, // cambiar por el merchant de la url
    uuid: uuidv4(), // Universally unique identifier https://en.wikipedia.org/wiki/Universally_unique_identifier
  };

  console.log("Attempt is...", attempt);

  /*
  Si se envia una fecha de expiracion, se agrega al intento.
  De lo contrario, se ejecuta el trigger de la base de datos 
  que agrega la fecha de expiracion 10 minutos despues de la 
  creacion del intento. */

  if (expiration_date) {
    attempt.expiration_date = expiration_date;
  }

  const { data, error } = await supabase
    .from("payment_attempts")
    .upsert(attempt)
    .select("uuid");

  if (error) {
    console.log("There was an error in payment creation...", error);
    res.status(500).json(error);
  }

  res.status(200).json(data);
}
