"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import useLoader from "@/app/hooks/useLoader";
import NacionalWidget from "./NacionalWidget";

const useMediaQuery = (width: any) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: any) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, []);

  return targetReached;
};

const NacionalClient = (props: any) => {
  const breakpoints = {
    isSm: useMediaQuery(700),
    isMd: useMediaQuery(720),
    isLg: useMediaQuery(960),
    isXl: useMediaQuery(1140),
    is2xl: useMediaQuery(1320),
  };
  const router = useRouter();
  const loader = useLoader();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <NacionalWidget />
    </div>
  );
};

export default NacionalClient;
