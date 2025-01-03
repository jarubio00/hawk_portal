"use client";

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
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { BiSolidLogInCircle, BiSolidUserPlus } from "react-icons/bi";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface UserMenuPortalProps {
  currentUser?: SafeUser | null;
}

const UserMenuPortal: React.FC<UserMenuPortalProps> = ({ currentUser }) => {
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
  }, [loginModal, currentUser]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="flex flex-row items-center gap-1 cursor-pointer"
          onClick={toggleOpen}
        >
          <div className="flex flex-row items-center gap-2 cursor-pointer transition">
            <div className="block">
              {currentUser ? (
                <div className="m-0 w-7 h-7 relative flex justify-center items-center rounded-full bg-primary text-lg text-white uppercase">
                  {currentUser?.nombre?.charAt(0)}
                </div>
              ) : (
                <Avatar src={null} />
              )}
            </div>
            {/* <span className="hidden md:block text-xs">{currentUser?.nombre}</span> */}
          </div>
          <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[9999] w-w-[60vw] md:w-72">
        <div className="flex flex-col cursor-pointer py-4">
          {currentUser ? (
            <>
              <div className="flex flex-row items-center gap-2  justify-center ">
                <div className="m-0 w-9 h-9 flex justify-center items-center rounded-full bg-primary text-xl text-white uppercase">
                  {currentUser?.nombre?.charAt(0)}
                </div>
                <div className="flex flex-col gap-1 w-40">
                  <p className="text-xs font-bold text-primary leading-none truncate">
                    {currentUser?.email}
                  </p>
                  <p className="text-xs  text-neutral-400 leading-none truncate">
                    {currentUser?.nombre}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center  gap-6  justify-center my-6">
                <Button
                  className="px-4 gap-2 w-48"
                  onClick={() => {
                    loader.onOpen();
                    router.push("/auth/login");
                  }}
                >
                  <p className="text-white">Entrar con mi cuenta</p>
                </Button>
                <Button
                  variant={"outline"}
                  className="px-4 gap-2 w-48"
                  onClick={() => router.push("/auth/register")}
                >
                  <BiSolidUserPlus size={20} className="text-primary" />
                  <p className="">Registrarme</p>
                </Button>
              </div>
            </>
          )}
          <hr className="my-2"></hr>
          <div className="px-0">
            {currentUser ? (
              <>
                <DropdownMenuItem
                  className="px-4 py-3 hover:bg-neutral-100 transition text-md"
                  onClick={() => {
                    router.push("/portal/adm/mispedidos");
                    //setIsOpen(false);
                  }}
                >
                  Panel
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-4 py-3 hover:bg-neutral-100 transition text-md"
                  onClick={() => {
                    router.push("/portal/adm/miperfil");
                    //setIsOpen(false);
                  }}
                >
                  Mi perfil
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-4 py-3 hover:bg-neutral-100 transition text-md"
                  onClick={() => router.push("/portal/adm/miperfil?pc=1")}
                >
                  Cambiar contraseña
                </DropdownMenuItem>
                <MenuItem label="Ayuda" onClick={() => {}} />

                <hr />
                <DropdownMenuItem
                  className="px-4 py-3 hover:bg-neutral-100 transition text-md"
                  onClick={() => {
                    loader.onOpen();
                    const timer = setTimeout(() => {
                      signOut({ callbackUrl: "/" });
                    }, 1000);
                  }}
                >
                  Cerrar sesión
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <MenuItem label="Conoce el nuevo portal" onClick={() => {}} />
                <MenuItem label="Ayuda" onClick={() => {}} />
                <MenuItem label="Manual de usuario" onClick={() => {}} />
                <MenuItem label="Aviso de privacidad" onClick={() => {}} />
                <hr />
                <MenuItem label="Contáctanos" onClick={() => {}} />
              </>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuPortal;
