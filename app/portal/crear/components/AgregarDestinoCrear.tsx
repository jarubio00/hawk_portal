"use client";

import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
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
import { addDireccion, addDestino } from "@/app/actions/apiQuerys";
import { Switch } from "@headlessui/react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { IoMdClose } from "react-icons/io";
import { PedidoContextType } from "@/app/types/pedido";
import { FaInfoCircle } from "react-icons/fa";
import ConfirmDialog from "@/app/components/modals/ConfirmDialog";
import { ErrorMessage } from "@hookform/error-message";
import { MdInfo } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

interface AgregarDestinoCrearProps {
  title: string;
  currentUser?: SafeUser | null;
  onClose: (value: Object) => void;
  tipo: string;
  from: string; // 'menu' , 'pedido'
  saved?: boolean;
  direccion?: any;
  onCp: (value: boolean) => void;
  onMove: (value: any) => void;
}

const AgregarDestinoCrear: React.FC<AgregarDestinoCrearProps> = ({
  title,
  currentUser,
  onClose,
  tipo,
  from,
  saved = false,
  direccion,
  onCp,
  onMove,
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
  const [axiosString, setAxiosString] = useState({});
  const [sinCpDialogOpen, setSinCpDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [coloniaTooltip, setColoniaTooltip] = useState(false);
  const [coloniaError, setColoniaError] = useState(false);

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
    getValues,
    handleSubmit,
    setValue,
    watch,
    setError,
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

  //console.log('agr dir:', direccion)
  useEffect(() => {
    console.log("saved", saved);
    if (!saved) {
      reset();
      setCpActive(false);
      setUsingCpFromSearch(false);
      setCpFromSearch(0);
    }
  }, [saved]);

  useEffect(() => {
    console.log(direccion);
    if (direccion && saved) {
      setCpActive(true);
      setCustomValue("cp", direccion.cpId);
      setCustomValue("colonia", {
        label: direccion.colonia,
        value: direccion.value,
      });
      setCustomValue("municipio", direccion.municipio);
      setCustomValue("calle", direccion.calle);
      setCustomValue("numero", direccion.numero);
      setCustomValue("numeroInt", direccion.numeroInt);
      setCustomValue("empresa", direccion.empresa);
      setCustomValue("referencias", direccion.referencias);
      setCustomValue("contactoNombre", direccion.contactoNombre);
      setCustomValue("contactoTel", direccion.contactoTel);
    }
  }, [direccion]);

  useEffect(() => {
    if (pedido?.destino && destinoCaptured) {
      setCpActive(true);
      setCustomValue("cp", pedido.destino.cpId);
      setCustomValue("colonia", {
        label: pedido.destino.colonia,
        value: pedido.destino.colonia,
      });
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
    }
  }, [destinoCaptured]);

  useEffect(() => {
    if (saved) {
      setCpError({ error: false, errorMessage: "" });
    }
  }, [saved]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("on submit");
    console.log(data.colonia);
    if (otraColoniaSelected && !data?.otraColonia) {
      setError("otraColonia", {
        type: "custom",
        message: "La colonia es requerida",
      });
    } else {
      const destino = {
        ...data,
        otraColonia: otraColoniaSelected,
        colonia: otraColoniaSelected ? data?.otraColonia : data?.colonia?.label,
        cpId: data.cp,
        sincp: false,
        save: saveEnabled,
        coloniasList: colonias,
      };

      //@ts-ignore
      saveDestino(destino);
      updateDestinoCaptured(true);
      updateActiveStep(2);
    }

    //onClose({apiData: apiData});
    //onMove('destino');
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

  const getColonias = (cp: any, colonia?: any) => {
    setColoniasLoading(true);
    loader.onOpen();
    //loader.onOpen();

    axios
      .post(`/api/colonias/${cp}`)
      .then((response) => {
        console.log("colonias", response.data);
        const r = response.data;

        if (r.status == 1) {
          setCpActive(true);
          setColoniasLoading(false);
          setColonias(response.data.colonias);
          setCustomValue("municipio", response.data.codigo.municipio);
          setCustomValue("cp", cp);
          setCpError({ error: false, errorMessage: "" });
          setUsingCpFromSearch(true);
          setCpFromSearch(cp);

          if (colonia) {
            setCustomValue("colonia", colonia);
          } else {
            setColoniaPlaceHolder(
              `Selecciona una colonia (${response.data.colonias.length - 1})`
            );
          }
        } else {
          setColoniasLoading(false);
          setCpActive(false);
          setCpError({ error: true, errorMessage: "Código postal inválido" });
        }

        loader.onClose();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loader.onClose();
      });
  };

  //@ts-ignore
  const useCp = (cp) => {
    setUsingCpFromSearch(true);
    setCpFromSearch(cp.id);
    setCustomValue("cp", cp.id);
    getColonias(cp.id, { label: cp.col, value: cp.id });
  };

  const handleOnCancelCp = () => {
    setOtraColoniaSelected(false);
    setUsingCpFromSearch(false);
    setCpFromSearch(0);
    formReset();
    setCpActive(false);
    saveDestino({});
  };

  const handleSinCpDialog = () => {
    setDialogContent({
      title: "Continuar sin Código Postal",
      notes:
        "El código postal es requerido en nuestro proceso de automatización. Si continuas sin él, el tiempo de entrega de tu envío es posible que aumente 24hrs.",
      action: "Estas seguro de borrar",
      object: {},
      data: {},
      tipo: "confirm",
    });
    setSinCpDialogOpen(true);
  };

  const handleConfirmSinCp = (props: any) => {
    if (props.confirm) {
      if (props.tipo == "confirm") {
        setSinCpDialogOpen(false);
        onCp(true);
      }
    } else {
      setSinCpDialogOpen(false);
    }
  };

  const handleBack = () => {
    updateActiveStep(0);
  };

  const handleNext = () => {
    if (!saved) {
      if (cpActive) {
        if (!otraColoniaSelected && !getValues().colonia) {
          console.log("error colonia");
          setColoniaError(true);
        } else {
          console.log("next else");
          setCustomValue("cp", cpFromSearch);
          console.log("handle next before submit");
          handleSubmit(onSubmit)();
        }

        //
      } else {
        setCpError({
          error: true,
          errorMessage: "El Código Postal no ha sido capturado",
        });
      }
    } else {
      updateActiveStep(2);
    }

    //updateActiveStep(2);
  };

  const handleSaveDireccion = (event: any) => {
    setSaveEnabled(event);
  };

  const addContent = (type: any) => {
    return (
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
          <TooltipProvider>
            <Tooltip open={coloniaTooltip}>
              <TooltipTrigger asChild>
                <div
                  className={`${
                    otraColoniaSelected
                      ? "col-span-2 md:col-span-1"
                      : "col-span-2"
                  }`}
                >
                  <div
                    className={`${
                      coloniaError && "border-2 border-red-500 rounded-md"
                    }`}
                  >
                    <Select
                      id="colonia"
                      //@ts-ignore
                      register={register}
                      onFocus={() => setColoniaTooltip(true)}
                      onBlur={() => setColoniaTooltip(false)}
                      placeholder={coloniaPlaceholder}
                      onChange={(val: any) => {
                        setColoniaError(false);
                        if (val) {
                          if (val.value && val.value == 9999) {
                            setOtraColoniaSelected(true);
                            setCustomValue("isOtraColonia", true);
                            setCustomValue("colonia", val);
                          } else {
                            setOtraColoniaSelected(false);
                            setCustomValue("isOtraColonia", false);
                            setCustomValue("otraColonia", "");
                            setCustomValue("colonia", val);
                          }
                        }
                      }}
                      value={colonia ? colonia : null}
                      //isClearable
                      options={colonias}
                      isLoading={coloniasLoading}
                      isDisabled={!cpActive || saved}
                      classNames={{
                        control: () => "p-2 border-2",
                        input: () => "text-lg",
                        option: () => "text-lg",
                      }}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 6,
                        colors: {
                          ...theme.colors,
                          primary: "black",
                          primary25: "#ffe4e6",
                        },
                      })}
                      components={{ LoadingIndicator }}
                    />
                  </div>
                  <p className="text-[11px] md:text-xs text-red-500 mt-1">
                    {coloniaError
                      ? "Selecciona la colonia de la lista, si no se encuentra selecciona OTRA COLONIA e ingresala en el campo que aparece."
                      : ""}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex flex-col w-72 p-2">
                  <p>
                    Si tu colonia no aparece en la lista selecciona la opción
                    OTRA COLONIA e ingresa el nombre de tu colonia.
                  </p>
                </div>
                <TooltipPrimitive.Arrow width={11} height={5} />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div
            className={`${otraColoniaSelected ? "block col-span-2" : "hidden"}`}
          >
            <Input
              id="otraColonia"
              label="Ingresa el nombre de la colonia"
              disabled={isLoading || saved}
              register={register}
              errors={errors}
              onChange={(event: any) => {
                //console.log(event.target.value);
                //setCustomValue("colonia", event.target.value);
                setCustomValue("otraColonia", event.target.value);
              }}
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Select
              placeholder="Municipio"
              //@ts-ignore
              register={register}
              isClearable
              //@ts-ignore
              value={
                municipio
                  ? { label: municipio.municipio, value: municipio.id }
                  : null
              }
              //@ts-ignore
              options={
                municipio
                  ? [{ label: municipio.municipio, value: municipio.id }]
                  : null
              }
              isDisabled
              isLoading={coloniasLoading}
              classNames={{
                control: () => "p-2 border-2",
                input: () => "text-lg",
                option: () => "text-lg",
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  primary: "black",
                  primary25: "#ffe4e6",
                },
              })}
              components={{ LoadingIndicator }}
            />
          </div>
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
              maxlength={10}
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
              label="Referencias / entre calles"
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
            onWheel={(e) => e.target.blur()}
            onFocus={(e) =>
              e.target.addEventListener(
                "wheel",
                function (e: any) {
                  e.preventDefault();
                },
                { passive: false }
              )
            }
            onChange={(event: any) => {
              //setContacto({...contacto,tel: event.target.value});
              setCustomValue("contactoTel", event.target.value);
              saveDestinoKey("contactoTel", event.target.value);
            }}
          />
        </div>

        {tipo == "direccion" && (
          <>
            <hr className="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700"></hr>
            <div className="text-sm font-bold text-gray-700 my-2">
              Nombre de la dirección (Ej. Casa)
            </div>
            <div className="w-full lg:w-2/4 xl:w-3/5 2xl:w-2/5 pr-4">
              <Input
                id="nombreDireccion"
                label="Nombre direccion"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                onChange={(event: any) => {
                  setCustomValue("nombreDireccion", event.target.value);
                }}
              />
            </div>
          </>
        )}

        {tipo == "destino" && from == "pedido" && !saved && (
          <div className="my-2 felx flex-row gap-2 items-center">
            <Switch
              checked={saveEnabled}
              onChange={(event) => handleSaveDireccion(event)}
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
              Guardar en mis destinos favoritos
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <ConfirmDialog
        isOpen={sinCpDialogOpen}
        onClose={handleConfirmSinCp}
        dialogContent={dialogContent}
      />
      <BuscarCodigoDialog
        onClose={onToggleBuscarCp}
        useCp={useCp}
        isOpen={openBuscarDialog}
      />
      <div className="w-full  flex flex-col gap-2   py-2 ">
        <div className="text-sm font-bold text-gray-700">
          Domicilio de entrega
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="w-40 sm:w-56 pr-4">
            <CpInput
              id="cp"
              label="Código postal"
              disabled={coloniasLoading || saved || usingCpFromSearch}
              isLoading={coloniasLoading}
              register={register}
              errors={errors}
              required
              type="number"
              maxlength={5}
              cpError={cpError.error}
              onChange={(event: any) => {
                if (event.target.value.length == 5) {
                  getColonias(event.target.value);
                } else {
                  setColonias([]);
                  setColoniaSelected(null);
                  setColoniaPlaceHolder(`Colonia`);
                  setCustomValue("municipio", null);
                  setCustomValue("colonia", null);
                  setCpError({ error: false, errorMessage: "" });
                  setCpActive(false);
                }
              }}
            />
            <div className="flex text-xs ml-1 text-red-500 my-1">
              {cpError.error ? cpError.errorMessage : ""}
            </div>
          </div>
          {!usingCpFromSearch && !coloniasLoading && !saved ? (
            <div className="flex flex-row items-center content-center mb-1 ">
              <BiSearch size={16} className="text-blue-500" />
              <div
                className="text-sm text-blue-500 font-medium pb-0 cursor-pointer"
                onClick={onToggleBuscarCp}
              >
                Buscar por colonia
              </div>
            </div>
          ) : (
            <>
              {!saved && cpFromSearch != 0 && (
                <div className="flex ">
                  <div className=" flex flex-row items-center gap-2 ml-2 text-white text-sm bg-blue-gray-300 rounded-sm px-2">
                    <span>{cpFromSearch}</span>
                    <IoMdClose
                      size={18}
                      onClick={handleOnCancelCp}
                      className="hover:text-red-600"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {!cpActive && !coloniasLoading && (
          <div
            className="flex flex-row  items-center text-md text-neutral-500 mt-10 gap-2 cursor-pointer underline"
            onClick={handleSinCpDialog}
          >
            <FaInfoCircle size={16} className="text-rose-500" />
            <div className="text-sm font-medium text-rose-500 underline  ">
              Continuar sin código postal
            </div>
          </div>
        )}

        {cpActive ? addContent("conCP") : ""}
        {/* <div className="my-4 flex flex-row items-center gap-4">
          <Button outline label="Atras" onClick={handleBack} />
          <Button label="Siguiente" onClick={handleNext} />
        </div> */}

        <div>
          {pedido?.destino?.municipioId !== 10 ? (
            <div className="my-4 flex flex-row items-center gap-4">
              <Button outline label="Atras" onClick={handleBack} />
              <Button label="Siguiente" onClick={handleNext} />
            </div>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button label="Siguiente" onClick={() => {}} disabled={false} />
              </AlertDialogTrigger>
              <AlertDialogContent className=" ">
                <AlertDialogHeader>
                  <AlertDialogTitle>RUTA CADEREYTA</AlertDialogTitle>
                  <AlertDialogDescription className="text-black">
                    Te recordamos que nuestra ruta de entregas en el municipio
                    de Cadereyta es únicamente los días sábados en el bloque 1
                    (entre 10:00 y 15:00 hrs).
                    <p className="mt-4 text-xs font-bold">
                      Puedes generar el envío en cualquier momento y será
                      entregado el siguiente día sábado hábil.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-8 gap-2 md:gap-0">
                      <div className="flex flex-row gap-1 items-center">
                        <MdPhone className="text-white p-1 h-6 w-6 bg-deep-orange-400 rounded-full" />
                        <p className="text-grey-800 font-bold text-xs">
                          81 4738 09 49
                        </p>
                      </div>
                      <div className="flex flex-row gap-1 items-center">
                        <FaWhatsapp className="text-white p-1 h-6 w-6 bg-green-500 rounded-full" />
                        <p className="text-grey-800 font-bold text-xs">
                          81 1553 83 33
                        </p>
                      </div>
                      <div className="flex flex-row gap-1 items-center">
                        <MdEmail className="text-white p-1 h-6 w-6 bg-amber-700 rounded-full" />
                        <p className="text-grey-800 font-bold text-xs">
                          contacto@lamensajeria.mx
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-rose-500 text-xs">
                      Horario de atención Lunes a viernes de 9 am a 6 pm /
                      sábado de 9 am a 1 pm
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="px-4 mx-4">
                    Regresar
                  </AlertDialogCancel>
                  <AlertDialogAction className="px-4 mx-4" onClick={handleNext}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </>
  );
};

export default AgregarDestinoCrear;
