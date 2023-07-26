'use client';

interface CobrosTabProps {
 data?: string;
}

const CobrosTab: React.FC<CobrosTabProps> = ({
 data
}) => {
 return (
  <div className='m-4'>
    Cobros
  </div>
 );
}

export default CobrosTab;