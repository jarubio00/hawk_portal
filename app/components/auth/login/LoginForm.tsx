"use client";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import LoaderSingle from "@/app/components/LoaderSingle";

import FormInput from "../../inputs/FormInput";
import Heading from "../../Heading";
import { Button } from "@/components/ui/button";
import PulseLoader from "react-spinners/PulseLoader";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormType } from "@/app/types";
import useLoader from "@/app/hooks/useLoader";

interface LoginFormProps {
  currentUser: any;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const router = useRouter();
  const loader = useLoader();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("El correo es requerido")
      .email("El correo es inválido"),
    password: Yup.string().required("La contraseña no puede estar vacía"),
  });

  //let redirectUrl = "https://hawkportal.lamensajeria.mx/portal/adm/mispedidos";
  let redirectUrl = "http://localhost:3010/portal/adm/mispedidos";

  if (currentUser) {
    const url = new URL(location.href);
    redirectUrl = url.searchParams.get("callbackUrl") || redirectUrl;
    router.push("/portal/adm/mispedidos");
    console.log(redirectUrl);
  }

  useEffect(() => {
    loader.isOpen && loader.onClose();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser) {
      router.push("/portal/adm/mispedidos");
    }
  }, [currentUser]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<LoginFormType> = (data) => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      signIn("credentials", {
        ...data,

        redirect: false,
      })
        .then((callback) => {
          console.log(callback);

          if (callback?.ok) {
            setLoginSuccess(true);
            router.refresh();
            console.log("login ok");
          }

          if (callback?.error) {
            console.log("error", callback.error);
            setError(callback.error);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          //setIsLoading(false);
        });
    }, 1000);
  };

  const onToggle = useCallback(() => {
    router.push("/auth/register");
  }, []);

  const onForgot = useCallback(() => {
    router.push("/auth/forgot");
  }, []);

  const loadingTest = () => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  //handleSubmit(onSubmit)

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className=" text-neutral-400 mt-2 text-center">
          Entra a tu panel con tu correo y contraseña
        </div>
        <FormInput
          id="email"
          label="correo"
          placeholder="Ingresa tu correo registrado"
          disabled={isLoading}
          register={register}
          errors={errors.email?.message as string}
          required
          onChange={(event: any) => {
            setCustomValue("email", event.target.value);
            setError("");
          }}
        />
        <FormInput
          id="password"
          label="contraseña"
          placeholder="Ingresa tu contraseña"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors.password?.message as string}
          required
          onChange={(event: any) => {
            setCustomValue("password", event.target.value);
            setError("");
          }}
        />
        <div className="flex flex-row justify-center items-center">
          <p className="text-xs text-red-500">{error}</p>
        </div>

        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="gap-3 py-5 bg-rose-500 hover:bg-rose-500/80"
        >
          {isLoading && <PulseLoader size={6} color="#FFFFFF" />}
          Entrar
        </Button>
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <hr />
        <Button
          variant={"ghost"}
          className="px-2 font-bold "
          onClick={onForgot}
        >
          Olvidé mi contraseña
        </Button>
        <div
          className="
      text-neutral-400 text-center mt-0"
        >
          <p>
            No tienes cuenta?
            <span
              onClick={onToggle}
              className="
              text-blue-500
              cursor-pointer 
              hover:underline
            "
            >
              {" "}
              Registrate
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
