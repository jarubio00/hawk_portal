'use client';
import Image from 'next/image'
import {HiLocationMarker, HiOutlineLocationMarker,HiOutlineMap, HiOutlineCurrencyDollar} from 'react-icons/hi'
import {BsBoxSeam} from 'react-icons/bs';
import {FiPackage} from 'react-icons/fi'

interface SectionCTAProps {

}

const SectionCTA: React.FC<SectionCTAProps> = ({

}) => {
  return ( 
    <div className="my-2 md:my-4 w-full md:w-4/6 mx-auto">
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className="rounded-2xl border-0 border-gray-300 bg-white p-4 xl:p-8  transition-shadow hover:shadow-xl flex flex-row items-center gap-3">
									<div className=' h-12 xl:h-16 w-12 xl:w-16 rounded-full bg-rose-520 text-center p-2.5 xl:p-3'>
                    <HiOutlineLocationMarker className="h-7 xl:h-10 w-7 xl:w-10 text-white" size={40} />
                  </div>
									<p className="font-display text-sm xl:text-lg text-jacarta-700">Rastrea tu envío</p>
          </div>
          <div className="rounded-2xl border-0 border-gray-300 bg-white p-4 xl:p-8   transition-shadow hover:shadow-xl flex flex-row items-center gap-3">
          <div className=' h-12 xl:h-16 w-12 xl:w-16 rounded-full bg-rose-520 text-center p-2.5 xl:p-3'>
                    <HiOutlineMap className="h-7 xl:h-10 w-7 xl:w-10 text-white" size={40} />
                  </div>
									<h3 className="font-display text-sm xl:text-lg text-jacarta-700">
										Cobertura
									</h3>
          </div>
          <div className="rounded-2xl border-0 border-gray-300 bg-white p-4 xl:p-8 transition-shadow hover:shadow-xl flex flex-row items-center gap-3">
          <div className=' h-12 xl:h-16 w-12 xl:w-16 rounded-full bg-rose-520 text-center p-2.5 xl:p-3'>
                    <HiOutlineCurrencyDollar className="h-7 xl:h-10 w-7 xl:w-10 text-white" size={40} />
                  </div>
									<h3 className="font-display text-sm xl:text-lg text-jacarta-700">
										Cotizar
									</h3>
          </div>
          <div className="rounded-2xl border-0 border-gray-300 bg-white p-4 xl:p-8 transition-shadow hover:shadow-xl flex flex-row items-center gap-3">
                  <div className=' h-12 xl:h-16 w-12 xl:w-16 rounded-full bg-rose-520 text-center p-2.5 xl:p-3'>
                    <FiPackage className="h-7 xl:h-10 w-7 xl:w-10 text-white" size={40} />
                  </div>
									<h3 className="font-display text-sm xl:text-lg text-jacarta-700">
										Programa tú envío
									</h3>
          </div>
        </div>
    </div>
   );
}
 
export default SectionCTA;