import { supabase } from "@lib/supabaseClient";

export default async function createPaymentAttempt(req, res) {
  const merchant = JSON.parse(req.body).merchant;
  const amount = JSON.parse(req.body).amount;

  const attempt = {
    fiat_total_amount: amount,
    payment_option: 1,
    crypto_total_amount: amount,
    merchant: merchant ? merchant : 3,
  };

  const { data, error } = await supabase
    .from("payment_attempts")
    .insert(attempt);

  console.log(data, error);

  res.status(200).json(data);
}
