import { useEffect } from "react";

export const useBodyScrollLock = (shouldLock: boolean) => {
      useEffect(() => {
        if (shouldLock) {
          document.body.classList.add("overflow-hidden");
        } else {
          document.body.classList.remove("overflow-hidden");
        }
    
        return () => {
          document.body.classList.remove("overflow-hidden");
        };
      }, [shouldLock]);
}