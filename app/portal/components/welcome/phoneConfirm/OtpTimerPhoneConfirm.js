import { useTimer } from 'react-timer-hook';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function OtpTimer({ expiryTimestamp, onResendCode, celular }) {
  const [enabledButton, setEnabledButton] = useState(false);
  const [resendTimer, setResetTimer] = useState();
  
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
  } = useTimer({ expiryTimestamp, onExpire: () => setEnabledButton(true) });


  function pad(num) {
    if(num<10) {
        num = num.toString();
        num = "0" + num;
    }
    return num;
  }

  const handleOnClick = (type) =>{
    onResendCode(type);
    setEnabledButton(false);
    const timeToClose = new Date();
    timeToClose.setSeconds(timeToClose.getSeconds() +10);
    restart(timeToClose)
  }

  
  return (

    <DropdownMenu>

    <DropdownMenuTrigger asChild>
      <Button className='px-2 gap-2 disabled:cursor-not-allowed' disabled={!enabledButton} >
          <p>Reenviar código</p>
        { seconds > 0 ? <span>{pad(seconds)}</span> : '  '}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className='text-xs text-neutral-400'>{celular}</DropdownMenuLabel>
        <DropdownMenuLabel>Reenviar código por:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer text-xs hover:bg-neutral-300 hover:underline" onClick={() => handleOnClick('whatsapp')}>
            Mensaje de Whatsapp
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-xs hover:bg-neutral-300 hover:underline" onClick={() => handleOnClick('sms')}>
            Mensaje de texto (SMS)
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
       
      </DropdownMenuContent>

        
        
    </DropdownMenu>
  );
}

export default OtpTimer;