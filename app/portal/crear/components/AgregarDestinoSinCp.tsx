"use client";

import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import useLoader from "@/app/hooks/useLoader";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import { LoadingIndicatorProps } from "react-select";
import { BiSearch } from "react-icons/bi";
import Input from "@/app/components/inputs/Input";
import CpInput from "@/app/components/inputs/CpInput";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import axios from "axios";
import BuscarCodigoDialog from "@/app/components/modals/BuscarCodigoDialog";
import toast from "react-hot-toast";
import { SafeUser, ApiResponse } from "@/app/types";
import { addDireccion, addDestino, getColoniasSinCobertura } from "@/app/actions/apiQuerys";
import { Switch } from "@headlessui/react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { IoMdClose } from "react-icons/io";
import { PedidoContextType } from "@/app/types/pedido";
import { FaInfoCircle } from "react-icons/fa";
import PedidoConfirmDialog from "@/app/components/modals/PedidoConfirmDialog";
import CrearNextButton from "./CrearNextButton";

interface AgregarDestinoSinCpProps {
  title: string;
  currentUser?: SafeUser | null;
  onClose: (value: Object) => void;
  tipo: string;
  from: string; // 'menu' , 'pedido'
  saved?: boolean;
  direccion?: any;
  onCp: (value: boolean) => void;
  municipios: any;
}

