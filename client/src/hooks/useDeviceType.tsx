import { useEffect, useState } from "react";

export function useDeviceType(breakpoint = 768) {
  const [deviceType, setDeviceType] = useState(false);

  useEffect(() => {
    const checkScreen = () => setDeviceType(window.innerWidth < breakpoint);
    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return deviceType ? "mobile" : "desktop";
}
