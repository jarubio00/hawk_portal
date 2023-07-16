'use client';

interface DashSectionProps {
data?: any
}

const DashSection: React.FC<DashSectionProps> = ({
 data
}) => {
  return ( 
    <div className=" w-full">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            <div className="h-20 border border-neutral-300 shadow-md rounded-md">

            </div>
            <div className="h-20 border border-neutral-300 shadow-md rounded-md">

            </div>
            <div className="h-20 border border-neutral-300 shadow-md rounded-md">

            </div>
            <div className="h-20 border border-neutral-300 shadow-md rounded-md">

            </div>

        </div>
    </div>
   );
}
 
export default DashSection;