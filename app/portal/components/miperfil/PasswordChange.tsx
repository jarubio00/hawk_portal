"use client";
import { useState, useContext, useCallback, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ForgotChangeFormType, PasswordChangeFormType } from "@/app/types";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FormInput from "@/app/components/inputs/FormInput";
import { BsCheckCircle } from "react-icons/bs";
import PulseLoader from "react-spinners/PulseLoader";
import { passwordChangeProfile } from "@/app/actions/apiQuerys";

interface PasswordChangeProps {
  currentUser: any;
  onClose: () => void;
  onForgot: () => void;
  toggleCloseButton: () => void;
}

const PasswordChange: React.FC<PasswordChangeProps> = ({
  currentUser,
  onClose,
  onForgot,
  toggleCloseButton,
}) => {
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("La contraseña anterior es requerida"),
    newPassword: Yup.string()
      .required("La contrseña no puede estar vacía")
      .min(8, "La contraseña debe contener mínimo 8 caractéres")
      .matches(/[a-z]+/, "Debe contener al menos una letra minúscula")
      .matches(/[A-Z]+/, "Debe contener al menos una letra mayúscula")
      .matches(/\d+/, "Debe contener al menos un número"),
    confirmPassword: Yup.string()
      .required("Confirmar la contraseña es requerido")
      .oneOf([Yup.ref("newPassword"), ""], "Las contraseñas no coinciden"),
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Creando cuenta...");
  const [changeError, setChangeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<PasswordChangeFormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<PasswordChangeFormType> = async (
    data: PasswordChangeFormType
  ) => {
    setIsLoading(true);
    toggleCloseButton();
    setChangeError(false);
    setErrorMessage("");

    let result;

    if (data.newPassword === data.confirmPassword) {
      result = await passwordChangeProfile({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      //console.log("res:", result);
    }

    if (result && result?.status === 1) {
      setChanged(true);
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
    } else {
      console.log("error");
      setErrorMessage(`${result?.statusMessage}`);
      setChangeError(true);
      toggleCloseButton();
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="my-0">
      {!changed ? (
        <div>
          <div className="flex flex-col text-xs text-center text-neutral-400 mb-2 md:mb-4">
            <span className="font-semibold text-black text-sm">
              Cambiar contraseña
            </span>
          </div>
          <div className="w-full">
            <FormInput
              id="oldPassword"
              label="Contraseña anterior"
              type="password"
              placeholder="Teclea tu contraseña anterior"
              disabled={isLoading}
              register={register}
              errors={errors.oldPassword?.message}
              required
              onChange={(event: any) => {
                setCustomValue("oldPassword", event.target.value);
              }}
            />
          </div>
          <div className="w-full">
            <FormInput
              id="newPassword"
              label="Contraseña nueva"
              type="password"
              placeholder="Teclea tu contraseña nueva"
              notes="Min. 8 caracteres, Min. 1 Mayúscula,  Min. 1 Número"
              disabled={isLoading}
              register={register}
              errors={errors.newPassword?.message}
              required
              onChange={(event: any) => {
                setCustomValue("newPassword", event.target.value);
              }}
            />
          </div>
          <div className="w-full">
            <FormInput
              id="confirmPassword"
              label="Confirmar contraseña nueva"
              type="password"
              disabled={isLoading}
              register={register}
              errors={errors.confirmPassword?.message}
              required
              onChange={(event: any) => {
                setCustomValue("confirmPassword", event.target.value);
              }}
            />
          </div>
          <p className="my-1 text-xs text-red-500">{errorMessage}</p>
          <Button
            onClick={handleSubmit(onSubmit)}
            className="mt-4 gap-3 px-2 py-5 bg-rose-500 hover:bg-rose-500/80"
          >
            {isLoading && <PulseLoader size={6} color="#FFFFFF" />}
            Cambiar contraseña
          </Button>
          <hr className="mt-4 mb-1" />

          <Button
            variant={"ghost"}
            className="px-2 font-bold text-center"
            onClick={onForgot}
          >
            Olvidé mi contraseña anterior
          </Button>
        </div>
      ) : (
        <div className="flex flex-col animate-fadeIn animate-scaleIn w-full items-center justify-center gap-4 my-20">
          <BsCheckCircle size={50} className="text-green-500" />
          <p className="text-xs text-neutral-400">Contraseña actualizada</p>
        </div>
      )}
    </div>
  );
};

export default PasswordChange;
