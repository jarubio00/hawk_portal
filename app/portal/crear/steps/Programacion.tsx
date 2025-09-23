"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { PedidoContextType } from "@/app/types/pedido";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  dateTimePickerTabsClasses,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import esLocale from "date-fns/locale/es";
import {
  getBloquesRecoleccion,
  getBloquesEntrega,
  autoPrograma,
  autoAppend,
} from "@/app/actions/apiQuerys";
import {
  addDays,
  addHours,
  eachDayOfInterval,
  endOfDay,
  format,
  isWithinInterval,
  nextSaturday,
  startOfDay,
} from "date-fns";
import { Radio } from "@material-tailwind/react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-hot-toast";

import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import useLoader from "@/app/hooks/useLoader";
import StepHeading from "../components/StepHeading";
import { serverDate } from "@/app/actions/apiQuerys";
import { ApiResponse, SafeUser } from "@/app/types";
import MuiDatePicker from "../components/MuiDatePicker";
import ProgramaTimer from "../components/ProgramaTimer";
import { namedDate, namedDateString } from "@/app/components/utils/helpers";
import NavidadDialog from "./dialogs/NavidadDialog";
import LluviaDialog from "./dialogs/LluviaDialog";
import FrioDialog from "./dialogs/FrioDialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useProgramaStore } from "../store/crear-store";

interface ProgramacionStepProps {
  data?: any;
  currentUser?: SafeUser;
  append?: boolean;
  recoleccion?: any;
}

