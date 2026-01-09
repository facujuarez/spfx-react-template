
export interface IAZEmpresasService {

    /**
     * ObtenerElementPorID
     */
     ObtenerElementPorID(empresaId: number): Promise<JSON>
    
    /**
     * Genera informe de empresas
     */
    GenerarInformeEmpresas(empresasId: number[], aplicaTodasEmpresas: boolean): Promise<Blob>
}