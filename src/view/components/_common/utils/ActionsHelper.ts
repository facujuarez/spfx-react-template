import { IsUndefinedOrNull, IsUndefinedOrNullOrNaN, IsUndefinedOrNullOrEmpty, EnsureSlash, NewGuidToStringD } from "../../../../utils/Utils";
import * as strings from 'WebPartStrings';

const Actions = (): IHelper => {

    const actions: IHelper = {
        IsUndefinedOrNull,
        IsUndefinedOrNullOrNaN,
        IsUndefinedOrNullOrEmpty,
        EnsureSlash,
        NewGuidToStringD,
        strings: strings
    }

    return actions;
}

export interface IHelper {

    /**
    * Comprueba si un objeto tiene valor
    * @param value Objeto
    */
    IsUndefinedOrNull: (value: any) => boolean;

    /**
     * Comprueba si un objeto tiene valor
     * @param value Valor
     */
    IsUndefinedOrNullOrNaN: (value: number) => boolean;

    /**
     * Comprueba si un objeto tiene valor y es string.Empty
     * @param value Objeto
     */
    IsUndefinedOrNullOrEmpty: (value: any) => boolean;

    /**
     * Ensure slash
     */
    EnsureSlash: (value: string) => string;

    /**
    * Guid - FormatString - D
    */
    NewGuidToStringD: () => string;

    /**
     * Strings
     */
    strings: IWebPartStrings;
}

export { Actions as ActionsHelper };