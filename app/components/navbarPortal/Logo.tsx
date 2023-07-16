'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <div>
      <img
        onClick={() => router.push('/')}
        className="hidden h-12 md:block cursor-pointer" 
        src="/images/lmmx-light.png" 
        
      />
      <img
        onClick={() => router.push('/')}
        className="block h-10  md:hidden cursor-pointer" 
        src="/images/lmmx-light.png" 
        
      />
    </div>
   );
}
 
export default Logo;