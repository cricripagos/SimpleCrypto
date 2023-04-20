import { supabase } from "@lib/hooks/useSupabase";

export default async function createPaymentAttempt(req, res) {
  const merchant = JSON.parse(req.body).merchant;
  const amount = JSON.parse(req.body).amount;
  const expiration_date = JSON.parse(req.body).expiration_date;

  const attempt = {
    fiat_total_amount: amount,
    payment_option: 1, // cambiar por el payment option id
    crypto_total_amount: amount, // cambiar por la crypto con la que se paga
    merchant: merchant ? merchant : 3, // cambiar por el merchant de la url
  };

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
    .insert(attempt);

  console.log(data, error);

  res.status(200).json(data);
}
