import { supabase } from "@/helpers/hooks/useSupabase";

export default async function updatePaymentAttempt(req, res) {
  const merchant = JSON.parse(req.body).merchant;

  //const merchantId = 3; // replace with the ID of the merchant you want to query
  const today = new Date().toISOString().slice(0, 10); // get today's date in ISO format

  const { data, error } = await supabase
    .from("payment_attempts")
    .select("*")
    .eq("merchant", merchant)
    .gte("created_at", `${today}T00:00:00.000Z`)
    .lte("created_at", `${today}T23:59:59.999Z`);

  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }

  res.status(200).json(data);
}
