import esLocale from 'date-fns/locale/es';
import {format, isDate} from 'date-fns';
import {MdAccessTimeFilled, MdCancel} from 'react-icons/md'
import {HiCheckCircle} from 'react-icons/hi'
import {IoIosWarning} from 'react-icons/io'

export function namedDate(date) {
    let result = 'No hay fecha'
    if (isDate(date)) {
        result = format(date, `EEEE, d 'de' MMMM 'de' yyyy `, {locale: esLocale});
    }
    return result;
  }

export function namedDateString(dateString) {
    const date = new Date(dateString);
    let result = 'No hay fecha'
    if (isDate(date)) {
        result = format(date, `EEEE, d 'de' MMMM 'de' yyyy `, {locale: esLocale});
    }
return result;
}

export function namedDateStringFull(dateString) {
    const date = new Date(dateString);
    let result = 'No hay fecha'
    if (isDate(date)) {
        result = format(date, `EEEE, d 'de' MMMM 'de' yyyy  HH:mm:ss`, {locale: esLocale});
    }
return result;
}

export function dateString(dateString) {
    const date = new Date(dateString);
    let result = 'No hay fecha'
    if (isDate(date)) {
        result = format(date, `dd/MM/yyyy HH:mm:ss `, {locale: esLocale});
    }
return result;
}

export function bloqueToString(bloque) {
    let result = ''
    if (bloque === 1) {
        result = '10:00am - 3:00pm'
    } else if (bloque === 2) {
        result = '3:00pm - 8:00pm'
    }
return result;
}

export function statusIdToString(status, size) {
    let result = ''
    const intStatus = isNaN(status) ? parseInt(status) : status;

    const small = size == 'small' ? true : false;

    switch(intStatus) {
        case 1:
            return <div className='flex flex-row gap-1 items-center'>
                <MdAccessTimeFilled size={small ? 14 : 20} className="text-blue-500"/>
                <p className={`font-semibold text-foreground ${small ? 'text-xs' : 'text-sm'}`}>Programado</p>
            </div>
        case 8:
            return <div className='flex flex-row gap-1 items-center'>
                <IoIosWarning size={small ? 14 : 20} className="text-amber-700"/>
                <p className={`font-semibold text-foreground ${small ? 'text-xs' : 'text-sm'}`}>Incidencia</p>
            </div>
        case 4:
            return <div className='flex flex-row gap-1 items-center'>
                <HiCheckCircle size={small ? 14 : 20} className="text-green-500"/>
                <p className={`font-semibold text-foreground ${small ? 'text-xs' : 'text-sm'}`}>Entregado</p>
            </div>
        case 5:
            return <div className='flex flex-row gap-1 items-center'>
                <MdCancel size={small ? 14 : 20} className="text-red-500"/>
                <p className={`font-semibold text-foreground ${small ? 'text-xs' : 'text-sm'}`}>Cancelado</p>
            </div>

    }
    
}

export function statusCobroIdToString(status, size) {
    let result = ''
    const intStatus = isNaN(status) ? parseInt(status) : status;

    const small = size == 'small' ? true : false;

    switch(intStatus) {
        case 1:
            return <div className='flex flex-row gap-1 items-center'>
                <MdAccessTimeFilled size={small ? 14 : 20} className="text-blue-500"/>
                <p className={`font-semibold text-foreground ${small ? 'text-xs' : 'text-sm'}`}>Por cobrar</p>
            </div>
        case 2:
            return <div className='flex flex-row gap-1 items-center'>
                <IoIosWarning size={small ? 14 : 20} className="text-amber-700"/>
                <p className={`font-semibold text-foreground ${small ? 'text-xs' : 'text-sm'}`}>Cobrado</p>
            </div>
        case 3:
            return <div className='flex flex-row gap-1 items-center'>
                <HiCheckCircle size={small ? 14 : 20} className="text-green-500"/>
                <p className={`font-semibold text-foreground ${small ? 'text-xs' : 'text-sm'}`}>Confirmado</p>
            </div>
        case 4:
            return <div className='flex flex-row gap-1 items-center'>
                <MdCancel size={small ? 14 : 20} className="text-red-500"/>
                <p className={`font-semibold text-foreground ${small ? 'text-xs' : 'text-sm'}`}>Cancelado</p>
            </div>

    }
    
}




