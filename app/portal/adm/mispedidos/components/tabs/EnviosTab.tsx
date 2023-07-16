'use client';

interface EnviosTabProps {
data?: any;
}

const EnviosTab: React.FC<EnviosTabProps> = ({
  data
}) => {
  return ( 
    <div className="h-96 bg-neutral-100 w-full p-4">
      Envíos
    </div>
   );
}
 
export default EnviosTab;