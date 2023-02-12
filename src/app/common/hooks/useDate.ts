import {DateTime} from "luxon";
import {useCallback} from "react";

export const useDate = () => {

    const FORMAT_YYYY_MM_DD_HH_MM_SS = 'yyyy-LL-dd HH:mm:ss';
    const FORMAT_YYYY_MM_DD = 'yyyy-LL-dd';
    const FORMAT_DD_MM_YYYY = 'dd/LL/yyyy';

    const formatDate = useCallback( (date: Date, pattern: string): string => {

        return DateTime.fromJSDate( date, {zone: 'utc'} ).toFormat( pattern );
    }, [] );

    const convertToDate = useCallback( (date: string, pattern: string): Date => {

        return DateTime.fromFormat(date, pattern).toJSDate();
    }, [] );

    return { formatDate, convertToDate, FORMAT_YYYY_MM_DD_HH_MM_SS, FORMAT_YYYY_MM_DD, FORMAT_DD_MM_YYYY };
}