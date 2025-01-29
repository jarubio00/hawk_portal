"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PulseLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { getSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";
import { NacionalDestino } from "@/app/types";
import { valueContainerCSS } from "react-select/dist/declarations/src/components/containers";

interface DestinoFormProps {
  data?: string;
}

const DestinoForm: React.FC<DestinoFormProps> = ({ data }) => {
  const {
    direccionSelected,
    updateDestino,
    destinoSelected,
    updateActiveStep,
    cpValue,
    municipioValue,
  } = useNacionalCrearStore();
  const formSchema = getSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpId: cpValue ? cpValue.toString() : "",
      colonia: "Contry sol",
      municipioId: municipioValue ? municipioValue : "",
      calle: "Jose Peon y Contreras",
      numero: "2419",
      numeroInt: "",
      empresa: "XTA",
      referencias: "A lado super 7",
      contactoNombre: "Jose Perez",
      contactoTel: "8115995194",
      otraColoniaNombre: "",
      countryCode: "52",
      save: false,
    },
  });

  const {
    formState: { errors, dirtyFields, isDirty },
    setValue,
    resetField,
    watch,
    setError,
    handleSubmit,
  } = form;

  const ctel = watch("contactoTel");
  const cnombre = watch("contactoNombre");

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const destino: NacionalDestino = {
      cpId: values.cpId,
      colonia: values.colonia,
      municipioId: values.municipioId,
      calle: values.calle,
      numero: values.numero,
      numeroInt: values.numeroInt,
      empresa: values.empresa,
      referencias: values.referencias ?? "",
      contactoNombre: values.contactoNombre,
      contactoTel: values.contactoTel,
      otraColoniaNombre: "",
      countryCode: "53",
      save: values.save ?? false,
    };

    updateDestino(destino);

    updateActiveStep(2);
  }

  return (
    <div className="w-full  flex flex-col justify-center items-center my-6 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  ">
            <div className="col-span-1 lg:col-span-2 xl:col-span-1">
              <FormField
                control={form.control}
                name="cpId"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Código postal</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Código postal"
                        disabled
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomValue("cpId", val);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="col-span-1 lg:col-span-2 xl:col-span-1">
              <FormField
                control={form.control}
                name="colonia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colonia</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Colonia"
                        {...field}
                        disabled={Boolean(errors?.cpId)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1 lg:col-span-2 xl:col-span-1">
              <FormField
                control={form.control}
                name="municipioId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Municipio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Municipio"
                        {...field}
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="col-span-1 lg:col-span-2 xl:col-span-1">
              <FormField
                control={form.control}
                name="calle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calle</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre de la calle"
                        {...field}
                        disabled={Boolean(errors?.cpId)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 lg:col-span-2 xl:col-span-1">
              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej. 342 Ote"
                        {...field}
                        disabled={Boolean(errors?.cpId)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 lg:col-span-2 xl:col-span-1">
              <FormField
                control={form.control}
                name="numeroInt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interior</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej. B"
                        {...field}
                        disabled={Boolean(errors?.cpId)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="col-span-1 lg:col-span-1 xl:col-span-1">
              <FormField
                control={form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Empresa (opcional)"
                        {...field}
                        disabled={Boolean(errors?.cpId)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="cols-span-1  lg:col-span-3 xl:col-span-2">
              <FormField
                control={form.control}
                name="referencias"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referencias</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej. Entre Vasconcelos y Rio Nilo"
                        {...field}
                        disabled={Boolean(errors?.cpId)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="col-span-1 lg:col-span-1 xl:col-span-1">
                <FormField
                  control={form.control}
                  name="contactoNombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del contacto</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nombre de quien entrega"
                          {...field}
                          value={cnombre}
                          disabled={false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1 lg:col-span-1 xl:col-span-1">
                <FormField
                  control={form.control}
                  name="contactoTel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono del contacto</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Teléfono de quien entrega"
                          {...field}
                          type="number"
                          value={ctel}
                          disabled={false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="col-span-1 lg:col-span-1 xl:col-span-1">
              <FormField
                control={form.control}
                name="save"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 space-y-0">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={false}
                      />
                    </FormControl>
                    <FormLabel>Guardar direccion en favoritos</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
      <div className="flex flex-row mx-12 justify-between items-center mt-8">
        <p></p>
        <div className="flex flex-row gap-6">
          <Button
            variant="outline"
            className="w-30 ml-6"
            size={"lg"}
            onClick={() => updateActiveStep(0)}
          >
            Atras
          </Button>
          <Button
            className=" ml-6"
            size={"lg"}
            onClick={handleSubmit(onSubmit)}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DestinoForm;
