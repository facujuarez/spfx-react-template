import { IEmpresa } from "../models/IEmpresa";

export interface IEmpresasService {

    /**
     * Obtiene todas las empresas
     */
    GetAll:() => Promise<IEmpresa[]>
    
}