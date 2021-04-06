import { useEffect, useState } from "react";

export function useResizeScreen() {
  const [screen, updateScreen] = useState({
    sWidth: window.innerWidth,
    sHeight: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      updateScreen({ sWidth: window.innerWidth, sHeight: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screen]);
  return { screen };
}
