"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface SectionBlankRedirectProps {
  data?: string;
}

const SectionBlankRedirect: React.FC<SectionBlankRedirectProps> = ({
  data,
}) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/portal/adm/mispedidos");
  }, []);

  return <div className="m-0">REDIRECT PAGE</div>;
};

export default SectionBlankRedirect;
