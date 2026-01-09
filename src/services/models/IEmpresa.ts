import { IsUndefinedOrNull, IsUndefinedOrNullOrEmpty, IsUndefinedOrNullOrNaN } from "../../utils/Utils";
import { IElement } from "./IElement";
import * as SPConstants from "../utils/SPConstants";

export class SPEmpresa {

    /**
     * Parse Collection
     * @param data Collection API Object
     */
    public static ParseCollection = (data: any): IEmpresa[] => {

        if (IsUndefinedOrNull(data)) {
            return undefined;
        }

        const itemCollection: IEmpresa[] = [];

        if (data.constructor !== Array) {
            data = [data];
        }

        data.forEach((item: any) => {

            const itemValue = SPEmpresa.Parse(item);

            if (!IsUndefinedOrNull(itemValue)) {
                itemCollection.push(itemValue);
            }

        });

        return [...itemCollection];
    }

    /**
     * Parse
     * @param data API Object
     */
    public static Parse = (data: any): IEmpresa => {

        if (IsUndefinedOrNull(data)) {
            return undefined;
        }

        const { CS_ID, CS_Title } = SPConstants;

        return {
            Id: !IsUndefinedOrNullOrNaN(data[CS_ID]) ? data[CS_ID] : -1,
            Title: !IsUndefinedOrNullOrEmpty(data[CS_Title]) ? data[CS_Title] : null,
        };
    }
}

export interface IEmpresa extends IElement {
    Title: string
}