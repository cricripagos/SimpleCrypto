import { useEffect } from "react";

const useVisibilityChange = (onHidden, onVisible) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        onHidden();
      } else if (document.visibilityState === "visible") {
        onVisible();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onHidden, onVisible]);
};

export default useVisibilityChange;
