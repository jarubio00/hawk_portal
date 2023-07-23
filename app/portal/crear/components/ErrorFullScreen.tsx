'use client';
import {MdErrorOutline} from "react-icons/md";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";


interface ErrorFullScreenProps {
 data?: string;
}

const ErrorFullScreen: React.FC<ErrorFullScreenProps> = ({
 data
}) => {
    const router = useRouter();
 return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
        <MdErrorOutline size={80} className="text-red-500" />
        <p className="text-2xl font-bold">Error</p>
        <p className="text-sm text-neutral-400 mb-6">{data}</p>
        <Button onClick={() => router.replace('/portal/adm/mispedidos')}>Regresar</Button>
       
</div>
 );
}

export default ErrorFullScreen;