import esLocale from 'date-fns/locale/es';
import {format, isDate} from 'date-fns';

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

export function bloqueToString(bloque) {
    let result = ''
    if (bloque === 1) {
        result = '10:00am - 3:00pm'
    } else if (bloque === 2) {
        result = '3:00pm - 8:00pm'
    }
return result;
}

