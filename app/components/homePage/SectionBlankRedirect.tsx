"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GlobalLoader from "../GlobalLoader";
import useLoader from "@/app/hooks/useLoader";

interface SectionBlankRedirectProps {
  data?: string;
}

const SectionBlankRedirect: React.FC<SectionBlankRedirectProps> = ({
  data,
}) => {
  const loader = useLoader();
  const router = useRouter();

  useEffect(() => {
    loader.onOpen();
    router.push("/portal/adm/mispedidos");
  }, []);

  return (
    <div className="m-0">
      <GlobalLoader />
    </div>
  );
};

export default SectionBlankRedirect;
