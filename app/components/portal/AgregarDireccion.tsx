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
    import { addDireccion, addDestino } from "@/app/actions/apiQuerys";
    import { Switch } from '@headlessui/react'
import NombreDireccionInput from "../inputs/NombreDireccionInput";
import { Badge } from "@/components/ui/badge";
import {FaHome,FaStore,FaBuilding,FaWarehouse} from "react-icons/fa"
    


  interface AgregarDireccionProps {
    title: string;
    currentUser?: SafeUser | null;
    onClose: (value: Object) => void;
    tipo: string;
    from: string; // 'menu' , 'pedido', 'auth'
    saved?: boolean;
    direccion?: any;
  }

  const AgregarDireccion: React.FC<AgregarDireccionProps> = ({
    title,
    currentUser,
    onClose,
    tipo,
    from,
  }) => {
    const loader = useLoader();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [coloniasLoading, setColoniasLoading] = useState(false);
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
    const [nombreColor, setNombreColor] = useState('#0ea5e9')
    const [nombreIcon, setNombreIcon] = useState('home')
    
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
        nombreDireccion: '',
        cp:  '',
        colonia:  '',
        municipio: '',
        calle: '',
        numero: '',
        interior: '',
        empresa: '',
        referencias: '',
        contactoNombre:  '',
        contactoTel: '',
        isOtraColonia: false,
        otraColonia:  ''
      },
    });

    //console.log('agr dir:', direccion)
   
    
    const onSubmit:  SubmitHandler<FieldValues> = 
    async (data) => {
      loader.onOpen();

      const apiData = {
        data: {...data,icon: nombreIcon, color: nombreColor}, 
        currentUser: currentUser, 
        otraColoniaSelected: otraColoniaSelected,
        
      }

      onClose({apiData: apiData});
    
     
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
  
    const onToggleBuscarCp = useCallback(() => {
        //buscarCodigoModal.onOpen();
        setOpenBuscarDialog(!openBuscarDialog)
    }, [openBuscarDialog])

    const contactoNombre = watch('contactoNombre');
    const contactoTel = watch('contactoTel');
    const colonia = watch('colonia');
    const municipio = watch('municipio');

    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      })
    }

 

    const getColonias = (cp: any, colonia?: any) => { 
      setColoniasLoading(true);
      loader.onOpen();
      //loader.onOpen();
  
      axios.post(`/api/colonias/${cp}`)
      .then((response) => {
        console.log('colonias', response.data);
        const r= response.data;

        if(r.status == 1) {
          setCpActive(true);
          setColoniasLoading(false);
          setColonias(response.data.colonias);
          setCustomValue('municipio', response.data.codigo.municipio);
          setCustomValue('cp', cp);
          setCpError({error: false, errorMessage: ''})

            if(colonia) {
              setCustomValue('colonia', colonia)
            } else {
              setColoniaPlaceHolder(`Selecciona una colonia (${response.data.colonias.length -1})`)
            }
         
          
        } else {
          setColoniasLoading(false);
          setCpActive(false);
          setCpError({error: true, errorMessage: 'Código postal inválido'});
        }
        
        loader.onClose();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
       loader.onClose();
      })
    }

    const nombreValue = watch('nombreDireccion');

    const handleColor = (val: string) => {
      setNombreColor(val);
      console.log(val)
    }
  
    const handleIcon = (val: string) => {
      setNombreIcon(val);
      console.log(val)
    }

    const addContent = (type: any) => { 
      
      return (
      <div >
              <div className="
                  pr-4
                  grid
                  grid-cols-1
                  lg:grid-cols-3
                  xl:grid-cols-4
                  md:grid-cols-2
                  gap-4">
              
                  <div className={`${otraColoniaSelected ? "col-span-2 md:col-span-1" : "col-span-2"}`}>
                    <Select
                        id="colonia"
                        //@ts-ignore
                        register={register}
                        placeholder={coloniaPlaceholder}
                        onChange={(val: any) => {
              
                          if (val.value && val.value == 9999) {
                            setOtraColoniaSelected(true);
                            setCustomValue('isOtraColonia', true);
                            setCustomValue('colonia', val)
                          } else {
                            setOtraColoniaSelected(false);
                            setCustomValue('isOtraColonia', false);
                            setCustomValue('otraColonia', '');
                            setCustomValue('colonia', val)
                          }
              
                        }}
                        value={colonia ? colonia : null}
                        isClearable
                        options={colonias}
                        isLoading={coloniasLoading}
                        isDisabled={!cpActive}
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
                  <div className={`${otraColoniaSelected ? "block col-span-2" : "hidden"}`}>
                    <Input
                          id="otraColonia"
                          label="Otra Colonia"
                          disabled={isLoading}
                          register={register}
                          errors={errors}
                          onChange={(event: any) => {
              
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
                        value={municipio ? {label: municipio.municipio, value: municipio.id} : null}
                        //@ts-ignore
                        options={municipio ? [{label: municipio.municipio, value: municipio.id}] : null}
                        isDisabled
                        isLoading={coloniasLoading}
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
                        id="calle"
                        label="Calle"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        onChange={(event: any) => {
                          setCustomValue('calle', event.target.value);
                        }}
                        />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <Input
                        id="numero"
                        label="Número"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        type='number'
                        maxlength={6}
                        onChange={(event: any) => {
                          setCustomValue('numero', event.target.value);
                        }}
                        />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <Input
                        id="interior"
                        label="Interior"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        maxlength={5}
                        onChange={(event: any) => {
                          setCustomValue('interior', event.target.value);
                        }}
                        />
                  </div>
                  <div className="col-span-2">
                    <Input
                        id="empresa"
                        label="Empresa"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        onChange={(event: any) => {
                          setCustomValue('empresa', event.target.value);
                        }}
                        />
                  </div>
                  <div className="col-span-2">
                    <Input
                      id="referencias"
                      label="Referencias"
                      disabled={isLoading}
                      register={register}
                      errors={errors}
                      onChange={(event: any) => {
                        setCustomValue('referencias', event.target.value);
                      }}
                      />
                  </div>
              
              </div>
              <hr className="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700"></hr>
              <div className="text-sm font-bold text-gray-700">
                 Datos de contacto de este domicilio
              </div>
              <div className="flex items-center my-2">
                <input id="default-checkbox" type="checkbox" value=""
                className="w-4 h-4 accent-rose-500 text-rose-500 bg-gray-100 border-gray-300 rounded"
                onChange={(event: any) => {
                    if(event.target.checked) {
                      setMisDatosChecked(true);
                      //setContacto({nombre: "Javier Rubio", tel: "8115995194"});
                      setCustomValue('contactoNombre',currentUser?.nombre);
                      setCustomValue('contactoTel',currentUser?.celular);
              
                    } else {
                      setMisDatosChecked(false);
                      //setContacto({nombre: "", tel: ""});
                      setCustomValue('contactoNombre','');
                      setCustomValue('contactoTel','');
                    }
                }}
              
                />
                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-700">Usar mis datos </label>
              </div>
              <div className="
                  pr-4
                  grid
                  grid-cols-1
                  lg:grid-cols-3
                  xl:grid-cols-4
                  md:grid-cols-2
                  gap-4">
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
                        setCustomValue('contactoNombre', event.target.value);
                      }}
                      />
                    <Input
                      id="contactoTel"
                      label="Teléfono contacto"
                      type='number'
                      value={contactoTel}
                      disabled={misDatosChecked}
                      register={register}
                      errors={errors}
                      required
                      onChange={(event: any) => {
                        //setContacto({...contacto,tel: event.target.value});
                        setCustomValue('contactoTel', event.target.value);
                      }}
                      />
              </div>
              
              {tipo == 'direccion' && 
                <>
                <hr className="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700"></hr>
                  <div className="text-sm font-bold text-gray-700 my-2">
                    Nombre de la dirección (Ej. Casa)
                  </div>
                  <div className="w-full lg:w-2/4 xl:w-3/5 2xl:w-2/5 pr-4">
                    <NombreDireccionInput
                      id="nombreDireccion"
                      label="Nombre direccion"
                      disabled={isLoading}
                      register={register}
                      errors={errors}
                      required
                      onChange={(event: any) => {
                        setCustomValue('nombreDireccion', event.target.value);
                      }}
                      onColor={handleColor}
                      onIcon={handleIcon}
                      />
                  </div>
                  <div className="my-2">
                  <Badge className={`cursor-pointer  pr-3 pl-2 py-0 bg-[${nombreColor}]`}>
                    <div className="flex flex-row items-center gap-1">
                      { nombreIcon == 'home' && <FaHome />}
                      { nombreIcon == 'tienda' && <FaStore  />}
                      { nombreIcon == 'oficina' && <FaBuilding  />}
                      { nombreIcon == 'bodega' && <FaWarehouse  />}
                      <p className="text-xs">{nombreValue}</p>
                    </div>
                  </Badge>
                  </div>
                </>
              }

              {tipo == 'destino' && from == 'pedido' && <div className="my-2 felx flex-row gap-2 items-center">
                <Switch
                  checked={saveEnabled}
                  onChange={()=> reset()}
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
                <span className="text-sm font-semibold text-neutral-700 ml-2">Guardar en mis destinos favoritos</span>
              </div>}
              <div className="w-40 my-4">
                <Button
                  label={from == 'pedido' ? 'Agregar y usar' : 'Agregar'}
                  onClick={handleSubmit(onSubmit)}
                
                  />
              </div>
            </div>
    )}

    //@ts-ignore
    const useCp = (cp) => { 
      setCustomValue('cp', cp.id);
      getColonias(cp.id, {label: cp.col, value: cp.id});
     }
  
    return (
      <>
        <BuscarCodigoDialog onClose={onToggleBuscarCp} useCp={useCp} isOpen={openBuscarDialog}/>
        <div className="w-full  flex flex-col gap-2   py-2 ">
          <div className="text-sm font-bold text-gray-700">
              Domicilio de recolección
          </div>
          <div className="w-56 pr-4">
            <CpInput
              id="cp"
              label="Código postal"
              disabled={coloniasLoading}
              isLoading={coloniasLoading}
              register={register}  
              errors={errors}
              required
              type='number'
              maxlength={5}
              cpError={cpError.error}
              onChange={(event: any) => {
                  if (event.target.value.length == 5) {
                    getColonias(event.target.value);

                  } else {
                    setColonias([]);
                    setColoniaSelected(null);
                    setColoniaPlaceHolder(`Colonia`)
                    setCustomValue('municipio', null);
                    setCustomValue('colonia', null);
                    setCpError({error: false, errorMessage: ''})
                    setCpActive(false);

                  }
              }}
                    />
            <div className="flex text-xs ml-1 text-rose-500 my-1">
              {cpError.error ? cpError.errorMessage : ''}
            </div>
          </div>
          {!cpActive && !coloniasLoading && <div className="flex flex-row items-center content-center my-1 mt-2">
              <BiSearch size={16} className="text-blue-500"/>
              <div className="text-sm text-blue-500 font-medium pb-0 cursor-pointer" onClick={onToggleBuscarCp}>
                Buscar código por colonia
              </div>
          </div>}
          {!cpActive && !coloniasLoading && tipo == 'destino' && <div className="text-sm font-medium w-48 mt-0">
              <Button
                outline
                small
                label="Continuar sin código postal"
                onClick={() => {}}
                />
          </div>}
          {cpActive ? addContent('conCP') : ''}
        </div>
      </>
    );


   

  }
  
  export default AgregarDireccion;


