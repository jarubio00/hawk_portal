"use client";
import { ForgotContext } from "@/app/components/auth/forgot/context/ForgotContext";
import { ForgotContextType } from "@/app/types/forgot";
import { useCallback, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import OtpInput from "react-otp-input";
import "@/app/components/auth/register/OtpInput.css";
import { BsCheckCircle } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import OtpTimerForgot from "@/app/components/auth/forgot/OtpTimerForgot";
import { timeClockClasses } from "@mui/x-date-pickers";
import { registerOtp, registerOtpResend, checkOtp } from "@/app/actions/otp";
import { PulseLoader } from "react-spinners";

interface ConfirmationStepProps {
  onClose?: () => void;
  onForgot?: () => void;
  toggleCloseButton?: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  onClose,
  onForgot,
  toggleCloseButton,
}) => {
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

  const [resendTimer, setResendTimer] = useState<Date>();

  const { saveForgot, updateActiveStep, forgot, activeStep } = useContext(
    ForgotContext
  ) as ForgotContextType;

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
      if (toggleCloseButton) {
        toggleCloseButton();
      }

      let result;

      if (forgot?.uuid) {
        result = await checkOtp({
          uuid: forgot?.uuid,
          code: val,
        });
      }

      //console.log(result)

      setOtpEnabled(false);
      if (result && result?.status === 1) {
        if (toggleCloseButton) {
          toggleCloseButton();
        }
        setCodeValidation("correcto");
        setIsValidating(false);
        saveForgot({ ...forgot, code: parseInt(val) });
        const timer = setTimeout(() => {
          updateActiveStep(2);
        }, 500);
      } else {
        if (toggleCloseButton) {
          toggleCloseButton();
        }
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

  const handleResendCode = async (type: string) => {
    setOtp("");
    setErrorMessage("");
    setSendErrorMessage("");
    setOtpEnabled(false);
    if (toggleCloseButton) {
      toggleCloseButton();
    }
    let result;
    if (forgot?.email && forgot?.uuid) {
      result = await registerOtpResend({
        email: forgot?.email,
        phone: "NA",
        uuid: forgot.uuid,
        type: "email",
      });
    }

    //console.log(result);

    if (result && result.status == 1) {
      if (toggleCloseButton) {
        toggleCloseButton();
      }
      setIsLoading(false);
    } else {
      if (toggleCloseButton) {
        toggleCloseButton();
      }
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
        <div className=" text-neutral-400 my-4 text-center text-sm"></div>
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
          <p className="text-xs text-neutral-400">Código correcto</p>
        )}

        {isValidating && <PulseLoader size={6} color="#FF6B00" />}
        <p className="mt-2 text-xs text-red-500 text-left">{errorMessage}</p>
        <div className="my-4 w-full">
          <div className="flex flex-row items-center justify-between">
            <p></p>
            {resendTimer && codeValidation != "correcto" && !isValidating && (
              <OtpTimerForgot
                expiryTimestamp={resendTimer}
                onResendCode={handleResendCode}
                email={forgot?.email}
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
        <Button
          className="w-full mt-4 gap-3 py-5 bg-rose-500 hover:bg-rose-500/80 hover:text-white"
          onClick={handleNext}
          disabled={codeValidation != "correcto"}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
