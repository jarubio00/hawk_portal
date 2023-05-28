'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <div>
      <img
        onClick={() => router.push('/')}
        className="hidden h-10 md:block cursor-pointer" 
        src="/images/lmpink-c.png" 
        
      />
      <img
        onClick={() => router.push('/')}
        className="block w-16  md:hidden cursor-pointer" 
        src="/images/lmpink-m.png" 
        
      />
    </div>
   );
}
 
export default Logo;