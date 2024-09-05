"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { MdContentCopy, MdExitToApp } from "react-icons/md";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

interface GuiaShareProps {
  guia: number;
}

const GuiaShare: React.FC<GuiaShareProps> = ({ guia }) => {
  const shareUrl = `https://hawkportal.lamensajeria.mx/rastreo/${guia}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const res = await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    const timer = setTimeout(() => {
      setCopied(false);
    }, 7000);
  };
  return (
    <div className="my-2">
      <div className="flex flex-row items-center gap-3">
        <div>
          <WhatsappShareButton
            url={shareUrl}
            title="Rastrea tu envío"
            separator=":: "
          >
            <WhatsappIcon size={25} round />
          </WhatsappShareButton>
        </div>
        <div>
          <FacebookShareButton url={shareUrl} quote="Rastrea tu envío">
            <FacebookIcon size={25} round />
          </FacebookShareButton>
        </div>
        <div>
          <EmailShareButton
            url={shareUrl}
            subject="Rastrea tu envío"
            body="Entra al siguiente link:"
          >
            <EmailIcon size={25} round />
          </EmailShareButton>
        </div>
        <div
          className="p-1.5 bg-blue-500  rounded-full mb-2 cursor-pointer relative"
          onClick={handleCopy}
        >
          <MdContentCopy size={13} className="text-white" />
          {copied && (
            <div className="absolute bottom-1.5 left-9 bg-neutral-800 text-[10px] px-2 text-white rounded-sm">
              Copiado!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuiaShare;
