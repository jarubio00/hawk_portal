'use client';

    import { useState } from "react";
    import { 
        FieldValues, 
        SubmitHandler, 
        useForm
    } from "react-hook-form";
    import Select from 'react-select'
    import useLoader from "@/app/hooks/useLoader";
    import { useRouter } from 'next/navigation';
    import Input from "../inputs/Input";
    import CpInput from "../inputs/CpInput";
    import Button from "../Button";
    import { SafeUser} from "@/app/types";
    
    


  interface EditarDireccionProps {
    tipo: string;
    title: string;
    currentUser?: SafeUser | null;
    direccion: any;
    onClose: (props: any) => void;
  }

  const EditarDireccion: React.FC<EditarDireccionProps> = ({
    tipo,
    title,
    currentUser,
    onClose,
    direccion
  }) => {
    const loader = useLoader();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [coloniasLoading, setColoniasLoading] = useState(false);
    const [cpActive, setCpActive] = useState(false);
    const [colonias, setColonias] = useState([]);
    //const [municipio, setMunicipio] = useState(null);
    const [coloniaPlaceholder, setColoniaPlaceHolder] = useState('Colonia');
    const [misDatosChecked, setMisDatosChecked] = useState(false);
    const [otraColoniaSelected, setOtraColoniaSelected] = useState(false);
    const [cpError, setCpError] = useState({error: false, errorMessage: ''});


    const { 
      register, 
      handleSubmit,
      setValue,
      watch,
      formState: {
        errors,
        dirtyFields,
        isDirty
      },
    } = useForm<FieldValues>({
      defaultValues: {
        nombreDireccion: direccion.nombreDireccion,
        cp: direccion.cpId,
        colonia: direccion.colonia,
        municipio: direccion.municipio?.municipio,
        calle: direccion.calle,
        numero: direccion.numero,
        interior: direccion.numeroInt,
        empresa: direccion.empresa,
        referencias: direccion.referencias,
        contactoNombre: direccion.contactoNombre,
        contactoTel: direccion.contactoTel,
      },
    });


    const onSubmit:  SubmitHandler<FieldValues> = 
    async (data) => {
      loader.onOpen();
      let changedData = {}
      Object.keys(dirtyFields).map((key,index) => {
          changedData = {...changedData, [key]: data[key]}
      });
      onClose({action: 'save', id: direccion.id, data: changedData});
    }



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

    return (
      <>
        <div className="w-full md:w-3/4 flex flex-col gap-2 mx-2 md:mx-6 py-2">
          <div className="text-sm font-bold text-gray-700">
              Domicilio de recolección
          </div>
          <div className="w-full md:w-2/4 lg:w-2/4 xl:w-1/5 pr-4">
            <CpInput
              id="cp"
              label="Código postal"
              disabled={true}
              isLoading={coloniasLoading}
              register={register}  
              errors={errors}
              required
              type='number'
              maxlength={5}
              cpError={cpError.error}
              onChange={(event: any) => {
                
              }}
                    />
          </div>
          <div >
              <div className="
                  pr-4
                  grid
                  grid-cols-1
                  lg:grid-cols-3
                  xl:grid-cols-4
                  md:grid-cols-2
                  gap-4">
              
                  <div className= "col-span-2">
                    <Select
                        id="colonia"
                        //@ts-ignore
                        register={register}
                        placeholder={coloniaPlaceholder}
                        onChange={(val: any) => {
                        }}
                        value={{label: direccion.colonia, value: direccion.id}}
                        isClearable
                        options={colonias}
                        isLoading={coloniasLoading}
                        isDisabled={true}
                        classNames={{
                            control: () => 'p-2 border-2 ',
              
                            input: () => 'text-lg ',
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
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <Select
                        placeholder="Municipio"
                        //@ts-ignore
                        register={register}
                        isClearable
                        //@ts-ignore
                        value={{label: direccion.municipio.municipio, value: direccion.municipio.id}}
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
                          //console.log(event.target.value);
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
                        required
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
                      required
                      onChange={(event: any) => {
                        setCustomValue('referencias', event.target.value);
                      }}
                      />
                  </div>
              
              </div>
              <hr className="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700"></hr>
              <div className="text-sm font-bold text-gray-700 my-4s">
                 Datos de contacto de este domicilio
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
              {tipo== 'direccion' && <><hr className="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700"></hr>
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
                    setCustomValue('nombreDireccion', event.target.value);
                  }}
                  />
              </div></>}
              <div className="flex flex-row gap-3 items-center">
                <div className="w-40 my-4">
                  <Button
                    small
                    outline
                    label="Cancelar"
                    onClick={() =>  onClose({action: 'cancel', data: {}})}
                
                    />
                </div>
                <div className="w-40 my-4">
                  <Button
                    small
                    label="Guardar"
                    disabled={!isDirty}
                    onClick={handleSubmit(onSubmit)}
                
                    />
                </div>
              </div>
          </div> 
        </div>
      </>
    );


   

  }
  
  export default EditarDireccion;


