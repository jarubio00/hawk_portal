'use client';

import useLoader from "@/app/hooks/useLoader";
import { useEffect } from "react";

export default function Home() {
  const loader = useLoader();

  useEffect(() => {
    if (loader.isOpen) {
      //loader.onClose();
    }
  }, []);


  return (
    <div></div>
  )
}
