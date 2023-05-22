import Stablecoins from "@/components/WalletConnectComponents/Stablecoins";
import usePendingAttempts from "@/helpers/hooks/usePendingAttempts";
import WagmiWrapper from "@components/WalletConnectComponents/WagmiWrapper";
import { Web3Button } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const UserTransactions = () => {
  const {
    getAllUUIDs,
    removeUUID,
    searchUUID,
    subscribeToStatusChanges,
    unsubscribeToStatusChanges,
  } = usePendingAttempts();
  const [uuids, setUUIDs] = useState([]);
  const [uuidStatus, setUuidStatus] = useState({});
  const [subscriptions, setSubscriptions] = useState({});
  const { address } = useAccount();

  console.log("address", address);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUUIDs(getAllUUIDs());
    }
  }, []);

  const fetchAndUpdateUUIDs = async () => {
    const uuidList = getAllUUIDs();

    const newStatus = {};
    for (const uuid of uuidList) {
      newStatus[uuid] = await searchUUID(uuid);
    }

    return { uuidList, newStatus };
  };

  useEffect(() => {
    const updateStatus = async () => {
      const { uuidList, newStatus } = await fetchAndUpdateUUIDs();
      setUUIDs(uuidList);
      setUuidStatus(newStatus);

      const newSubscriptions = {};
      for (const uuid of uuids) {
        newSubscriptions[uuid] = subscribeToStatusChanges(
          uuid,
          async (updatedRecord) => {
            const { newStatus } = await fetchAndUpdateUUIDs();
            setUuidStatus(newStatus);
          }
        );
      }
      setSubscriptions((prevSubscriptions) => {
        Object.values(prevSubscriptions)?.forEach((subscription) =>
          unsubscribeToStatusChanges(subscription)
        );
        return newSubscriptions;
      });
    };

    updateStatus();
    return () => {
      Object.values(subscriptions)?.forEach((subscription) =>
        unsubscribeToStatusChanges(subscription)
      );
    };
  }, [uuids]);

  useEffect(() => {
    const handleNewUUID = async (e) => {
      const newUUID = e.detail;
      const { uuidList, newStatus } = await fetchAndUpdateUUIDs();
      setUUIDs(uuidList);
      setUuidStatus(newStatus);
    };

    window.addEventListener("newUUIDAdded", handleNewUUID);

    return () => {
      window.removeEventListener("newUUIDAdded", handleNewUUID);
    };
  }, []);

  const deleteUUID = (uuid) => {
    removeUUID(uuid);
    fetchAndUpdateUUIDs();
  };

  return (
    <WagmiWrapper>
      <div
        className="px-7 flex flex-col items-center w-full flex-1/4 overflow-scroll
    overflow-x-hidden scrollbox"
      >
        <p className="text-lg font-semibold pt-3 text-center">
          Conecta tu wallet para ver tu historial de transacciones
        </p>
        <Stablecoins />
        {/* AQUI NO MOSTRAMOS EL BALANCE PARA NO CONFUNDIR CON EL TOTAL DE LAS TRANSACCIONES */}
        <Web3Button balance="hide" icon="show" />
      </div>
      {address && (
        <div
          className="px-7 flex flex-col items-center w-full flex-1/4 overflow-scroll
    overflow-x-hidden scrollbox"
        >
          <br />
          <br />
          <ul>
            {uuids.map((uuid, index) => (
              <li key={index}>
                {uuid}{" "}
                <button onClick={() => deleteUUID(uuid)}>Remove UUID</button>
                {uuidStatus[uuid] === "success" ? (
                  <p>pagado</p>
                ) : (
                  <p>pendiente</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </WagmiWrapper>
  );
};

export default UserTransactions;
