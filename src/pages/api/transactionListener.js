import { supabase } from "@/helpers/hooks/useSupabase";

const paymentAttempts = supabase
  .channel("custom-update-channel")
  .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "payment_attempts" },
    (payload) => {
      console.log("Change received!", payload);
    }
  )
  .subscribe();
