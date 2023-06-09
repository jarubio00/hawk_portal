'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import {BsFacebook } from "react-icons/bs";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useLoader from "@/app/hooks/useLoader";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const LoginModal = () => {
  const router = useRouter();
  const loader = useLoader();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    setValue,
      watch,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }
  
  const onSubmit: SubmitHandler<FieldValues> = 
  (data) => {
    loader.onOpen();

    const timer = setTimeout(() => {
      signIn('credentials', { 
        ...data, 
        redirect: false,
      })
      .then((callback) => {
        console.log(callback);
        
  
        if (callback?.ok) {
          toast.success('Logged in');
          loginModal.onClose();
          router.refresh();
          router.push("/portal/mispedidos");
          
          
        }
        
        if (callback?.error) {
          console.log('error', callback.error);
          toast.error(callback.error);
        }
      }).finally(() => {
        setIsLoading(false);
        loader.onClose();
      });
      }, 1000);
   
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Bienvenido a la plataforma Hawk"
        subtitle="Entra a tu panel con correo y contraseña"
      />
      <Input
        id="email"
        label="email"
        disabled={isLoading}
        register={register}  
        errors={errors}
        required
        onChange={(event: any) => {
          setCustomValue('email', event.target.value);
        }}
      />
      <Input
        id="password"
        label="password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onChange={(event: any) => {
          setCustomValue('password', event.target.value);
        }}
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continuar con Google"
        icon={FcGoogle}
        onClick={() => loader.onOpen()}
      />
      <Button 
        outline 
        label="Continuar con Facebook"
        icon={BsFacebook}
        onClick={() => loader.onClose()}
      />
      <div className="
      text-neutral-500 text-center mt-4 font-light">
        <p>No tienes cuenta aún?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Crear cuenta</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Entrar"
      actionLabel="Continuar"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;