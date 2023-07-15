'use client';

    import { Fragment, useContext, useEffect, useState } from "react";
    import { 
        FieldValues, 
        SubmitHandler, 
        useForm
    } from "react-hook-form";
    import Select from 'react-select'
    import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
    import { PedidoContextType } from "@/app/types/pedido";
    import useLoader from "@/app/hooks/useLoader";
    import { useRouter } from 'next/navigation';
    import { PulseLoader } from "react-spinners";
    import { LoadingIndicatorProps } from 'react-select';
    import { BiSearch } from "react-icons/bi";
    import Input from "@/app/components/inputs/Input";
    import CpInput from "@/app/components/inputs/CpInput";
    import Button from "@/app/components/Button";

    import toast from "react-hot-toast";
    import { SafeUser} from "@/app/types";
    import { calcularTipoPaquete} from "@/app/actions/utils";
    import { Switch } from '@headlessui/react'
    import PaqInput from "@/app/components/inputs/PaqInput";
    import { AiFillDollarCircle} from "react-icons/ai";
    import CobrosDialog from "./dialogs/CobrosDialog";

    
    const fotoAncho = '/images/paq/paqsAncho.png';
    const fotoAlto = '/images/paq/paqsAlto.png';
    const fotoLargo = '/images/paq/paqsLargo.png';
    const fotoPeso = '/images/paq/paqsPeso.png';

  interface AgregarPaqueteCrearProps {
    title: string;
    currentUser?: SafeUser | null;
    onClose: (value: string) => void;
    tipo: string;
    from: string; // 'menu' , 'pedido'
    saved: boolean;
    paquete?: any;
  }

  const AgregarPaqueteCrear: React.FC<AgregarPaqueteCrearProps> = ({
    title,
    currentUser,
    onClose,
    tipo,
    from,
    saved,
    paquete
  }) => {

    const {updateActiveStep, savePaquete,saveCobro, pedido} = useContext(PedidoContext) as PedidoContextType;

    const loader = useLoader();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [fotoPaq, setFotoPaq] = useState('');
    const [notas, setNotas] = useState('');
    const [pesoVol, setPesoVol] = useState(0);
    const [pesoPaq, setPesoPaq] = useState(0);
    const [tipoPaq, setTipoPaq] = useState({});
    const [cpActive, setCpActive] = useState(false);
    const [coloniaSelected, setColoniaSelected] = useState(null);
    const [colonias, setColonias] = useState([]);
    //const [municipio, setMunicipio] = useState(null);
    const [coloniaPlaceholder, setColoniaPlaceHolder] = useState('Colonia');
    const [contacto,setContacto] = useState({nombre: "", tel: ""});
    const [misDatosChecked, setMisDatosChecked] = useState(false);
    const [otraColoniaSelected, setOtraColoniaSelected] = useState(false);
    const [cpError, setCpError] = useState({error: false, errorMessage: ''});
    const [buscarCp, setBuscarCP] = useState(true);
    const [cobrosDialogOpen, setCobrosDialogOpen] = useState(false);
    const [saveEnabled, setSaveEnabled] = useState(pedido?.paquete?.save ? pedido?.paquete?.save : false );
    const [quitarConfirm, setQuitarConfirm] = useState(false);
    const [resetCobro, setResetCobro] = useState(false);
    const [editCobro, setEditCobro] = useState(false);



    

    const { 
      register, 
      handleSubmit,
      setValue,
      watch,
      formState: {
        errors,
      },
      reset
    } = useForm<FieldValues>({
      defaultValues: {
        nombrePaquete: pedido?.paquete?.nombrePaquete ? pedido?.paquete?.nombrePaquete : '',
        paqAncho: pedido?.paquete?.paqAncho ? pedido?.paquete?.paqAncho : '',
        paqLargo: pedido?.paquete?.paqLargo ? pedido?.paquete?.paqLargo : '',
        paqAlto: pedido?.paquete?.paqAlto ? pedido?.paquete?.paqAlto: '',
        paqPeso: pedido?.paquete?.paqPeso ? pedido?.paquete?.paqPeso : '',
        paqContenido: pedido?.paquete?.paqContenido ? pedido?.paquete?.paqContenido : '',
        paqTipoId: '',
        paqPesoVol: '',
        paqEmpaqueId: '',
      },
    });

    useEffect(() => {
      if(!saved) {
        reset();
      }
    },[saved])

    useEffect(() =>{
      console.log(paquete);
      if(paquete && saved) {
        setCpActive(true);
        setCustomValue('paqAncho', paquete.paqAncho);
        setCustomValue('paqAlto', paquete.paqAlto);
        setCustomValue('paqLargo', paquete.paqLargo);
        setCustomValue('paqContenido', paquete.paqContenido);
        setCustomValue('nombrePaquete', paquete.nombrePaquete);
        setCustomValue('paqPeso', paquete.paqPeso);
      }
    },[paquete])

    const ancho = watch('paqAncho');
    const alto = watch('paqAlto');
    const largo = watch('paqLargo');
    const peso = watch('paqPeso');

    

    useEffect(() =>  {
      if (ancho  && alto && largo && peso ) {
        setPesoVol((ancho*alto*largo)/5000);
        const tipo: any = calcularTipoPaquete({pesoVol: (ancho*alto*largo)/5000, pesoPaq: peso });
        //@ts-ignore
        if (tipo.id == 0) {
          
          toast.error('Las medidas o el peso exceden el máximo o son inválidos');
          setCustomValue('paqPeso','');
          setTipoPaq({})
        } else {
          setTipoPaq(tipo);
          setCustomValue('paqTipoId', tipo.id);
          setCustomValue('paqEmpaqueId', 1);
          setCustomValue('paqPesoVol', tipo.pesoMax);
        }
      } else {
        setPesoVol(0);
        setTipoPaq('');
      }
    }, [ancho, alto, largo, peso]);
    
    const onSubmit:  SubmitHandler<FieldValues> = 
    async (data) => {

      

      const paquete = {
        ...data,
        //@ts-ignore
        tipo: {id: tipoPaq.id, tipo: tipoPaq.tipo, desc: tipoPaq.tipo},
        save: saveEnabled
      }
      savePaquete(paquete);
      updateActiveStep(3);
     
    }

    const LoadingIndicator = (props: LoadingIndicatorProps<any>) => {
      return (
          <PulseLoader 
            //@ts-ignore
            size={10}
            color="#FF6B00"
          {...props}  />
       
      );
    };
  
   
    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      })
    }

    const handleCobroDialogClose = (props: any) => {
      if(props.confirm) {
        saveCobro(props.data.cantidad);
        setCobrosDialogOpen(false)
      } else {
        //saveCobro(0);
        //setResetCobro(true);
        setCobrosDialogOpen(false)
      }
      
    }

    const handleBack = () => {
      updateActiveStep(1)
    }
    
    const handleNext = () => {
      //updateActiveStep(3);
      handleSubmit(onSubmit)();
      
    }

    function currencyFormat(num: any) {
      return  Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
   }

   const handleCancelCobro = () => {
    saveCobro(0);
    setResetCobro(true);
   }

   const handleEditCobro = () => {
    setEditCobro(true);
     setCobrosDialogOpen(true);
   }

    return (
      <>
      <CobrosDialog isOpen={cobrosDialogOpen} onClose={handleCobroDialogClose} resetCobro={resetCobro} editCobro={editCobro}/>
        <div className="w-full 2xl:w-3/4 flex flex-col gap-2 mx-0 md:mx-2 py-2">
          <div >

            <div className="flex w-full flex-row items-center justify-between ">
              <div className="flex flex-col gap-4 py-2 pr-2 ">
                <div className="flex flex-row items-end">
                  <div className="w-28  pr-1">
                    <PaqInput
                      id="paqAncho"
                      type="number"
                      label="Ancho"
                      value={ancho}
                      disabled={isLoading || saved}
                      register={register}
                      errors={errors}
                      required
                      onChange={(event: any) => {
                        setCustomValue('paqAncho', event.target.value);
                      }}
                      onFocus={() => {
                        setFotoPaq(fotoAncho)
                        setNotas('Las medidas en centímetros')
                      }}
                      onBlur={() => {
                        setFotoPaq('')
                        setNotas('')
                      }}
                      />
                  </div>
                  <span className="text-xs">
                    cm
                  </span>
                </div>
                <div className="flex flex-row items-end">
                  <div className="w-28  pr-1">
                    <PaqInput
                      id="paqAlto"
                      type="number"
                      label="Alto"
                      disabled={isLoading || saved}
                      register={register}
                      errors={errors}
                      required
                      onChange={(event: any) => {
                        setCustomValue('paqAlto', event.target.value);
                      }}
                      onFocus={() => {
                        setFotoPaq(fotoAlto)
                        setNotas('Las medidas en centímetros')
                      }}
                      onBlur={() => {
                        setFotoPaq('')
                        setNotas('')
                      }}
                      />
                  </div>
                  <span className="text-xs">
                    cm
                  </span>
                </div>
                <div className="flex flex-row items-end">
                  <div className="w-28  pr-1">
                    <PaqInput
                      id="paqLargo"
                      type="number"
                      label="Largo"
                      disabled={isLoading || saved}
                      register={register}
                      errors={errors}
                      required
                      onChange={(event: any) => {
                        setCustomValue('paqLargo', event.target.value);
                      }}
                      onFocus={() => {
                        setFotoPaq(fotoLargo)
                        setNotas('Las medidas en centímetros')
                      }}
                      onBlur={() => {
                        setFotoPaq('')
                        setNotas('')
                      }}
                      />
                  </div>
                  <span className="text-xs">
                    cm
                  </span>
                </div>
                <div className="w-28 my-1">
                    <hr></hr>
                </div>
                <div className="flex flex-row items-end">
                  <div className="w-28  pr-1">
                    <PaqInput
                      id="paqPeso"
                      type="number"
                      label="Peso"
                      disabled={isLoading || saved}
                      register={register}
                      errors={errors}
                      required
                      onChange={(event: any) => {
                        setCustomValue('paqPeso', event.target.value);
                        event.target.value ? setPesoPaq(parseFloat(event.target.value)) : setPesoPaq(0);
                      }}
                      onFocus={() => {
                        setFotoPaq(fotoPeso)
                        setNotas('El peso en kilogramos. Utiliza decimales para menos de 1 Kg. Ej. medio kilo = .5 kg');
                      }}
                      onBlur={() => {
                        setFotoPaq('')
                        setNotas('')
                      }}
                      
                      />
                  </div>
                  <span className="text-xs">
                    kg
                  </span>
                </div>
              </div>

              <div className="">
                {fotoPaq != '' && 
                <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 text-center">
                  <img src={fotoPaq}></img>
                  <span className="text-xs text-blue-500">{notas}</span>
                </div>
                }
              </div>
            </div>
            <hr className="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700"></hr>
            <div className="">
              <div className="text-sm font-bold text-gray-700 my-2">
                Paquete
              </div>
              <div className="
                  grid
                  grid-cols-1
                  lg:grid-cols-3
                  xl:grid-cols-4
                  md:grid-cols-2
                  gap-4">
                  <div className="col-span-1">
                    <Select
                      placeholder="Tipo del paquete"
                      //@ts-ignore
                      register={register}
                      isSearchable={false}
                      isClearable
                      //@ts-ignore
                      value={tipoPaq ? {label:tipoPaq.tipo, value: tipoPaq.id} : null}
                      //@ts-ignore
                      options={tipoPaq ? {label:tipoPaq.tipo, value: tipoPaq.id} : null}
                      isDisabled={true}
                      isLoading={false}
                      classNames={{
                          control: () => 'p-2 border-2',
                          input: () => 'text-lg',
                          option: () => 'text-lg'
                          }}
                      theme={(theme) => ({
                      ...theme,
                      borderRadius: 6,
                      colors: {
                          ...theme.colors,
                          primary: 'black',
                          primary25: '#ffe4e6'
                      }
                      })}
                      components={{ LoadingIndicator }}
                      />
                  </div>
                  <div className="col-span-2">
                    <Input
                      id="paqContenido"
                      label="Contenido del paquete"
                      disabled={isLoading || saved}
                      register={register}
                      errors={errors}
                      required
                      onChange={(event: any) => {
                        setCustomValue('paqContenido', event.target.value);
                      }}
                      />
                  </div>
              </div>
            </div>
            <hr className="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700"></hr>
            {from == 'pedido' && !saved && <div className="my-2 felx flex-row gap-2 items-center">
              <Switch
                checked={saveEnabled}
                onChange={setSaveEnabled}
                className={`${
                  saveEnabled ? 'bg-rose-500' : 'bg-gray-400'
                } relative inline-flex h-4 w-7 items-center rounded-full`}
              >
                <span
                  className={`${
                    saveEnabled ? 'translate-x-3' : 'translate-x-1'
                  } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                />
              </Switch>
              <span className="text-sm font-semibold text-neutral-700 ml-2">Guardar en paquetes favoritos</span>
            </div>}
            {saveEnabled && <div>
              <div className="text-sm font-bold text-gray-700 my-2">
                Nombre del paquete
              </div>
              <div className="w-full lg:w-2/4 xl:w-3/5 2xl:w-2/5 pr-4">
                <Input
                  id="nombrePaquete"
                  label="Nombre del paquete"
                  disabled={isLoading || saved}
                  register={register}
                  errors={errors}
                  required
                  onChange={(event: any) => {
                    setCustomValue('nombrePaquete', event.target.value);
                  }}
                  />
              </div>
            </div>
            }

            {pedido && !pedido?.cobro ? <div className="flex flex-row  items-center text-md text-neutral-500 my-10 gap-2 cursor-pointer underline" 
                onClick={() => {
                  setResetCobro(false)
                  setCobrosDialogOpen(true)}}
              >
                <AiFillDollarCircle size={22} className="text-rose-500"/>
                <div className="text-sm font-medium text-rose-500 underline  ">
                  Agregar cobro a destinatario
                
                </div>
              </div> : 

              <div className="flex flex-col my-10">
                <div className="flex flex-row  items-center text-md text-blue-500  gap-2">
                    <AiFillDollarCircle size={22} className=""/>
                    <div className="text-sm font-medium  ">
                      Se cobrarán <span className="font-semibold">${pedido?.cobroCantidad && currencyFormat(pedido?.cobroCantidad)}</span> al destinatario
                    </div>
                </div>
                <div  className="flex flex-row gap-2 ml-10">
                  <div  className="cursor-pointer" onClick={handleEditCobro}>
                    <span className="text-xs text-neutral-600">Editar</span>
                  </div>
                  <div className="cursor-pointer" onClick={handleCancelCobro}>
                    <span className="text-xs text-neutral-600">Quitar</span>
                  </div>
                </div>
              </div>
            }

           

            <div className="my-4 flex flex-row items-center gap-4"> 
              <Button 
                  outline
                  label='Atras'
                  onClick={handleBack}
              />
              <Button 
                  label='Siguiente'
                  onClick={handleNext}
              />
            </div>
          </div>
        </div>
      </>
    );


   

  }
  
  export default AgregarPaqueteCrear;


