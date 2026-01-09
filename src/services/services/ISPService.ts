import { IEmpresa } from "../models/IEmpresa";

export interface ISPService {

    /**
     * Obtiene todas las empresas
     */
    GetAll:() => Promise<IEmpresa[]>
    
}