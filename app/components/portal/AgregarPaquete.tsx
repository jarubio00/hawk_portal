'use client';

    import { Fragment, useCallback, useEffect, useState } from "react";
    import { 
        FieldValues, 
        SubmitHandler, 
        useForm
    } from "react-hook-form";
    import Select from 'react-select'
    import useLoader from "@/app/hooks/useLoader";
    import { useRouter } from 'next/navigation';
    import { PulseLoader } from "react-spinners";
    import { LoadingIndicatorProps } from 'react-select';
    import { BiSearch } from "react-icons/bi";
    import Input from "../inputs/Input";
    import CpInput from "../inputs/CpInput";
    import Button from "../Button";
    import Heading from "../Heading";
    import axios from "axios";
    import BuscarCodigoDialog from "../modals/BuscarCodigoDialog";
    import toast from "react-hot-toast";
    import { SafeUser, ApiResponse } from "@/app/types";
    import { addDireccion, addPaquete } from "@/app/actions/apiQuerys";
    import { calcularTipoPaquete} from "@/app/actions/utils";
    import { Switch } from '@headlessui/react'

    
    const fotoAncho = '/images/paq/paqsAncho.png';
    const fotoAlto = '/images/paq/paqsAlto.png';
    const fotoLargo = '/images/paq/paqsLargo.png';
    const fotoPeso = '/images/paq/paqsPeso.png';

  interface AgregarPaqueteProps {
    title: string;
    currentUser?: SafeUser | null;
    onClose: (value: string) => void;
    tipo: string;
    from: string; // 'menu' , 'pedido'
  }

  const AgregarPaquete: React.FC<AgregarPaqueteProps> = ({
    title,
    currentUser,
    onClose,
    tipo,
    from
  }) => {
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
    const [openBuscarDialog, setOpenBuscarDialog] = useState(false);
    const [saveEnabled, setSaveEnabled] = useState(false);

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
        nombrePaquete: '',
        paqAncho: '',
        paqLargo: '',
        paqAlto: '',
        paqPeso: '',
        paqContenido: '',
        paqTipoId: '',
        paqPesoVol: '',
        paqEmpaqueId: ''
      },
    });

    const ancho = watch('paqAncho');
    const alto = watch('paqAlto');
    const largo = watch('paqLargo');
    const peso = watch('paqPeso');

    

    useEffect(() =>  {
      /* console.log('ancho',ancho);
      console.log('alto',alto);
      console.log('largo',largo);
      console.log('peso',peso); */

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

      //console.log(data);
      loader.onOpen();
      const res = await addPaquete({data: data, currentUser: currentUser});
      if(res.status == 1) {
        toast.success('Paquete creado!');
      } else {
        toast.error(res.statusMessage);
      }
      router.refresh()
      const timer = setTimeout(() => {
        loader.onClose();
      }, 2000);
      onClose('close');
     
    }

    const LoadingIndicator = (props: LoadingIndicatorProps<any>) => {
      return (
          <PulseLoader 
            //@ts-ignore
            size={10}
            color="#F43F5E"
          {...props}  />
       
      );
    };
  
    const onToggleBuscarCp = useCallback(() => {
        //buscarCodigoModal.onOpen();
        setOpenBuscarDialog(!openBuscarDialog)
    }, [openBuscarDialog])

 

    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      })
    }


    return (
      <>
        <div className="w-full 2xl:w-3/4 flex flex-col gap-2 mx-0 md:mx-2 py-2">
          <div >

            <div className="flex w-full flex-row items-center ">
              <div className="flex flex-col gap-4 py-2 pr-2 w-2/5 md:w-1/4 ">
                <div className="flex flex-row items-end">
                  <div className="w-28  pr-2">
                    <Input
                      id="paqAncho"
                      type="number"
                      label="Ancho"
                      disabled={isLoading}
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
                  <span className="text-md">
                    cm
                  </span>
                </div>
                <div className="flex flex-row items-end">
                  <div className="w-28  pr-2">
                    <Input
                      id="paqAlto"
                      type="number"
                      label="Alto"
                      disabled={isLoading}
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
                  <span className="text-md">
                    cm
                  </span>
                </div>
                <div className="flex flex-row items-end">
                  <div className="w-28  pr-2">
                    <Input
                      id="paqLargo"
                      type="number"
                      label="Largo"
                      disabled={isLoading}
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
                  <span className="text-md">
                    cm
                  </span>
                </div>
                <div className="w-28 my-1">
                    <hr></hr>
                </div>
                <div className="flex flex-row items-end">
                  <div className="w-28  pr-2">
                    <Input
                      id="paqPeso"
                      type="number"
                      label="Peso"
                      disabled={isLoading}
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
                  <span className="text-md">
                    kg
                  </span>
                </div>
              </div>

              <div className="w-3/5 md:w-3/4 mx-auto">
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
                          isClearable
                          //@ts-ignore
                          value={tipoPaq ? {label:tipoPaq.tipo, value: tipoPaq.id} : null}
                          //@ts-ignore
                          options={tipoPaq ? {label:tipoPaq.tipo, value: tipoPaq.id} : null}
                          isDisabled
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
                      disabled={isLoading}
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
            <div className="text-sm font-bold text-gray-700 my-2">
              Nombre del paquete
            </div>
            <div className="w-full lg:w-2/4 xl:w-3/5 2xl:w-2/5 pr-4">
              <Input
                id="nombrePaquete"
                label="Nombre del paquete"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                onChange={(event: any) => {
                  setCustomValue('nombrePaquete', event.target.value);
                }}
                />
            </div>

            {from == 'pedido' && <div className="my-2 felx flex-row gap-2 items-center">
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

            <div className="w-40 my-4">
              <Button
                small
                label="Agregar"
                onClick={handleSubmit(onSubmit)}
              
                />
            </div>
          </div>
        </div>
      </>
    );


   

  }
  
  export default AgregarPaquete;


