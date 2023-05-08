// pages/testLocalStorage.js
import {
  getAllUUIDs,
  removeUUID,
  setUUID,
} from "@/helpers/hooks/usePendingAttempts";
import { useEffect, useState } from "react";

const TestLocalStorage = () => {
  const [uuids, setUUIDs] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUUIDs(getAllUUIDs());
    }
  }, []);

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestLocalStorage;
