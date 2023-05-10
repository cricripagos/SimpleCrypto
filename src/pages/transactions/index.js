import usePendingAttempts from "@/helpers/hooks/usePendingAttempts";
import { useEffect, useState } from "react";

const UserTransactions = () => {
  const {
    getAllUUIDs,
    removeUUID,
    setUUID,
    searchUUID,
    subscribeToStatusChanges,
    unsubscribeToStatusChanges,
  } = usePendingAttempts();
  const [uuids, setUUIDs] = useState([]);
  const [uuidStatus, setUuidStatus] = useState({});
  const [subscriptions, setSubscriptions] = useState({});

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
    <div>
      <h1>Test Local Storage Hooks</h1>
      <ul>
        {uuids.map((uuid, index) => (
          <li key={index}>
            {uuid} <button onClick={() => deleteUUID(uuid)}>Remove UUID</button>
            {uuidStatus[uuid] === "success" ? <p>pagado</p> : <p>pendiente</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTransactions;
