'use client';

interface DashSectionProps {
data?: any
}

const DashSection: React.FC<DashSectionProps> = ({
 data
}) => {
  return ( 
    <div className=" w-full">
        <div className="flex flex-row md:grid md:grid-cols-4 gap-4 md:gap-8 overflow-x-auto touch-auto no-scrollbar">
            <div className="h-12 w-56 md:h-20 md:w-auto border border-neutral-300 shadow-md rounded-md">

            </div>
            <div className="h-12 w-56 md:h-20 md:w-auto border border-neutral-300 shadow-md rounded-md">

            </div>
            <div className="h-12 w-28 md:h-20 md:w-auto border border-neutral-300 shadow-md rounded-md">

            </div>
            <div className="h-12 w-28 md:h-20 md:w-auto border border-neutral-300 shadow-md rounded-md">

            </div>

        </div>
    </div>
   );
}
 
export default DashSection;