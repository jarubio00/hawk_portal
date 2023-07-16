'use client';

interface HistorialTabProps {
data?: any;
}

const HistorialTab: React.FC<HistorialTabProps> = ({
  data
}) => {
  return ( 
    <div className="h-96 bg-neutral-100 w-full p-4">
      Historial
    </div>
   );
}
 
export default HistorialTab;