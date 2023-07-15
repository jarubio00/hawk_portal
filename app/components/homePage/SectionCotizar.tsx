'use client';
import Image from 'next/image'
import Input from '../inputs/Input';
import InputSingle from '../inputs/InputSingle';

interface SectionCotizarProps {

}

const SectionCotizar: React.FC<SectionCotizarProps> = ({

}) => {
  return ( 
    <div className='my-4 w-full'>
      <div className='flex flex-row justify-evenly'>
          <div className='flex flex-col'>
            <p className='mb-2'>Consulta la cobertura y cotiza tu envío</p>
            <InputSingle
              id="email"
              label="email"
              disabled={false}
              required
              onChange={(event: any) => {
            
              }}
            />
          </div>
          <div>

          </div>
      </div>
    </div>
      
   );
}
 
export default SectionCotizar;