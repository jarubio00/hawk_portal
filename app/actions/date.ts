import { formatInTimeZone, toDate, utcToZonedTime, getTimezoneOffset } from 'date-fns-tz'


export   function ServerDate(date: Date) {

    const offset = getTimezoneOffset('America/Mexico_City', date);
    const result = new Date(date.valueOf() + offset);


    return result as Date;
}