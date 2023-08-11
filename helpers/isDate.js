import { DateTime } from 'luxon';

export const isDate  = (value) => {
    if (!value) return false;
    if (DateTime.fromISO(value).isValid) return true;
    return false;
}