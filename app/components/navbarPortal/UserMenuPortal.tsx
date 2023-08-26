'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoader from "@/app/hooks/useLoader";

import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuPortalProps {
  currentUser?: SafeUser | null
}

const UserMenuPortal: React.FC<UserMenuPortalProps> = ({
  currentUser
}) => {
  const router = useRouter();
  const loader = useLoader();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();


  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

   
  }, [loginModal,  currentUser]);

  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          onClick={toggleOpen}
          onBlur={toggleOpen} tabIndex={0}
          className="
            flex 
            flex-row 
            items-center 
            gap-2 
            cursor-pointer 
            transition
            "
          >
          {/* <AiOutlineMenu /> */}
          <div className="block" >
            {/* <Avatar src={currentUser?.image} /> */}
            {currentUser ? (
            <div className="m-0 w-7 h-7 relative flex justify-center items-center rounded-full bg-primary text-lg text-white uppercase">{currentUser?.nombre?.charAt(0)}</div>
            ) : (
              <Avatar src={null} />
            )}
            
          </div>
          <span className="hidden md:block text-xs">{currentUser?.nombre}</span>
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-40
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
            z-[9999]
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="Mi Panel" 
                  onClick={() => router.push('/portal/adm/mispedidos')}
                />
                <MenuItem 
                  label="Mi Perfil" 
                  onClick={() => router.push('/portal/adm/miperfil')}
                />
                <MenuItem 
                  label="Cambiar contraseña" 
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem 
                  label="Ayuda" 
                  onClick={() => router.push('/properties')}
                />
               
                <hr />
                <MenuItem 
                  label="Salir" 
                  onClick={() => {
                    loader.onOpen();

                    const timer = setTimeout(() => {
                      signOut({callbackUrl: "/"})
                      }, 1000);
                   
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Entrar a mi cuenta" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Salir" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}
 
export default UserMenuPortal;