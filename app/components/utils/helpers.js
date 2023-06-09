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