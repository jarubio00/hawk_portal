'use client';

import { IconType } from "react-icons";

interface StatCardProps {
 title: string;
 value: string;
 icon?: IconType;
 valueLegend?: string;
}

const StatCard: React.FC<StatCardProps> = ({
 title,
 value,
 icon: Icon,
 valueLegend
}) => {
 return (
    <div className="w-40 h-16  border border-neutral-300 shadow-md rounded-md px-2 py-1.5 flex flex-col bg-primary">
        <div className="flex flex-row items-center justify-between mb-1">
            <p className="text-[11px] leading-none text-neutral-300">{title}</p>
            {Icon ? <Icon size={16} className='text-neutral-300'/> : <p> </p>}
        </div>
        <div className=" h-full flex flex-col justify-center items-center">
            <p className="text-md text-foreground leading-none font-bold text-center text-white ">{value}</p>
            {valueLegend && <p className="text-[11px]  text-blue-400">{valueLegend}</p>}
        </div>
    </div>
 );
}

export default StatCard;