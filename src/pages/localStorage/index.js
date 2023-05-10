import usePendingAttempts from "@/helpers/hooks/usePendingAttempts";
import { useEffect, useState } from "react";

const TestLocalStorage = () => {
  const { getAllUUIDs, removeUUID, setUUID, searchUUID } = usePendingAttempts();
  const [uuids, setUUIDs] = useState([]);
  const [uuidStatus, setUuidStatus] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUUIDs(getAllUUIDs());
    }
  }, []);

  useEffect(() => {
    const updateStatus = async () => {
      const newStatus = {};
      for (const uuid of uuids) {
        newStatus[uuid] = await searchUUID(uuid);
      }
      setUuidStatus(newStatus);
    };

    updateStatus();
  }, [uuids]);

  const addUUID = () => {
    const newUUID = "123e4567-e89b-12d3-a456-426614174000";
    setUUID(newUUID);
    setUUIDs(getAllUUIDs());
  };

  const deleteUUID = (uuid) => {
    removeUUID(uuid);
    setUUIDs(getAllUUIDs());
  };

  return (
    <div>
      <h1>Test Local Storage Hooks</h1>
      <button onClick={addUUID}>Add UUID</button>
      <ul>
        {uuids.map((uuid, index) => (
          <li key={index}>
            {uuid} <button onClick={() => deleteUUID(uuid)}>Remove UUID</button>
            {uuidStatus[uuid] === true ? <p>pagado</p> : <p>pendiente</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestLocalStorage;
