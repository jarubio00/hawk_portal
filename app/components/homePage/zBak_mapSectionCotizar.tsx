'use client';
import Image from 'next/image'

interface SectionCotizarProps {

}

const SectionCotizar: React.FC<SectionCotizarProps> = ({

}) => {
  return ( 
    <div>
      <div className="absolute bg-cover bg-no-repeat h-screen w-full z-40 bg-gray-900 opacity-95 "></div>
      <img
        src='/images/map1.png'
        alt={'Hola'}
        className="w-full object-cover z-10"
        style={{ height: '100%' }}
      />
    </div>
      
   );
}
 
export default SectionCotizar;