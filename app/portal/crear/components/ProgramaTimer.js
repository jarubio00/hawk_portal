import { useTimer } from 'react-timer-hook';

import { useEffect } from 'react';

function ProgramaTimer({ expiryTimestamp, isOpen, onExpire }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => onExpire() });


  function pad(num) {
    if(num<10) {
        num = num.toString();
        num = "0" + num;
    }
    return num;
  }

  if (!isOpen) {
    return null;
  }
  
  return (

    <div className='relative'>
        <div className='fixed  top-2  left-1/2 transform -translate-x-1/2 w-40 md:w-56 z-[9999] bg-neutral-900 text-white rounded-lg p-2 md:p-4 m-2 shadow-lg'>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className='text-xs'>Tiempo restante</div>
                <div>
                    <span>{pad(minutes)}</span>:<span>{pad(seconds)}</span>
                </div>
            </div>
        </div>
    </div>

  );
}

export default ProgramaTimer;