const AgregarDestinoSinCp: React.FC<AgregarDestinoSinCpProps> = ({
  title,
  currentUser,
  onClose,
  tipo,
  from,
  saved = false,
  direccion,
  onCp,
  municipios,
}) => {
  const loader = useLoader();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [coloniasLoading, setColoniasLoading] = useState(false);
  const [cpActive, setCpActive] = useState(false);
  const [coloniaSelected, setColoniaSelected] = useState(null);
  const [colonias, setColonias] = useState([]);
  //const [municipio, setMunicipio] = useState(null);
  const [coloniaPlaceholder, setColoniaPlaceHolder] = useState("Colonia");
  const [contacto, setContacto] = useState({ nombre: "", tel: "" });
  const [misDatosChecked, setMisDatosChecked] = useState(false);
  const [otraColoniaSelected, setOtraColoniaSelected] = useState(false);
  const [cpError, setCpError] = useState({ error: false, errorMessage: "" });
  const [buscarCp, setBuscarCP] = useState(true);
  const [openBuscarDialog, setOpenBuscarDialog] = useState(false);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [cpFromSearch, setCpFromSearch] = useState(0);
  const [usingCpFromSearch, setUsingCpFromSearch] = useState(false);
  const [axiosString, setAxiosString] = useState("");
  const [sinCpDialogOpen, setSinCpDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [customColonias, setCustomColonias] = useState<any[]>([]);
  const [customColoniaError, setCustomColoniaError] = useState(false);

  const normalizeText = (text: string): string => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  };

  const matchesCustomColonia = (input: string, coloniasList: any[]): boolean => {
    const normalizedInput = normalizeText(input);
    if (normalizedInput.length < 3) return false;

    for (const col of coloniasList) {
      const normalizedCol = normalizeText(col.label);

      if (normalizedInput === normalizedCol) return true;

      const stopWords = ["de", "del", "la", "las", "los", "el", "en"];
      const colWords = normalizedCol
        .split(/\s+/)
        .filter((w: string) => !stopWords.includes(w));
      const inputWords = normalizedInput
        .split(/\s+/)
        .filter((w: string) => !stopWords.includes(w));

      const colMatchCount = colWords.filter((w: string) =>
        inputWords.some((iw: string) => iw.includes(w) || w.includes(iw))
      ).length;
      const inputMatchCount = inputWords.filter((iw: string) =>
        colWords.some((w: string) => iw.includes(w) || w.includes(iw))
      ).length;

      const colRatio =
        colWords.length > 0 ? colMatchCount / colWords.length : 0;
      const inputRatio =
        inputWords.length > 0 ? inputMatchCount / inputWords.length : 0;

      if (colRatio >= 0.6 && inputRatio >= 0.6) return true;
    }

    return false;
  };

  const {
    updateActiveStep,
    saveDestino,
    saveDestinoKey,
    pedido,
    updateDestinoCaptured,
    destinoCaptured,
  } = useContext(PedidoContext) as PedidoContextType;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      nombreDireccion: "",
      cp: "",
      colonia: "",
      municipio: "",
      calle: "",
      numero: "",
      numeroInt: "",
      empresa: "",
      referencias: "",
      contactoNombre: "",
      contactoTel: "",
      isOtraColonia: false,
      otraColonia: "",
    },
  });
  const formReset = reset;

  useEffect(() => {
    if (pedido?.destino && destinoCaptured) {
      setCpActive(true);
      setCustomValue("cp", pedido.destino.cpId);
      setCustomValue("colonia", pedido.destino.colonia);
      setCustomValue("municipio", pedido.destino.municipio);
      setCustomValue("calle", pedido.destino.calle);
      setCustomValue("numero", pedido.destino.numero);
      setCustomValue("numeroInt", pedido.destino.numeroInt);
      setCustomValue("empresa", pedido.destino.empresa);
      setCustomValue("referencias", pedido.destino.referencias);
      setCustomValue("contactoNombre", pedido.destino.contactoNombre);
      setCustomValue("contactoTel", pedido.destino.contactoTel);
      setSaveEnabled(pedido?.destino.save || false);
      setCpFromSearch(pedido?.destino.cpId || 0);
      setUsingCpFromSearch(true);
      setColonias(pedido?.destino.coloniasList || []);
    } else {
      reset();
    }
  }, [destinoCaptured]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //loader.onOpen();
    ("sumbit");

    const destino = {
      ...data,
      otraColonia: otraColoniaSelected,
      cpId: 99989,
      sincp: true,
    };

    saveDestino(destino);
    updateDestinoCaptured(true);
    updateActiveStep(2);
    //onClose({apiData: apiData});
  };

  const LoadingIndicator = (props: LoadingIndicatorProps<any>) => {
    return (
      <PulseLoader
        //@ts-ignore
        size={10}
        color="#FF6B00"
        {...props}
      />
    );
  };

  const onToggleBuscarCp = useCallback(() => {
    //buscarCodigoModal.onOpen();
    setOpenBuscarDialog(!openBuscarDialog);
  }, [openBuscarDialog]);

  const contactoNombre = watch("contactoNombre");
  const contactoTel = watch("contactoTel");
  const colonia = watch("colonia");
  const municipio = watch("municipio");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleBack = () => {
    updateActiveStep(0);
  };

  const handleNext = () => {
    if (customColoniaError) return;
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <div className="w-full  flex flex-col gap-2   py-2 ">
        <div className="text-sm font-bold text-gray-700">
          Domicilio de recolección
        </div>
        <div className="flex flex-row items-center gap-1">
          <div>
            <div
              className="
                  pr-4
                  grid
                  grid-cols-1
                  lg:grid-cols-3
                  xl:grid-cols-4
                  md:grid-cols-2
                  gap-4"
            >
              <div className="col-span-2">
                <Input
                  id="calle"
                  label="Calle"
                  disabled={isLoading || saved}
                  register={register}
                  errors={errors}
                  required
                  onChange={(event: any) => {
                    setCustomValue("calle", event.target.value);
                  }}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <Input
                  id="numero"
                  label="Número"
                  disabled={isLoading || saved}
                  register={register}
                  errors={errors}
                  required
                  type="number"
                  maxlength={6}
                  onChange={(event: any) => {
                    setCustomValue("numero", event.target.value);
                  }}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <Input
                  id="numeroInt"
                  label="Interior"
                  disabled={isLoading || saved}
                  register={register}
                  errors={errors}
                  maxlength={5}
                  onChange={(event: any) => {
                    setCustomValue("numeroInt", event.target.value);
                  }}
                />
              </div>
              <div className="col-span-2 md:col-span-2">
                <Select
                  placeholder="Municipio"
                  {...register("municipio", { required: true })}
                  isSearchable={false}
                  required
                  isClearable
                  value={municipio ? municipio : null}
                  options={municipios}
                  isLoading={coloniasLoading}
                  styles={{
                    control: (provided: any, state: any) =>
                      errors.municipio
                        ? {
                            ...provided,
                            borderColor: "#f43f5e",
                            borderWidth: state.isFocused ? 1 : 2,
                          }
                        : { ...provided, borderWidth: 2 },
                  }}
                  classNames={{
                    control: () => "p-2.5 border-rose-500",
                    input: () => "text-lg border-0",
                    option: () => "text-lg",
                  }}
                  theme={(theme: any) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                      ...theme.colors,
                      primary: "black",
                      primary25: "#ffe4e6",
                    },
                  })}
                  onChange={async (val: any) => {
                    setCustomValue("municipio", val);
                    setCustomValue("colonia", "");
                    setCustomColoniaError(false);
                    if (val) {
                      const res = await getColoniasSinCobertura(val.value);
                      setCustomColonias(res.response?.data?.colonias || []);
                    } else {
                      setCustomColonias([]);
                    }
                  }}
                />
              </div>
              <div className="block col-span-2">
                <Input
                  id="colonia"
                  label="Colonia"
                  disabled={isLoading || saved || !municipio}
                  required
                  register={register}
                  errors={errors}
                  onChange={(event: any) => {
                    setCustomValue("colonia", event.target.value);
                    setCustomColoniaError(
                      matchesCustomColonia(event.target.value, customColonias)
                    );
                  }}
                />
                <p className="text-[11px] md:text-xs text-red-500 mt-1">
                  {customColoniaError
                    ? "Esta colonia no tiene cobertura. Verifica o selecciona otra colonia."
                    : ""}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  id="empresa"
                  label="Empresa"
                  disabled={isLoading || saved}
                  register={register}
                  errors={errors}
                  onChange={(event: any) => {
                    setCustomValue("empresa", event.target.value);
                  }}
                />
              </div>
              <div className="col-span-2">
                <Input
                  id="referencias"
                  label="Referencias"
                  disabled={isLoading || saved}
                  register={register}
                  errors={errors}
                  onChange={(event: any) => {
                    setCustomValue("referencias", event.target.value);
                  }}
                />
              </div>
            </div>
            <hr className="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700"></hr>
            <div className="text-sm font-bold text-gray-700 mb-2">
              Datos de contacto de este domicilio
            </div>

            <div
              className="
                  pr-4
                  grid
                  grid-cols-1
                  lg:grid-cols-3
                  xl:grid-cols-4
                  md:grid-cols-2
                  gap-4"
            >
              <Input
                id="contactoNombre"
                label="Nombre contacto"
                value={contactoNombre}
                disabled={misDatosChecked}
                register={register}
                errors={errors}
                required
                onChange={(event: any) => {
                  //setContacto({...contacto,nombre: event.target.value});
                  setCustomValue("contactoNombre", event.target.value);
                  saveDestinoKey("contactoNombre", event.target.value);
                }}
              />
              <Input
                id="contactoTel"
                label="Teléfono contacto"
                type="number"
                value={contactoTel}
                disabled={misDatosChecked}
                register={register}
                errors={errors}
                required
                onChange={(event: any) => {
                  //setContacto({...contacto,tel: event.target.value});
                  setCustomValue("contactoTel", event.target.value);
                  saveDestinoKey("contactoTel", event.target.value);
                }}
                onFocus={(e) =>
                  e.target.addEventListener(
                    "wheel",
                    function (e: any) {
                      e.preventDefault();
                    },
                    { passive: false }
                  )
                }
              />
            </div>

            {tipo == "destino" && from == "pedido" && !saved && (
              <div className="my-2 felx flex-row gap-2 items-center">
                <Switch
                  checked={saveEnabled}
                  disabled={true}
                  onChange={() => reset()}
                  className={`${
                    saveEnabled ? "bg-rose-500" : "bg-gray-400"
                  } relative inline-flex h-4 w-7 items-center rounded-full`}
                >
                  <span
                    className={`${
                      saveEnabled ? "translate-x-3" : "translate-x-1"
                    } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                  />
                </Switch>
                <span className="text-sm font-semibold text-neutral-700 ml-2">
                  No se puede guardar una dirección sin código postal
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex w-full md:w-1/4 mt-6 mb-2">
          <CrearNextButton onClick={handleNext} />
        </div>
      </div>
    </>
  );
};

export default AgregarDestinoSinCp;
