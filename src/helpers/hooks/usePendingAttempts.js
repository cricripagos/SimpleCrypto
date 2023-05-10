// localStorageHooks.js
import { supabase } from "@/helpers/hooks/useSupabase";

export default function usePendingAttempts() {
  const storageKey = "uuidList";
  //const { checkInvoice } = usePayBTC();

  // const router = useRouter();
  const getAllUUIDs = () => {
    const storedData = localStorage.getItem(storageKey);
    return storedData ? JSON.parse(storedData) : [];
  };

  const setUUID = (uuid) => {
    const currentUUIDs = getAllUUIDs();
    currentUUIDs.push(uuid);
    localStorage.setItem(storageKey, JSON.stringify(currentUUIDs));

    // Dispatch a custom event when a new UUID is added
    const event = new CustomEvent("newUUIDAdded", { detail: uuid });
    window.dispatchEvent(event);
  };

  const removeUUID = (uuid) => {
    const currentUUIDs = getAllUUIDs();
    const updatedUUIDs = currentUUIDs.filter((item) => item !== uuid);
    localStorage.setItem(storageKey, JSON.stringify(updatedUUIDs));
  };

  const searchUUID = async (uuid) => {
    const { data, error } = await supabase
      .from("payment_attempts")
      .select("*")
      .eq("uuid", uuid);

    if (error) {
      console.error("Error fetching payment_attempt:", error);
      return "error";
    }

    const status = data?.[0]?.payment_status;
    return status;
  };

  const subscribeToStatusChanges = (uuid, onUpdate) => {
    const channelName = `custom-filter-channel-${uuid}`;
    const subscription = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "payment_attempts",
          filter: `uuid=eq.${uuid}`,
        },
        (payload) => {
          const oldStatus = payload.old.payment_status;
          const newStatus = payload.new.payment_status;
          if (oldStatus === "pending" && newStatus === "success") {
            onUpdate(payload.new);
          }
        }
      )
      .subscribe();

    return subscription;
  };

  const unsubscribeToStatusChanges = (subscription) => {
    subscription.unsubscribe();
  };

  return {
    getAllUUIDs,
    setUUID,
    removeUUID,
    searchUUID,
    subscribeToStatusChanges,
    unsubscribeToStatusChanges,
  };
}
