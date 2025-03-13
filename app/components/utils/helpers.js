import esLocale from "date-fns/locale/es";
import { format, isDate, addHours } from "date-fns";
import { MdAccessTimeFilled, MdCancel } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi";
import { IoIosWarning } from "react-icons/io";
import { Badge } from "@/components/ui/badge";
import { FaHome, FaStore, FaBuilding, FaWarehouse } from "react-icons/fa";

export function namedDate(date) {
  let result = "No hay fecha";
  if (isDate(date)) {
    result = format(date, `EEEE, d 'de' MMMM 'de' yyyy `, { locale: esLocale });
  }
  return result;
}

export function namedDateString(dateString) {
  const date = new Date(dateString);
  let result = "No hay fecha";
  if (isDate(date)) {
    result = format(date, `EEEE, d 'de' MMMM 'de' yyyy `, { locale: esLocale });
  }
  return result;
}

export function namedDateStringFull(dateString) {
  const date = new Date(dateString);
  let result = "No hay fecha";
  if (isDate(date)) {
    result = format(date, `EEEE, d 'de' MMMM 'de' yyyy  HH:mm:ss`, {
      locale: esLocale,
    });
  }
  return result;
}

export function namedDateStringFullRastreo(dateString) {
  const date = new Date(dateString);
  let result = "No hay fecha";
  if (isDate(date)) {
    result = format(
      addHours(date, 6),
      `EEEE, d 'de' MMMM 'de' yyyy  HH:mm:ss`,
      {
        locale: esLocale,
      }
    );
  }
  return result;
}

export function namedDateStringMid(dateString) {
  const date = new Date(dateString);
  let result = "No hay fecha";
  if (isDate(date)) {
    result = format(date, `d 'de' MMMM HH:mm:ss`, {
      locale: esLocale,
    });
  }
  return result;
}

export function dateString(dateString) {
  const date = new Date(dateString);
  let result = "No hay fecha";
  if (isDate(date)) {
    result = format(addHours(date, 0), `dd/MM/yyyy HH:mm:ss `, {
      locale: esLocale,
    });
  }
  return result.trim();
}

export function dateStringRastreo(dateString) {
  const date = new Date(dateString);
  let result = "No hay fecha";
  if (isDate(date)) {
    result = format(addHours(date, 6), `dd/MM/yyyy HH:mm:ss `, {
      locale: esLocale,
    });
  }
  return result.trim();
}

export function dateStringDHL(date) {
  let result = "--";
  if (isDate(date)) {
    const finalDate = addHours(date, 8);
    const fecha = format(finalDate, `yyyy-MM-dd`);
    const hora = format(finalDate, `HH:mm:ss`);
    const gmt = "GMT-06:00";
    result = `${fecha}T${hora} ${gmt}`;
  }
  return result.trim();
}

export function bloqueToString(bloque) {
  let result = "";
  if (bloque === 1) {
    result = "10:00am - 7:00pm";
  } else if (bloque === 2) {
    result = "5:00pm - 9:00pm";
  }
  return result;
}

export function bloqueEntregaToString(bloque, md) {
  let result = "";
  if (md) {
    result = "10:00am - 9:00pm";
  } else {
    result = "10:00am - 7:00pm";
  }
  return result;
}

export function statusIdToString(status, size) {
  let result = "";
  const intStatus = isNaN(status) ? parseInt(status) : status;

  const small = size == "small" ? true : false;

  switch (intStatus) {
    case 1:
      return (
        <div className="flex flex-row gap-1 items-center">
          <MdAccessTimeFilled
            size={small ? 14 : 20}
            className="text-blue-500"
          />
          <p
            className={`font-semibold text-foreground ${
              small ? "text-xs" : "text-sm"
            }`}
          >
            Programado
          </p>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-row gap-1 items-center">
          <FaHome size={small ? 14 : 20} className="text-rose-500" />
          <p
            className={`font-semibold text-foreground ${
              small ? "text-xs" : "text-sm"
            }`}
          >
            Recolectado
          </p>
        </div>
      );
    case 8:
      return (
        <div className="flex flex-row gap-1 items-center">
          <IoIosWarning size={small ? 14 : 20} className="text-amber-700" />
          <p
            className={`font-semibold text-foreground ${
              small ? "text-xs" : "text-sm"
            }`}
          >
            Incidencia
          </p>
        </div>
      );
    case 4:
      return (
        <div className="flex flex-row gap-1 items-center">
          <HiCheckCircle size={small ? 14 : 20} className="text-green-500" />
          <p
            className={`font-semibold text-foreground ${
              small ? "text-xs" : "text-sm"
            }`}
          >
            Entregado
          </p>
        </div>
      );
    case 5:
      return (
        <div className="flex flex-row gap-1 items-center">
          <MdCancel size={small ? 14 : 20} className="text-red-500" />
          <p
            className={`font-semibold text-foreground ${
              small ? "text-xs" : "text-sm"
            }`}
          >
            Cancelado
          </p>
        </div>
      );
  }
}

export function statusCobroIdToString(status, size) {
  let result = "";
  const intStatus = isNaN(status) ? parseInt(status) : status;

  const small = size == "small" ? true : false;

  switch (intStatus) {
    case 1:
      return (
        <div className="flex flex-row gap-1 items-center">
          <MdAccessTimeFilled
            size={small ? 16 : 20}
            className="text-blue-500"
          />
          <p
            className={`font-semibold text-foreground ${
              small ? "text-xs" : "text-sm"
            }`}
          >
            Por cobrar
          </p>
        </div>
      );
    case 2:
      return (
        <div className="flex flex-row gap-1 items-center">
          <HiCheckCircle size={small ? 16 : 20} className="text-green-500" />
          <p
            className={`font-semibold text-foreground ${
              small ? "text-xs" : "text-sm"
            }`}
          >
            Cobrado
          </p>
        </div>
      );
    case 3:
      return (
        <div className="flex flex-row gap-1 items-center">
          <HiCheckCircle size={small ? 16 : 20} className="text-green-500" />
          <p
            className={`font-semibold text-foreground ${
              small ? "text-xs" : "text-sm"
            }`}
          >
            Confirmado
          </p>
        </div>
      );
    case 4:
      return (
        <div className="flex flex-row gap-1 items-center">
          <MdCancel size={small ? 16 : 20} className="text-red-500" />
          <p
            className={`font-semibold text-foreground ${
              small ? "text-xs" : "text-sm"
            }`}
          >
            Cancelado
          </p>
        </div>
      );
  }
}

export function currencyFormat(num) {
  return (
    "$" +
    Number(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

export function direccionBadge(direccion) {
  if (direccion.color && direccion.icon) {
    return (
      <Badge
        className={`cursor-pointer  pr-3 pl-2 py-0 bg-[${direccion.color}]`}
      >
        <div className="flex flex-row items-center gap-1">
          {direccion.icon == "home" && <FaHome />}
          {direccion.icon == "tienda" && <FaStore />}
          {direccion.icon == "oficina" && <FaBuilding />}
          {direccion.icon == "bodega" && <FaWarehouse />}
          <p className="text-xs capitalize">{direccion.nombreDireccion}</p>
        </div>
      </Badge>
    );
  } else {
    return (
      <Badge className={`cursor-pointer  pr-3 pl-2 py-0 bg-[#0ea5e9]`}>
        <div className="flex flex-row items-center gap-1">
          <FaHome />
          <p className="text-xs capitalize">{direccion.nombreDireccion}</p>
        </div>
      </Badge>
    );
  }
}
