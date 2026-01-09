import { IEmpresa } from "../../../services/models/IEmpresa";

export enum ElementActionsTypes {
    Empresa = '@@ElementActionsTypes/Empresas',
}

export type ElementAction =
    { type: ElementActionsTypes.Empresa, data: IEmpresa} 
