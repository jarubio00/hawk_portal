"use client";

import axios from "axios";
import { signIn } from "next-auth/react";

import { AiFillGithub } from "react-icons/ai";
//import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const RegisterModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
      celular: "",
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered!");
        registerModal.onClose();
        loginAfter(data);
      })
      .catch((error) => {
        //console.log('error',error);
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loginAfter = (data: any) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      //console.log(callback);
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        router.push("/portal/adm/mispedidos");
        loginModal.onClose();
      }

      if (callback?.error) {
        console.log("error", callback.error);
        toast.error(callback.error);
      }
    });
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Beinvenido a la plataforma Hawk"
        subtitle="Crea tu cuenta"
      />
      <Input
        id="email"
        label="Correo"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onChange={(event: any) => {
          setCustomValue("email", event.target.value);
        }}
      />
      <Input
        id="nombre"
        label="Nombre"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onChange={(event: any) => {
          setCustomValue("nombre", event.target.value);
        }}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onChange={(event: any) => {
          setCustomValue("password", event.target.value);
        }}
      />
      <Input
        id="celular"
        label="Celular"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onChange={(event: any) => {
          setCustomValue("celular", event.target.value);
        }}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          Ya tienes cuenta?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Entrar
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Registrar"
      actionLabel="Continuar"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
