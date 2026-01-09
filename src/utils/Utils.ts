import { Guid } from "@microsoft/sp-core-library";

export const CallNTimes = (func: Function, num: number, delay: number) => {
    if (!num) return;
    func();
    setTimeout(function () { CallNTimes(func, num - 1, delay); }, delay);
}

export const DatesUtility = {
    pad: function (number: number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    },

    GetMonthAsString: function (monthJS: number) {

        switch (monthJS) {
            case 0: return "Enero";
            case 1: return "Febrero";
            case 2: return "Marzo";
            case 3: return "Abril";
            case 4: return "Mayo";
            case 5: return "Junio";
            case 6: return "Julio";
            case 7: return "Agosto";
            case 8: return "Septiembre";
            case 9: return "Octubre";
            case 10: return "Noviembre";
            case 11: return "Diciembre";
            default:
                throw new Error('Inesperado');
        }
    },

    GetDayAsStringIfWorkable: function (date: Date) {

        const dayOfWeek = date.getDay();

        switch (dayOfWeek) {
            case 1: return 'L';
            case 2: return 'M';
            case 3: return 'X';
            case 4: return 'J';
            case 5: return 'V';
            default:
                return null;
        }

    },

    GetDaysInMonth: function (year: number, month: number) {

        const daysInMonth = new Date(year, month, 0).getDate();
        const daysApply: IDayOfWork[] = [];

        for (let index = 1; index < daysInMonth; index++) {
            const date = new Date(year, month, index);
            const dateAsWorkable = DatesUtility.GetDayAsStringIfWorkable(date);

            if (!IsUndefinedOrNullOrEmpty(dateAsWorkable)) {
                daysApply.push({ Day: date.getDate(), DayAsSortString: dateAsWorkable })
            }

        }

        return daysApply;
    },

    CreateISO8601DateTimeFromSystemDateTime: function (dt: Date) {

        if (IsUndefinedOrNull(dt)) {
            return '';
        }

        return dt.getFullYear() +
            '-' + DatesUtility.pad(dt.getMonth() + 1) +
            '-' + DatesUtility.pad(dt.getDate()) +
            'T' + DatesUtility.pad(dt.getHours()) +
            ':' + DatesUtility.pad(dt.getMinutes()) +
            ':' + DatesUtility.pad(dt.getSeconds()) +
            'Z';
    },

    CreateDayMonthYear: function (dt: Date): string {

        if (IsUndefinedOrNull(dt)) {
            return '';
        }

        return `${AddZeroIfNecessary(dt.getDate())}/${AddZeroIfNecessary(dt.getMonth() + 1)}/${dt.getFullYear()}`;
    },

    CreateYearMonthDayWithoutSeparation: function (dt: Date): string {

        if (IsUndefinedOrNull(dt)) {
            return '';
        }

        return `${dt.getFullYear()}${AddZeroIfNecessary(dt.getMonth() + 1)}${AddZeroIfNecessary(dt.getDate())}`;
    },

    CreateYearMonthDayNumberWithOutSeparation: function (dt: Date) {

        const year: number = dt.getFullYear();
        const month: number = dt.getMonth() + 1;
        const day: number = dt.getDate();

        if (IsUndefinedOrNull(year) || IsUndefinedOrNull(month) || IsUndefinedOrNull(day)) {
            return '';
        }

        return `${AddZeroIfNecessary(year)}${AddZeroIfNecessary(month)}${day}`;
    },

    CreateDayMonthYearNumber: function (year: number, month: number, day: number) {

        if (IsUndefinedOrNull(year) || IsUndefinedOrNull(month) || IsUndefinedOrNull(day)) {
            return '';
        }

        return `${AddZeroIfNecessary(day)}/${AddZeroIfNecessary(month)}/${year}`;
    },

    GetRangeAsArrayText: function (fromDate: Date, toDate: Date) {

        if (IsUndefinedOrNull(fromDate)) {
            return [];
        }

        if (IsUndefinedOrNull(toDate)) {
            return [];
        }

        const datesBetween = [];

        for (let dt = fromDate; dt <= toDate; dt.setDate(dt.getDate() + 1)) {
            datesBetween.push(DatesUtility.CreateDayMonthYear(dt));
        }

        return datesBetween;
    },

    GetRange: function (fromDate: Date, toDate: Date) {

        const fromYear = fromDate.getFullYear();
        const fromMonth = fromDate.getMonth();
        const toYear = toDate.getFullYear();
        const toMonth = toDate.getMonth();

        const months: IDateRange[] = [];

        for (let year = fromYear; year <= toYear; year++) {
            let month = year === fromYear ? fromMonth : 0;
            const monthLimit = year === toYear ? toMonth : 11;
            for (; month <= monthLimit; month++) {

                months.push({
                    Year: year,
                    Month: month + 1,
                    MonthAsString: DatesUtility.GetMonthAsString(month),
                    Days: DatesUtility.GetDaysInMonth(year, month),
                    Color: Math.floor(Math.random() * 16777215).toString(16)
                });
            }
        }
        return months;
    },

    CreateMaxTimeDay: function (dt: Date): Date  {

        if (IsUndefinedOrNull(dt)) {
            return null;
        }

        const year: number = dt.getFullYear();
        const month: number = dt.getMonth();
        const day: number = dt.getDate();

        return new Date(year, month, day, 23, 59, 59);
    },

    CreateMinTimeDay: function (dt: Date): Date | null {

        if (IsUndefinedOrNull(dt)) {
            return null;
        }

        const year: number = dt.getFullYear();
        const month: number = dt.getMonth();
        const day: number = dt.getDate();

        return new Date(year, month, day, 0, 0, 0);
    }
};