//se quito w-full , se agregp px-2
const ProgramacionStep: React.FC<ProgramacionStepProps> = ({
  data,
  currentUser,
  append = false,
  recoleccion,
}) => {
  const { updateAviso } = useProgramaStore();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    updateActiveStep,
    saveProgramaKey,
    savePrograma,
    saveRecoleccionState,
    saveEntregaState,
    savePedidoInitial,
    saveProgramaAppend,
    recoleccionState,
    entregaState,
    updateTipoPrograma,
    tipoPrograma,
    useTimer,
    setProgramaRun,
    programaRun,
    pedido,
    tipoEntrega,
    updateTipoEntrega,
  } = useContext(PedidoContext) as PedidoContextType;

  const isInitialMount = useRef(true);
  const [activeRec, setActiveRec] = useState(false);
  const [activeRecData, setActiveRecData] = useState<any>({});

  useEffect(() => {
    //console.log("entering tipoPrograma");

    if (programaRun == 1) {
      if (tipoPrograma == "custom" && append && recoleccion) {
        //console.log("entering custom");
        savePrograma({
          fechaRecoleccion: recoleccion.fecha,
          bloqueRecoleccion: recoleccion.bloque,
          fechaEntrega: null,
          bloqueEntrega: 3,
        });

        saveRecoleccionState({
          am: true,
          pm: true,
          show: true,
          enabled: true,
        });
        saveEntregaState({
          ...entregaState,
          show: false,
          enabled: true,
          startDate:
            recoleccion.bloque == 2
              ? addDays(recoleccion.fecha, 1)
              : recoleccion.fecha,
        });
        setProgramaRun(2);
      }

      if (tipoPrograma == "auto") {
        //console.log("entering auto");
        if (append && recoleccion) {
          setIsAutoLoading(true);
          getAutoAppend();
          setProgramaRun(2);
        } else {
          if (!pedido?.programa?.fechaRecoleccion) {
            setIsAutoLoading(true);
            getAutoDates();
            setProgramaRun(2);
          }
        }
      }
    }
  }, [tipoPrograma]);

  const getAutoDates = useCallback(async () => {
    let autoDates;
    let data: any;

    if (pedido?.recoleccion?.direccionId) {
      try {
        /*  autoDates = await autoPrograma(
          pedido?.recoleccion?.municipioId,
          pedido?.destino?.municipioId
        ); */
        autoDates = await autoPrograma(pedido?.recoleccion?.direccionId);
        data = autoDates?.response?.data;
        console.log("saving programa");
        console.log(data.recDate);
        if (data && data?.recs) {
          //.log('active recs true')
          setActiveRec(true);
          setActiveRecData(data.recsData[0]);
          //saveAppend({enabled: true, recoleccion: data.recsData[0]});
          saveProgramaAppend(
            { enabled: true, recoleccion: data.recsData[0] },
            {
              fechaRecoleccion: data.recDate,
              bloqueRecoleccion: data.recBloque,
              fechaEntrega: data.entDate,
              bloqueEntrega: data.entBloque,
            }
          );
          setIsAutoLoading(false);
        } else {
          const timer = setTimeout(() => {
            savePrograma({
              fechaRecoleccion: data.recDate,
              bloqueRecoleccion: data.recBloque,
              fechaEntrega: data.entDate,
              bloqueEntrega: data.entBloque,
            });
            setIsAutoLoading(false);
          }, 1000);
        }
      } catch (e) {
        ////console.log("try error");
        ////console.log(e);
        setIsAutoLoading(false);
      }
    } else {
      setIsAutoLoading(false);
    }
  }, []);

  const getAutoAppend = useCallback(async () => {
    const autoDates = await autoAppend({
      fecha: recoleccion.fecha,
      bloque: recoleccion.bloque,
    });
    //console.log("append dates: ", autoDates);

    const data = autoDates?.response?.data;

    savePrograma({
      fechaRecoleccion: data.recDate,
      bloqueRecoleccion: data.recBloque,
      fechaEntrega: data.entDate,
      bloqueEntrega: data.entBloque,
    });
    setIsAutoLoading(false);
  }, []);

  const serverDateFunction = useCallback(async () => {
    console.log("server date init");
    const res = await serverDate("now");

    //@ts-ignore
    const dateString = res.response?.data;
    console.log(dateString);
    if (dateString) {
      const date = new Date(dateString);
      setDatetime(date);
    }
  }, []);

  useEffect(() => {
    serverDateFunction();
  }, [serverDateFunction]);

  const [datetime, setDatetime] = useState(new Date());
  const [bloqued, setBloqued] = useState([]);
  const [isRecLoading, setIsRecLoading] = useState(false);
  const [dpRecOpen, setDpRecOpen] = useState(false);
  const [isEntLoading, setIsEntLoading] = useState(false);
  const [isAutoLoading, setIsAutoLoading] = useState(false);
  const [dpEntOpen, setDpEntOpen] = useState(false);

  const [bloquedEntrega, setBloquedEntrega] = useState<any>([]);
  const [horariosLabelRec, setHorariosLabelRec] = useState("10:00am - 7:00pm");
  const [horariosLabelEnt, setHorariosLabelEnt] = useState("10:00am - 7:00pm");
  const [mismoDiaBlocked, setMismoDiaBlocked] = useState(false);

  const handleBack = () => {
    updateActiveStep(2);
  };

  const handleNext = () => {
    updateActiveStep(4);
  };

  const handleProgramaSection = (tipo: string) => {
    saveEntregaState({
      ...entregaState,
      am: false,
      pm: false,
      show: false,
      enabled: false,
    });
    saveRecoleccionState({
      ...entregaState,
      am: false,
      pm: false,
      show: false,
      enabled: false,
    });
    saveProgramaAppend({}, {});

    updateTipoPrograma(tipo);
    setProgramaRun(1);
  };

  const handleTimerOn = () => {
    const timeToClose = new Date();
    timeToClose.setSeconds(timeToClose.getSeconds() + 15); // 10 minutes timer
    useTimer({ isOpen: true, time: timeToClose });
  };

  const handleTimerOff = () => {
    useTimer({ isOpen: false, time: null });
  };

  return (
    <div className="px-2">
      <StepHeading
        title="Programación"
        subtitle="Obten las fechas disponibles automáticamente o seleccionalas manualmente"
      />

      {tipoPrograma == "custom" && (
        <div className="mt-2 md:mt-6 grid mx-4 md:mx-2 grid-cols-1 md:grid-cols-1  lg:grid-cols-2 xl:grid-cols-2 gap-4">
          <ProgramarRecoleccion />
          <ProgramarEntrega />
        </div>
      )}

      <div className="my-4 flex flex-row items-center gap-4">
        <Button
          outline
          label="Atras"
          onClick={handleBack}
          disabled={isAutoLoading}
        />
        <Button
          label="Siguiente"
          onClick={handleNext}
          disabled={
            isAutoLoading ||
            isRecLoading ||
            isEntLoading ||
            !pedido?.programa?.fechaRecoleccion ||
            pedido?.programa?.bloqueRecoleccion == 3 ||
            !pedido?.programa?.fechaEntrega ||
            pedido?.programa?.bloqueEntrega == 3
          }
        />

        {/* <FrioDialog
          disabled={
            isAutoLoading ||
            isRecLoading ||
            isEntLoading ||
            !pedido?.programa?.fechaRecoleccion ||
            pedido?.programa?.bloqueRecoleccion == 3 ||
            !pedido?.programa?.fechaEntrega ||
            pedido?.programa?.bloqueEntrega == 3
          }
          onNext={handleNext}
        /> */}
        {/* <NavidadDialog
          disabled={
            isAutoLoading ||
            isRecLoading ||
            isEntLoading ||
            !pedido?.programa?.fechaRecoleccion ||
            pedido?.programa?.bloqueRecoleccion == 3 ||
            !pedido?.programa?.fechaEntrega ||
            pedido?.programa?.bloqueEntrega == 3
          }
          onNext={handleNext}
        /> */}
        {/*  */}
      </div>
    </div>
  );

  /*   */

  function ProgramarRecoleccion() {
    //console.log(pedido?.programa?.fechaRecoleccion);

    const [startDateRecoleccion, setStartDateRecoleccion] =
      useState<Date | null>();
    const [bloquedRecoleccion, setBloquedRecoleccion] = useState([]);

    useEffect(() => {
      const nowMinutes = datetime.getHours() * 60 + datetime.getMinutes();
      const limitMinutes = 9 * 60 + 30;
      if (pedido?.recoleccion?.municipioId == 10) {
        const alldays = eachDayOfInterval({
          start: datetime,
          end: addDays(datetime, 30),
        });
        const weekdays = alldays.filter((day) => day.getDay() != 6);
        let bloquedFinal = data.bloquedRec.concat(weekdays);
        if (datetime.getDay() == 6 && nowMinutes > limitMinutes) {
          bloquedFinal.push(datetime);
        }
        setBloquedRecoleccion(bloquedFinal);
      } else {
        setBloquedRecoleccion(data.bloquedRec);
      }
    }, []);

    /*   if (pedido?.recoleccion?.municipioId == 10 && new Date().getDay() != 6) {
        if (nowMinutes <= limitMinutes) {
          setStartDateRecoleccion(nextSaturday(datetime));
        } else {
          setStartDateRecoleccion(nextSaturday(addDays(datetime, 1)));
        }
      } */

    const handleDateChange = async (e: any) => {
      if (e.getDay() == 6) {
        setHorariosLabelRec("10:00am - 3:00pm");
      } else {
        setHorariosLabelRec("10:00am - 7:00pm");
      }

      console.log(nextSaturday(e));

      setIsRecLoading(true);

      setBloquedEntrega((old: any) => [...old, e]);

      saveRecoleccionState({ ...recoleccionState, am: false, pm: false });
      saveEntregaState({
        ...entregaState,
        am: false,
        pm: false,
        show: false,
        enabled: false,
      });
      savePrograma({
        ...pedido?.programa,
        fechaEntrega: null,
        bloqueEntrega: 3,
        bloqueRecoleccion: 3,
        fechaRecoleccion: e,
      });

      const fechaString = format(e, `yyyy-MM-dd`);
      const res: ApiResponse = await getBloquesRecoleccion(
        fechaString,
        pedido?.recoleccion
      );

      //console.log(res.response?.data);

      if (res.status == 1) {
        if (res.response?.data) {
          console.log(res.response?.data.md);
          saveRecoleccionState({ ...recoleccionState, ...res.response.data });
          if (!res.response?.data?.md) {
            console.log("bloqueando MD");
            setMismoDiaBlocked(true);
          } else {
            setMismoDiaBlocked(false);
          }
          const timer = setTimeout(() => {
            setIsRecLoading(false);
          }, 500);
        } else {
          toast.error(res.response?.error);
          const timer = setTimeout(() => {
            setIsRecLoading(false);
          }, 500);
        }
      }

      if (pedido?.destino?.municipioId == 10) {
        const alldays = eachDayOfInterval({
          start: e,
          end: addDays(e, 30),
        });
        const weekdays = alldays.filter((day) => day.getDay() != 6);
        let bloquedFinal = data.bloquedEnt.concat(weekdays);

        setBloquedEntrega(bloquedFinal);
      } else {
        setBloquedEntrega(data.bloquedEnt);
      }
    };

    const handleBloqueChange = async (b: number) => {
      //savePrograma({...pedido?.programa, fechaEntrega: null, bloqueEntrega: 3, bloqueRecoleccion: b});
      //handleTimerOn();
      ////console.log({ recoleccionState });

      if (b == 1) {
        if (recoleccionState?.recsB1) {
          saveProgramaAppend(
            { enabled: true, recoleccion: recoleccionState.recsB1Data[0] },
            {
              ...pedido?.programa,
              fechaEntrega: null,
              bloqueEntrega: 3,
              bloqueRecoleccion: b,
            }
          );
        } else {
          saveProgramaAppend(
            { enabled: false, recoleccion: undefined },
            {
              ...pedido?.programa,
              fechaEntrega: null,
              bloqueEntrega: 3,
              bloqueRecoleccion: b,
            }
          );
        }
      }

      if (b == 2) {
        if (recoleccionState?.recsB2) {
          saveProgramaAppend(
            { enabled: true, recoleccion: recoleccionState.recsB2Data[0] },
            {
              ...pedido?.programa,
              fechaEntrega: null,
              bloqueEntrega: 3,
              bloqueRecoleccion: b,
            }
          );
        } else {
          saveProgramaAppend(
            { enabled: false, recoleccion: undefined },
            {
              ...pedido?.programa,
              fechaEntrega: null,
              bloqueEntrega: 3,
              bloqueRecoleccion: b,
            }
          );
        }
      }

      if (b == 2) {
        const entStartDate = addDays(pedido?.programa?.fechaRecoleccion, 1);
        saveEntregaState({
          ...entregaState,
          am: false,
          pm: false,
          show: false,
          enabled: true,
          startDate: entStartDate,
        });
      } else {
        saveEntregaState({
          ...entregaState,
          am: false,
          pm: false,
          show: false,
          enabled: true,
          startDate: pedido?.programa?.fechaRecoleccion,
        });
      }
    };

    return (
      <div className="my-4 border border-neutral-300 shadow-md rounded-lg p-2 px-2 md:px-2 bg-white">
        <RecoleccionNormal />
      </div>
    );

    function RecoleccionNormal() {
      return (
        <div className="flex flex-col">
          <p className="text-md font-bold">Recolección</p>
          <p className="text-xs text-neutral-500">
            Selecciona la fecha y horario de recolección
          </p>

          <div className="mt-2 md:mt-4">
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={esLocale}
            >
              {tipoPrograma == "custom" && (
                <MuiDatePicker
                  dpOpen={dpRecOpen}
                  setDpOpen={(val) => {
                    setDpRecOpen(val);
                  }}
                  value={pedido?.programa?.fechaRecoleccion}
                  onChange={(newValue) => handleDateChange(newValue)}
                  bloqued={bloquedRecoleccion}
                  datetime={datetime}
                  disabled={append ? append : false}
                  //startDate={startDateRecoleccion}
                  startDate={datetime}
                  maxDate={addDays(datetime, 30)}
                />
              )}
            </LocalizationProvider>
          </div>
          {isRecLoading ? (
            <div className="mt-2 mx-4">
              <PulseLoader
                //@ts-ignore
                size={10}
                color="#FF6B00"
              />
            </div>
          ) : (
            <>
              <div className="mt-2 p-3 flex flex-col w-[300px]">
                {(recoleccionState?.am ||
                  pedido?.programa?.bloqueRecoleccion == 1) && (
                  <Radio
                    id="RecAm"
                    value={1}
                    name="recoleccion"
                    label={
                      <p className="text-sm font-semibold">
                        {horariosLabelRec}
                      </p>
                    }
                    onChange={(event) =>
                      handleBloqueChange(parseInt(event.target.value))
                    }
                    defaultChecked={pedido?.programa?.bloqueRecoleccion == 1}
                    disabled={append ? append : false}
                  />
                )}
                {(recoleccionState?.pm ||
                  pedido?.programa?.bloqueRecoleccion == 2) && (
                  <Radio
                    id="RecPm"
                    value={2}
                    name="recoleccion"
                    label={
                      <p className="text-sm font-semibold">4:00pm - 9:00pm</p>
                    }
                    onChange={(event) =>
                      handleBloqueChange(parseInt(event.target.value))
                    }
                    defaultChecked={pedido?.programa?.bloqueRecoleccion == 2}
                    disabled={append ? append : false}
                  />
                )}

                {!recoleccionState?.am &&
                  !recoleccionState?.pm &&
                  pedido?.programa?.bloqueRecoleccion == 3 && (
                    <div className="text-sm">No hay horarios disponibles</div>
                  )}
              </div>
              {/*  <div className="my-2">
                {pedido?.append?.enabled && (
                  <p className="text-xs">
                    Asignando envío a recolección{" "}
                    {pedido?.append?.recoleccion?.id}
                  </p>
                )}
              </div> */}
            </>
          )}
        </div>
      );
    }
  }

  function ProgramarEntrega() {
    const handleDateChange = async (e: any) => {
      updateTipoEntrega("1");
      //savePrograma({ ...pedido?.programa, mismoDia: false });
      if (e.getDay() == 6) {
        setHorariosLabelEnt("10:00am - 3:00pm");
      } else {
        setHorariosLabelEnt("10:00am - 7:00pm");
      }

      if (
        pedido?.programa?.fechaRecoleccion.toISOString().slice(0, 10) ==
        e.toISOString().slice(0, 10)
      ) {
        //console.log("match");
      }

      saveEntregaState({ ...entregaState, show: true });
      setIsEntLoading(true);
      savePrograma({
        ...pedido?.programa,
        bloqueEntrega: 3,
        fechaEntrega: e,
        mismoDia: false,
      });

      const fechaString = format(e, `yyyy-MM-dd`);
      const res: ApiResponse = await getBloquesEntrega(fechaString);

      if (res.status == 1) {
        if (res.response?.data) {
          let bloques = res.response.data;
          const fechaRec = pedido?.programa?.fechaRecoleccion
            .toISOString()
            .slice(0, 10);
          const fechaSel = e.toISOString().slice(0, 10);
          const bloqueRec = pedido?.programa?.bloqueRecoleccion;

          if (fechaRec == fechaSel && bloqueRec == 1) {
            bloques = { ...bloques, am: false };
          } else if (fechaRec == fechaSel && bloqueRec == 2) {
            bloques = { ...bloques, am: false, pm: false };
          }

          saveEntregaState({ ...entregaState, ...bloques });

          const timer = setTimeout(() => {
            setIsEntLoading(false);
          }, 500);
        } else {
          toast.error(res.response?.error);
          const timer = setTimeout(() => {
            setIsEntLoading(false);
          }, 500);
        }
      }
    };

    const handleBloqueChange = async (b: number) => {
      saveProgramaKey("bloqueEntrega", b);
    };

    return (
      <div className="my-4 border border-neutral-300 shadow-md rounded-lg p-2 px-2 md:px-2 bg-white">
        <div className="flex flex-col">
          <p className="text-md font-bold">Entrega</p>
          <p className="text-xs text-neutral-500">
            Selecciona la fecha y horario de entrega
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <RadioGroup
              value={tipoEntrega}
              onValueChange={(value) => {
                updateTipoEntrega(value);
                if (value === "2") {
                  savePrograma({
                    ...pedido?.programa,
                    bloqueEntrega: 2,
                    fechaEntrega: pedido?.programa?.fechaRecoleccion,
                    mismoDia: true,
                  });
                  saveEntregaState({
                    ...entregaState,
                    am: false,
                    pm: false,
                    show: false,
                  });
                  console.log("mismo dia");
                }
              }}
            >
              <div className="flex items-center space-x-2 ">
                <RadioGroupItem
                  value="1"
                  id="EntregaNormal"
                  disabled={
                    !pedido?.programa?.fechaRecoleccion ||
                    pedido.programa.bloqueRecoleccion === 3
                  }
                />
                <Label htmlFor="EntregaNormal" className="cursor-pointer">
                  {<EntregaNormal />}
                </Label>
              </div>

              {pedido?.programa?.fechaRecoleccion?.getDay() != 6 && (
                <div>
                  {pedido?.destino?.municipioId != 10 && (
                    <div>
                      {!mismoDiaBlocked ? (
                        <div className="flex items-center space-x-2 ">
                          <RadioGroupItem
                            value="2"
                            id="EntregaMismoDia"
                            disabled={
                              !pedido?.programa?.fechaRecoleccion ||
                              pedido.programa.bloqueRecoleccion === 3 ||
                              pedido?.programa?.fechaRecoleccion?.getDay() ==
                                6 ||
                              pedido?.destino?.municipioId == 10
                              //||pedido?.programa?.fechaRecoleccion == new Date("2025-04-17T00:00:00")
                            }
                          />
                          <Label
                            htmlFor="EntregaMismoDia"
                            className="cursor-pointer"
                          >
                            {<EntregaMismoDia />}
                          </Label>
                        </div>
                      ) : (
                        <div className="ml-6 flex flex-col p-2  rounded-md w-[230px] border">
                          <p className="p-2 text-xs text-neutral-400 italic">
                            El servicio de entrega el mismo día alcanzó el
                            límite, ya no está disponible en esta fecha.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </RadioGroup>

            {/* <Radio
              id="EntregaNormal"
              value={10}
              name="entrega_normal"
              label={<EntregaNormal />}
              onChange={(event) => {
                console.log(event.target.value);
              }}
              defaultChecked={true}
              disabled={!entregaState?.enabled}
            />
            <Radio
              id="EntregaMismoDia"
              value={11}
              name="entrega_mismo_dia"
              label={<EntregaMismoDia />}
              onChange={(event) => {
                console.log(event.target.value);
              }}
              defaultChecked={false}
              disabled={!entregaState?.enabled}
            /> */}
          </div>
        </div>
      </div>
    );

    function EntregaNormal() {
      return (
        <div
          className={`flex flex-col p-2  rounded-md w-[230px] ${
            tipoEntrega == "1" &&
            pedido?.programa?.fechaRecoleccion &&
            pedido?.programa?.bloqueRecoleccion != 3
              ? "border-2 border-black "
              : "border"
          }`}
        >
          <div className="mt-2 md:mt-4">
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={esLocale}
            >
              <MuiDatePicker
                dpOpen={dpEntOpen}
                setDpOpen={(val) => setDpEntOpen(val)}
                value={
                  pedido?.programa?.mismoDia
                    ? null
                    : pedido?.programa?.fechaEntrega
                }
                onChange={(newValue) => handleDateChange(newValue)}
                bloqued={bloquedEntrega}
                datetime={datetime}
                startDate={entregaState?.startDate}
                disabled={!entregaState?.enabled}
              />
            </LocalizationProvider>
          </div>
          {isEntLoading ? (
            <div className="mt-2 mx-4">
              <PulseLoader
                //@ts-ignore
                size={10}
                color="#FF6B00"
              />
            </div>
          ) : (
            <div className="mt-2 p-3 flex flex-col">
              {(entregaState?.am || pedido?.programa?.bloqueEntrega == 1) &&
                tipoEntrega === "1" && (
                  <Radio
                    id="EntAm"
                    value={1}
                    name="entrega"
                    label={
                      <p className="text-sm font-semibold">
                        {horariosLabelEnt}
                      </p>
                    }
                    onChange={(event) =>
                      handleBloqueChange(parseInt(event.target.value))
                    }
                    defaultChecked={pedido?.programa?.bloqueEntrega == 1}
                  />
                )}
              {/*  {(entregaState?.pm || pedido?.programa?.bloqueEntrega == 2) &&
                tipoEntrega === "1" && (
                  <Radio
                    id="EntPm"
                    value={2}
                    name="entrega"
                    label={
                      <p className="text-sm font-semibold">4:00pm - 9:00pm</p>
                    }
                    onChange={(event) =>
                      handleBloqueChange(parseInt(event.target.value))
                    }
                    defaultChecked={pedido?.programa?.bloqueEntrega == 2}
                  />
                )} */}
              {!entregaState?.am &&
                !entregaState?.pm &&
                pedido?.programa?.bloqueEntrega == 3 && (
                  <div>
                    {pedido?.programa?.fechaEntrega && (
                      <p className="text-sm">No hay horarios disponibles</p>
                    )}
                  </div>
                )}
            </div>
          )}
        </div>
      );
    }

    function EntregaMismoDia() {
      return (
        <div className="relative w-[230px]">
          <div
            className={`flex flex-col p-2 mt-2 rounded-md w-[230px] ${
              tipoEntrega == "2" ? "border-2 border-black " : "border"
            }`}
          >
            <div className="flex flex-col">
              <p
                className={`text-xs font-bold ${
                  (!pedido?.programa?.fechaRecoleccion ||
                    pedido?.programa?.bloqueRecoleccion === 3 ||
                    pedido?.programa?.fechaRecoleccion?.getDay() == 6) &&
                  "text-neutral-300 italic"
                }`}
              >
                Entrega el mismo día
              </p>
              <p
                className={`text-xs text-muted-foreground ${
                  (!pedido?.programa?.fechaRecoleccion ||
                    pedido?.programa?.bloqueRecoleccion === 3 ||
                    pedido?.programa?.fechaRecoleccion?.getDay() == 6) &&
                  "text-neutral-300 italic"
                }`}
              >
                +$42.00 MXN
              </p>
              <div className="p-1 mt-2 rounded-sm bg-blue-500">
                <p className="text-xs text-white">
                  No aplica en envíos agregados
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -top-2 -right-4 w-12 h-6 pl-[8px] pt-1 bg-red-500 text-xs text-white rounded-sm">
            Nuevo
          </div>
        </div>
      );
    }
  }
};

export default ProgramacionStep;
