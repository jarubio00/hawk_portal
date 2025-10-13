"use client";
import { PhoneConfirmContext } from "../context/PhoneConfirmContext";
import { PhoneConfirmContextType } from "@/app/types/phoneconfirm";
import { useCallback, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import OtpInput from "react-otp-input";
import "@/app/components/auth/register/OtpInput.css";
import { BsCheckCircle } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import OtpTimer from "../OtpTimerPhoneConfirm";
import { timeClockClasses } from "@mui/x-date-pickers";
import { registerOtp, registerOtpResend, checkOtp } from "@/app/actions/otp";
import { PulseLoader } from "react-spinners";
import { confirmPhone } from "@/app/actions/apiQuerys";

interface ConfirmationStepProps {
  data?: string;
  type?: string;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ data, type }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validating, setValidating] = useState(false);
  const [otp, setOtp] = useState("");
  const [code, setCode] = useState(0);
  const onChange = (value: string) => console.log(value);
  const [codeValidation, setCodeValidation] = useState("pendiente");
  const [otpEnabled, setOtpEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [sendErrorMessage, setSendErrorMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const [resendTimer, setResendTimer] = useState<Date>();

  const { savePhoneConfirm, updateActiveStep, phoneConfirm, activeStep } =
    useContext(PhoneConfirmContext) as PhoneConfirmContextType;

  useEffect(() => {
    startTimer();
  }, []);

  const startTimer = () => {
    const timeToClose = new Date();
    timeToClose.setSeconds(timeToClose.getSeconds() + 3);
    setResendTimer(timeToClose);
  };

  const handleBack = () => {
    updateActiveStep(0);
  };

  const handleNext = () => {
    updateActiveStep(2);
  };

  const handleOtp = async (val: string) => {
    setErrorMessage("");
    setOtp(val);

    if (val.length === 4) {
      setIsValidating(true);
      let result;

      if (phoneConfirm?.uuid) {
        result = await checkOtp({
          uuid: phoneConfirm?.uuid,
          code: val,
        });
      }

      setOtpEnabled(false);
      if (result && result?.status === 1) {
        setCodeValidation("correcto");
        setCode(parseInt(val));
        savePhoneConfirm({ ...phoneConfirm, code: parseInt(val) });

        const confirm = await handleConfirmPhone(parseInt(val));
      } else {
        setIsValidating(false);
        setCodeValidation("incorrecto");
        setErrorMessage(
          result?.statusMessage || "Código incorrecto o expirado"
        );
        setOtp("");
        const timer = setTimeout(() => {
          setOtpEnabled(true);
        }, 500);
      }
    }
  };

  const handleConfirmPhone = async (code: number) => {
    setIsValidating(true);
    setConfirmError(false);
    setErrorMessage("");
    setConfirmMessage("Verificando celular...");

    const confirmed = await confirmPhone({
      email: phoneConfirm?.email,
      uuid: phoneConfirm?.uuid,
      code: code,
      phone: phoneConfirm?.celular,
      countryCode: phoneConfirm?.countryCode,
    });

    if (confirmed && confirmed?.status === 1) {
      setConfirmMessage("Celular verificado");
      const timer = setTimeout(async () => {
        if (type == "profile") {
          router.replace("/portal/adm/miperfil");
        } else {
          router.refresh();
        }
      }, 3000);
    } else {
      setIsValidating(false);
      setConfirmMessage("");
      setErrorMessage("Error al verificar celular");
      setConfirmError(true);
    }
  };

  const handleResendCode = async (type: string) => {
    setOtp("");
    setErrorMessage("");
    setSendErrorMessage("");
    setOtpEnabled(false);
    let result;
    if (phoneConfirm?.celular && phoneConfirm?.uuid) {
      result = await registerOtpResend({
        email: phoneConfirm?.email || "",
        phone: phoneConfirm?.celular,
        uuid: phoneConfirm?.uuid,
        type: type,
      });
    }

    //console.log(result);

    if (result && result.status == 1) {
      setIsLoading(false);
    } else {
      setSendErrorMessage(
        "Error al enviar el código de verificación. Intenta de nuevo o selecciona otro método de envío."
      );
      setIsLoading(false);
    }

    const timer = setTimeout(() => {
      setOtpEnabled(true);
    }, 1000);
  };

  return (
    <div className="m-0">
      {codeValidation != "correcto" ? (
        <div className=" text-neutral-400 my-4 text-center text-sm">
          Ingresa el código que hemos enviado a tu correo electrónico
        </div>
      ) : (
        <div className=" text-neutral-400 my-4 text-center text-sm">
          Código correcto
        </div>
      )}
      <div className="my-8 w-full flex flex-col justify-center items-center mx-auto gap-2">
        {codeValidation != "correcto" ? (
          <OtpInput
            shouldAutoFocus={otpEnabled}
            value={otp}
            onChange={(val) => handleOtp(val)}
            numInputs={4}
            renderSeparator={<span className="mx-1">-</span>}
            renderInput={(props) => (
              <input
                {...props}
                autoComplete="one-time-code"
                disabled={!otpEnabled || isLoading}
                className="!w-12 h-12 md:!w-16 md:h-16 text-2xl text-black border border-input 
            disabled:bg-neutral-200 disabled:text-neutral-400 rounded-md"
              />
            )}
            inputStyle="inputStyle"
            inputType="tel"
          />
        ) : (
          <p className="text-xs text-neutral-400">{confirmMessage}</p>
        )}

        {isValidating && <PulseLoader size={6} color="#FF6B00" />}
        <p className="mt-2 text-xs text-red-500 text-left">{errorMessage}</p>
        <div className="my-4 w-full">
          <div className="flex flex-row items-center justify-between">
            <p></p>
            {resendTimer && codeValidation != "correcto" && !isValidating && (
              <OtpTimer
                expiryTimestamp={resendTimer}
                onResendCode={handleResendCode}
                celular={phoneConfirm?.celular}
              />
            )}
          </div>
        </div>
      </div>

      <p className="mt-2 text-xs text-red-500 text-left">{sendErrorMessage}</p>

      <div className="flex flex-row gap-6 items-center justify-between">
        {codeValidation != "correcto" && (
          <Button
            className="w-full mt-4 gap-3 py-5 "
            variant="outline"
            onClick={handleBack}
            disabled={isLoading}
          >
            Atrás
          </Button>
        )}
        {confirmError && (
          <Button
            className="w-full mt-4 gap-3 py-5"
            variant="outline"
            onClick={() => handleConfirmPhone(code)}
            disabled={isValidating}
          >
            Reintentar
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConfirmationStep;
