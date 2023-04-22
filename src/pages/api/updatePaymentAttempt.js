import { supabase } from "@/helpers/hooks/useSupabase";
const { v4: uuidv4 } = require("uuid");

export default async function updatePaymentAttempt(req, res) {
  const attemptUuid = JSON.parse(req.body).attempt;
  const paymentStatus = JSON.parse(req.body).status;
  const transactionHash = JSON.parse(req.body).txHash;
  const userAddress = JSON.parse(req.body).userAddress;

  const attempt = {
    payment_status: paymentStatus,
  };

  if (transactionHash?.toString()?.length > 0) {
    attempt.transaction_hash = transactionHash;
  }

  if (userAddress?.toString()?.length > 0) {
    attempt.user_address = userAddress;
  }

  const { data, error } = await supabase
    .from("payment_attempts")
    .update(attempt)
    .eq("uuid", attemptUuid);

  if (error) {
    console.log(error);
    res.status(500).json(error);
  }

  res.status(200).json(data);
}
