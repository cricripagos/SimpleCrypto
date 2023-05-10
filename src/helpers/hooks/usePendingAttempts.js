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
  };

  const removeUUID = (uuid) => {
    const currentUUIDs = getAllUUIDs();
    const updatedUUIDs = currentUUIDs.filter((item) => item !== uuid);
    localStorage.setItem(storageKey, JSON.stringify(updatedUUIDs));
  };

  const searchUUID = async (uuid) => {
    const pendingAttempt = await supabase
      .from("payment_attempts")
      .select("*")
      .eq("uuid", uuid);

    //console.log(pendingAttempt);

    const status = pendingAttempt?.data[0]?.payment_status;
    const payment_option = pendingAttempt?.data[0]?.payment_option;
    const txHash = pendingAttempt?.data[0]?.txHash;
    console.log(status);
    if ((await status) == "success") {
      //removeUUID(uuid);
      return true;
    } else {
      return false;
    }
    /*
    if (status === "pending" && payment_option === 2) {
      const confirm = await checkInvoice(txHash);
      if (confirm.settled == true) {
        router.push(`/success/${confirm.address}`);
      }

      return false;
    }*/
  };

  return {
    getAllUUIDs,
    setUUID,
    removeUUID,
    searchUUID,
  };
}
