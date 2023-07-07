'use client';
import Image from 'next/image'

interface SectionBannerProps {

}

const SectionBanner: React.FC<SectionBannerProps> = ({

}) => {
  return ( 
    <div className="my-2 md:my-4">
        <div className='w-full md:w-full mx-auto'>
            <Image src="/images/lm-banner2.png"
                alt="Banner 1"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
            />
            </div>
    </div>
   );
}
 
export default SectionBanner;