export interface IDateRange {
    Year: number,
    Month: number,
    MonthAsString: string,
    Days: IDayOfWork[],
    Color: string
}

export interface IDayOfWork {
    Day: number,
    DayAsSortString: string | null
}

/**
 * Empieza por
 * @param str 
 * @param word 
 * @returns 
 */
export const StartsWith = (str: string, word: string) => str.lastIndexOf(word, 0) === 0;

/**
 * Comprueba si un objeto tiene valor
 * @param value Objeto
 */
export const IsUndefinedOrNull = (value: any): boolean => typeof value === 'undefined' || null === value;

/**
 * Comprueba si un objeto tiene valor
 * @param value Valor
 */
export const IsUndefinedOrNullOrNaN = (value: number): boolean => IsUndefinedOrNull(value) || isNaN(value);

/**
 * Comprueba si un objeto tiene valor y es string.Empty
 * @param value Objeto
 */
export const IsUndefinedOrNullOrEmpty = (value: any): boolean => IsUndefinedOrNull(value) || '' === value;

/**
 * ArgumnentNulLReferenceException
 */
export class ArgumentNullException extends Error {

    constructor(property: string) {
        super(`ArgumentNullException: ${property}`);
    }
}

/**
 * Asegura acabar la URL con /
 */
export const EnsureSlash = (value: string): string => {

    if (IsUndefinedOrNullOrEmpty(value)) {
        return '/';
    }

    return value[value.length - 1] === '/' ? value : `${value}/`;
}

/**
 * Devuelve un array con los cortes
 * @param arr Array
 * @param chunkSize Tamaño del corte
 */
export const ChunkBySize = (arr: any[], chunkSize: number) => {
    const R = [];
    for (var i = 0, len = arr.length; i < len; i += chunkSize)
        R.push(arr.slice(i, i + chunkSize));
    return R;
}

/**
 * Nodo Html
 * @param id Id
 * @returns
 */
export const CreateNode = (id: string) => {
    const div = document.createElement("div");
    div.setAttribute("id", id);
    return div;
}

/**
 * Guid - FormatString - D
 */
export const NewGuidToStringD = (): string => Guid.newGuid().toString().replace(/-/g, '');

/**
 * ToBoolean
 * @param data string
 * @returns
 */
export const ConvertToBoolean = (data: any) => IsUndefinedOrNull(data) ? false : JSON.parse(String(data).toLowerCase());

