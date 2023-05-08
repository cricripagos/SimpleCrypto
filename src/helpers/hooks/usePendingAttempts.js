// localStorageHooks.js
const storageKey = "uuidList";

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

export { getAllUUIDs, setUUID, removeUUID };
