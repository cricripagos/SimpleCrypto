// helpers/hooks/useMerchantTransactions.js
import { supabase } from "@/helpers/hooks/useSupabase";
import { useEffect, useState } from "react";

export default function useMerchantTransactions(merchantId) {
  const [transactions, setTransactions] = useState([]);
  const [subscription, setSubscription] = useState(null);

  const fetchAndUpdateTransactions = async () => {
    const { data, error } = await supabase
      .from("payment_attempts")
      .select("*")
      .eq("merchant", merchantId)
      .gte(
        "created_at",
        new Date().toISOString().slice(0, 10) + "T00:00:00.000Z"
      )
      .lte(
        "created_at",
        new Date().toISOString().slice(0, 10) + "T23:59:59.999Z"
      );

    if (error) {
      console.error("Error fetching transactions:", error);
      return;
    }

    setTransactions(data || []);
  };

  const subscribeToNewTransactions = () => {
    const channelName = `new-transactions-channel-${merchantId}`;
    const newSubscription = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "payment_attempts",
          filter: `merchant=eq.${merchantId}`,
        },
        (payload) => {
          fetchAndUpdateTransactions();
        }
      )
      .subscribe();

    setSubscription(newSubscription);
  };

  useEffect(() => {
    fetchAndUpdateTransactions();
    subscribeToNewTransactions();

    return () => {
      subscription?.unsubscribe();
    };
  }, []); // Empty dependency array ensures cleanup only happens on unmount

  return {
    transactions,
  };
}
