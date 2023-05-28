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

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
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
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
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
            <div className="m-0 w-9 h-9 relative flex justify-center items-center rounded-full bg-blue-500 text-xl text-white uppercase">{currentUser?.nombre?.charAt(0)}</div>
            ) : (
              <Avatar src={null} />
            )}
            
          </div>
          <span className="hidden md:block font-xs">{currentUser?.nombre}</span>
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem 
                  label="Mi Panel" 
                  onClick={() => router.push('/portal/mispedidos')}
                />
                <MenuItem 
                  label="My favorites" 
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem 
                  label="My reservations" 
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem 
                  label="My properties" 
                  onClick={() => router.push('/properties')}
                />
                <MenuItem 
                  label="Airbnb your home" 
                  onClick={() => {}}
                />
                <hr />
                <MenuItem 
                  label="Logout" 
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
                  label="Login" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Sign up" 
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
 
export default UserMenu;