/**
 * ToInteger
 * @param data 
 * @returns 
 */
export const ConvertToInteger = (data: any): number | null => {

    if (IsUndefinedOrNullOrEmpty(data)) {
        return null;
    }

    if (!IsSafeInteger(data)) {
        return null;
    }

    return parseInt(data, 10);
}

export const IsSafeInteger = (str: any): boolean => {
    var match = /^[-+]?0*(\d+)$/.exec(String(str));
    return !!match && +match[1] < Math.pow(2, 53);
}

/**
* Añade un 0 si 1..9
* @param value Día / Mes
*/
export const AddZeroIfNecessary = (value: number): string => value.toString().length === 1 ? `0${value}` : `${value}`;

/**
 * Comprueba si toda la colección es nula o no tiene valores
 * @param args args
 * @returns 
 */
export const AllCollectionsNullOrEmpty = (...args: any[]): boolean => {

    if (IsUndefinedOrNull(args) || args.length <= 0) {
        return true;
    }

    let withValue: boolean = false;

    args.forEach(d => {

        if (withValue) {
            return;
        }

        if (!IsUndefinedOrNull(d) && d.length > 0) {
            withValue = true;
        }

    });

    return !withValue;
}

/**
 * Intenta recuperar valor. Si no tiene dato devuelve ''
 * @param data data
 * @returns 
 */
export const TryGetStringValue = (data: any) => IsUndefinedOrNullOrEmpty(data) ? '' : data;

/**
 * Intenta recuperar value de Lookup
 * @param data data
 * @returns 
 */
export const TryGetStrinValueLookup = (data: ISPLookupValue) => {

    if (IsUndefinedOrNull(data) || IsUndefinedOrNullOrEmpty(data.Value)) {
        return '';
    }

    return data.Value;
}

/**
 * Mapea por columna
 * @param source []
 * @param bySourceColumn 
 */
export const MapByColumn = (source: any[], bySourceColumn: string): any[] | null => {

    if (IsUndefinedOrNull(source) || source.length <= 0) {
        return null;
    }

    if (IsUndefinedOrNullOrEmpty(bySourceColumn)) {
        return source;
    }

    return source.map(d => d[bySourceColumn]);
}

/**
 * 
 * Obtiene el subconjutno que aplica una serie de claves por una columna 
 */
export const GetSubset = (source: any[], comparerId: number[], bySourceColumn: string, retrieveSourceIfCompararNull: boolean): any[] => {

    if (IsUndefinedOrNull(source) || source.length < 0) {
        return source;
    }

    if (IsUndefinedOrNullOrEmpty(bySourceColumn)) {
        return source;
    }

    //Si no hay comparador
    if (IsUndefinedOrNull(comparerId) || comparerId.length <= 0) {

        if (retrieveSourceIfCompararNull) {
            return source;
        }

        return [];
    }

    const finalItems: any[] = [];

    source.forEach(sourceItem => {

        if (IsUndefinedOrNull(sourceItem) || IsUndefinedOrNull(sourceItem[bySourceColumn])) {
            return;
        }

        comparerId.forEach(comparerIdItem => {

            if (IsUndefinedOrNull(comparerIdItem)) {
                return;
            }

            if (sourceItem[bySourceColumn] === comparerIdItem) {
                finalItems.push(sourceItem);
            }

        });

    });

    return finalItems;
}

/**
 * Get the value of a querystring
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 * @return {String}       The field value
 */
 export const GetQueryStringParam = (field: string, urlSearch: string): string | null => {

    if (IsUndefinedOrNullOrEmpty(field)) {
        return null;
    }

    if (IsUndefinedOrNullOrEmpty(urlSearch)) {
        return null;
    }

    const reg = new RegExp("[?&#]" + field.toLowerCase() + "=([^&#]*)", "i");
    const qs = reg.exec(urlSearch.toLowerCase());
    return qs ? qs[1] : null;
} 

export interface ISPLookupValue {
    Id: number,
    Value: string
}