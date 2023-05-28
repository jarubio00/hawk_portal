'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
//import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";


import useSidebarModal from "@/app/hooks/useSidebarModal";

import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import SideModal from "./SideModal";

const SidebarModal= () => {
  const SidebarModal = useSidebarModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

 

  const onToggle = useCallback(() => {
    SidebarModal.onClose();

  }, [SidebarModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Sidebar"
        subtitle="Menu del portal"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        //onClick={() => signIn('google')} 
        onClick={() => {}} 
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        //onClick={() => signIn('github')}
        onClick={() => {}}
      />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Log in</span>
        </p>
      </div>
    </div>
  )

  return (
    <SideModal
      disabled={isLoading}
      isOpen={SidebarModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={SidebarModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default SidebarModal;