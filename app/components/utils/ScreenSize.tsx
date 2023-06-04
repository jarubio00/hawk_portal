'use client';




const ScreenSizeUtil = () => {
  return ( 
    <div className="flex p-1 ">
        <div className="hidden xs:block">* xs *</div>
        <div className="hidden sm:block">* sm *</div>
        <div className="hidden md:block">* md *</div>
        <div className="hidden lg:block">* lg *</div>
        <div className="hidden xl:block">* xl *</div>
        <div className="hidden 2xl:block">* 2xl *</div>
    </div>
   );
}
 
export default ScreenSizeUtil;