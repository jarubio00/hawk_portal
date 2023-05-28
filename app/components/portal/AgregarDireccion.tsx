'use client';

    import { useCallback, useState } from "react";
    import { 
        FieldValues, 
        SubmitHandler, 
        useForm
    } from "react-hook-form";
    import Select from 'react-select'
    import useLoader from "@/app/hooks/useLoader";
    import { PulseLoader } from "react-spinners";
    import { LoadingIndicatorProps } from 'react-select';
    import { BiSearch } from "react-icons/bi";
    import Input from "../inputs/Input";
    import CpInput from "../inputs/CpInput";
    import Button from "../Button";
    import Heading from "../Heading";
import axios from "axios";
import BuscarCodigo from "./BuscarCodigo";

 
      
      const colourOptions  = [
        { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
        { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
        { value: 'purple', label: 'Purple', color: '#5243AA' },
        { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' },
      ];

  interface AgregarDireccionProps {
    title: string;
  }

  const AgregarDireccion: React.FC<AgregarDireccionProps> = ({
    title
  }) => {
    const loader = useLoader();
    const [isLoading, setIsLoading] = useState(false);
    const [coloniasLoading, setColoniasLoading] = useState(false);
    const [cpActive, setCpActive] = useState(false);
    const [coloniaSelected, setColoniaSelected] = useState(null);
    const [colonias, setColonias] = useState([]);
    //const [municipio, setMunicipio] = useState(null);
    const [coloniaPlaceholder, setColoniaPlaceHolder] = useState('Colonia');
    const [contacto,setContacto] = useState({nombre: "", tel: ""});
    const [misDatosChecked, setMisDatosChecked] = useState(false);
    const [otraColonia, setOtraColonia] = useState(false);
    const [cpError, setCpError] = useState({error: false, errorMessage: ''});
    const [buscarCp, setBuscarCP] = useState(true);


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
        nombreDireccion: '',
        cp: '',
        colonia: '',
        municipio: '',
        calle: '',
        numero: '',
        interior: '',
        empresa: '',
        referencias: '',
        nombreContacto: '',
        telContacto: '',
        isOtraColonia: false,
        otraColonia: ''
      },
    });
    
    const onSubmit: SubmitHandler<FieldValues> = 
    (data) => {
      //loader.onOpen();
      console.log('submit');
      console.log(data);
  
      const timer = setTimeout(() => {
       
        }, 1000);
     
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
        setBuscarCP(!buscarCp);
        console.log(buscarCp);
    }, [buscarCp])

    const nombreContacto = watch('nombreContacto');
    const telContacto = watch('telContacto');
    const colonia = watch('colonia');
    const municipio = watch('municipio');

    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      })
    }

    const getColonias = (cp: any) => { 
      setColoniasLoading(true);
      //loader.onOpen();
  
      axios.post(`/api/colonias/${cp}`)
      .then((response) => {
        console.log('colonias', response.data);
        const r= response.data;

        if(r.status == 1) {
          setCpActive(true);
          setColoniasLoading(false);
          setColoniaPlaceHolder(`Selecciona una colonia (${response.data.colonias.length -1})`)
          setColonias(response.data.colonias);
          setCustomValue('municipio', response.data.codigo.municipio);
          setCpError({error: false, errorMessage: ''})
        } else {
          setColoniasLoading(false);
          setCpActive(false);
          setCpError({error: true, errorMessage: 'Código postal inválido'});
        }
        
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
       loader.onClose();
      })
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
              
                  <div className={`${otraColonia ? "col-span-2 md:col-span-1" : "col-span-2"}`}>
                    <Select
                        id="colonia"
                        //@ts-ignore
                        register={register}
                        placeholder={coloniaPlaceholder}
                        onChange={(val: any) => {
              
                          if (val.value && val.value == 9999) {
                            setOtraColonia(true);
                            setCustomValue('isOtraColonia', true);
                            setCustomValue('colonia', val)
                          } else {
                            setOtraColonia(false);
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
                  <div className={`${otraColonia ? "block col-span-2" : "hidden"}`}>
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
              
                        }}
                        />
                  </div>
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
              
                      }}
                      />
                  <Input
                      id="interior"
                      label="Interior"
                      disabled={isLoading}
                      register={register}
                      errors={errors}
                      required
                      maxlength={5}
                      onChange={(event: any) => {
              
                      }}
                      />
                  <div className="col-span-2">
                    <Input
                        id="empresa"
                        label="Empresa"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                        onChange={(event: any) => {
              
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
                      required
                      onChange={(event: any) => {
              
                      }}
                      />
                  </div>
              
              </div>
              <hr className="h-px my-1 bg-gray-300 border-0 dark:bg-gray-700"></hr>
              <div className="text-sm font-bold text-gray-700">
                 Datos de contacto de este domicilio
              </div>
              <div className="flex items-center mb-0">
                <input id="default-checkbox" type="checkbox" value=""
                className="w-4 h-4 accent-rose-500 text-rose-500 bg-gray-100 border-gray-300 rounded"
                onChange={(event: any) => {
                    if(event.target.checked) {
                      setMisDatosChecked(true);
                      //setContacto({nombre: "Javier Rubio", tel: "8115995194"});
                      setCustomValue('nombreContacto','Javier Rubio');
                      setCustomValue('telContacto','8115995194');
              
                    } else {
                      setMisDatosChecked(false);
                      //setContacto({nombre: "", tel: ""});
                      setCustomValue('nombreContacto','');
                      setCustomValue('telContacto','');
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
                      id="nombreContacto"
                      label="Nombre contacto"
                      value={nombreContacto}
                      disabled={misDatosChecked}
                      register={register}
                      errors={errors}
                      required
                      onChange={(event: any) => {
                        //setContacto({...contacto,nombre: event.target.value});
                        setCustomValue('nombreContacto', event.target.value);
                      }}
                      />
                    <Input
                      id="telContacto"
                      label="Teléfono contacto"
                      type='number'
                      value={telContacto}
                      disabled={misDatosChecked}
                      register={register}
                      errors={errors}
                      required
                      onChange={(event: any) => {
                        //setContacto({...contacto,tel: event.target.value});
                        setCustomValue('telContacto', event.target.value);
                      }}
                      />
              </div>
              <hr className="h-px my-1 bg-gray-300 border-0 dark:bg-gray-700"></hr>
              <div className="text-sm font-bold text-gray-700">
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
              
                  }}
                  />
              </div>
              <div className="w-40 my-4">
                <Button
                  small
                  label="Agregar"
                  onClick={handleSubmit(onSubmit)}
                  />
              </div>
            </div>
    )}

    const searchCp = () => { 


      
      return (
        <div className="flex my-4">
          Buscar Codigo
        </div>
    )}
  
    return (
        <div className="w-full md:w-3/4 flex flex-col gap-2 mx-2 md:mx-6 py-2">
           
            
            <div className="text-sm font-bold text-gray-700">
               Domicilio de recolección
            </div>
            <div className="w-full md:w-2/4 lg:w-2/4 xl:w-1/5 pr-4">
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
                      setCpError({error: false, errorMessage: ''})
                      setCpActive(false);

                    }
                }}
                      />
              <div className="flex text-xs ml-1 text-rose-500 my-1">
                {cpError.error ? cpError.errorMessage : ''}
              </div>

              <div className="flex flex-row items-center content-center my-1 mt-4">
                <BiSearch size={16} className="text-blue-500"/>
                <div className="text-sm text-blue-500 font-medium pb-0 cursor-pointer" onClick={onToggleBuscarCp}>
                  Buscar código por colonia
                </div>
              </div>

              {buscarCp && <BuscarCodigo />}


              <div className="text-sm font-medium  mt-4">
                  <Button
                    outline
                    small
                    label="Continuar sin código postal"
                    onClick={() => {}}
                    />
              </div>

              

              


            </div>
            {cpActive ? addContent('conCP') : ''}
           
           
            
      </div>
    );


   

  }
  
  export default AgregarDireccion;


