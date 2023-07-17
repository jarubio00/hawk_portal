'use client';

interface RecoleccionesTabProps {
data?: any;
}

const RecoleccionesTab: React.FC<RecoleccionesTabProps> = ({
  data
}) => {
  return ( 
    <div className="h-96 w-full p-4">
        Recolecciones
    </div>
   );
}
 
export default RecoleccionesTab;