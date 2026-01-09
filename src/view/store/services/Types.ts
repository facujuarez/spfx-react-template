import { IAZService } from "../../../services/services/IAZService";
import { ISPService } from "../../../services/services/ISPService";


export enum ServicesActionsTypes {
    SPService = '@@ServicesActionsTypes/SPService',
    AZService = '@@ServicesActionsTypes/AZService'
}

export type ServicesActions =
    { type: ServicesActionsTypes.SPService, data: ISPService } |
    { type: ServicesActionsTypes.AZService, data: IAZService };