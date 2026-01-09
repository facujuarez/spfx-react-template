import { EnsureSlash, IsUndefinedOrNull, IsUndefinedOrNullOrEmpty, StartsWith } from "../../utils/Utils";

//Local Storage
export const LS_IdEmpresa = "75445F950D574E4180A18AC8143A035F";
export const LS_IdEmpresaFetched = "D88E860308F34C648574236BD368DD82";
export const LS_IdEmpresaFetchedObject = "D735DB5CD7CE4CA3AD000A0F87C87855";

//Tipo
export const SEARCH_IdEmpresa = "IdEmpresa";
export const SEARCH_TYPE_General = "General";
export const SEARCH_TYPE_Empresa = "Empresa";

//Transversales
export const CS_Id = "Id";
export const CS_ID = "ID";
export const CS_Title = "Title";

// Sites
export const W_Participadas = "Participadas";

// Lists
export const L_Empresas = "Lists/Empresas";

export interface IAZProperties {
    ResourceId: string,
    EndPoint_Empresas_GetById: string,
    EndPoint_Empresas_GetByIdExpandAuditoresConsejosValues: string,
    EndPoint_Empresas_GeneradorInformes: string,
}

export const AZ_CONFIGURATION_PRO: IAZProperties = {
    ResourceId: "33ea0aff-84a4-48ec-81d9-09e6dfc13334",
    EndPoint_Empresas_GetById: "https://cepa-api-pro.azure-api.net/cepa-api-pro/v1/Empresas/Items",
    EndPoint_Empresas_GetByIdExpandAuditoresConsejosValues: "https://cepa-api-pro.azure-api.net/cepa-api-pro/v1/EmpresasExpandValues/Items",
    EndPoint_Empresas_GeneradorInformes: "https://cepa-api-pro.azure-api.net/cepa-api-pro/v1/Empresas/GenerarInformeEmpresas",
}

export const AZ_CONFIGURATION_PRE: IAZProperties = {
    ResourceId: "8a114b25-5a20-40be-8ba0-681149e195d6",
    EndPoint_Empresas_GetById: "https://cepa-api-dev.azure-api.net/cepa-api-dev/v1/Empresas/Items",
    EndPoint_Empresas_GetByIdExpandAuditoresConsejosValues: "https://cepa-api-dev.azure-api.net/cepa-api-dev/v1/EmpresasExpandValues/Items",
    EndPoint_Empresas_GeneradorInformes: "https://cepa-api-dev.azure-api.net/cepa-api-dev/v1/Empresas/GenerarInformeEmpresas",
}

export const AZ_CONFIGURATION_PRO_HerramientaParticipadas: IAZProperties = {
    ResourceId: "33ea0aff-84a4-48ec-81d9-09e6dfc13334",
    EndPoint_Empresas_GetById: "https://cepa-api-pro.azure-api.net/cepa-api-herramientaparticipadas-pro/v1/Empresas/Items",
    EndPoint_Empresas_GetByIdExpandAuditoresConsejosValues: "https://cepa-api-pro.azure-api.net/cepa-api-herramientaparticipadas-pro/v1/EmpresasExpandValues/Items",
    EndPoint_Empresas_GeneradorInformes: "https://cepa-api-pro.azure-api.net/cepa-api-herramientaparticipadas-pro/v1/Empresas/GenerarInformeEmpresas",
}

export const IsProduction = (): boolean => {

    if (!IsUndefinedOrNull(window) && !IsUndefinedOrNull(window.location) && !IsUndefinedOrNullOrEmpty(window.location.hostname)) {

        if (window.location.hostname === 'accorporacionaragon.sharepoint.com') {
            return true;
        }
    }

    return false;
}

/**
 * Resuelve la configuración de Az correspondiente a cada entorno de la solución
 * @param webAbsoluteUrl 
 * @returns 
 */
export const ResolveAzureConfiguracion = (webAbsoluteUrl: string): IAZProperties => {

    const url = new URL(webAbsoluteUrl);

    switch (url.hostname.toLowerCase()) {

        case 'accorporacionaragon.sharepoint.com':

            if (StartsWith(url.pathname.toLowerCase(), '/sites/herramientaparticipadas')) {
                return AZ_CONFIGURATION_PRO_HerramientaParticipadas;
            }

            if (StartsWith(url.pathname.toLowerCase(), '/sites/pre')) {
                return AZ_CONFIGURATION_PRO;
            }

            if (StartsWith(url.pathname.toLowerCase(), '/sites/pre2')) {
                return AZ_CONFIGURATION_PRO;
            }

            break;

        case 'hiberus365.sharepoint.com':
        default:

            if (StartsWith(url.pathname.toLowerCase(), '/sites/dev-cepa-participadas-04')) {
                return AZ_CONFIGURATION_PRE;
            }

            if (StartsWith(url.pathname.toLowerCase(), '/sites/dpobo_cepa_participadas_des18')) {
                return AZ_CONFIGURATION_PRE;
            }

            break;
    }

    throw new Error("No se ha encontrado la SC de documentación");
}

/**
 * Resuelve la SC de documentación según la SC de participadas
 * @param webParticipadasAbsoluteUrl 
 */
export const ResolveDocumentationSC = (webParticipadasAbsoluteUrl: string) => {

    const url = new URL(webParticipadasAbsoluteUrl);

    switch (url.hostname.toLowerCase()) {

        case 'accorporacionaragon.sharepoint.com':

            if (StartsWith(url.pathname.toLowerCase(), '/sites/herramientaparticipadas')) {
                return `${url.protocol}//${EnsureSlash(url.hostname)}sites/HerramientaParticipadasDoc`;
            }

            if (StartsWith(url.pathname.toLowerCase(), '/sites/pre2')) {
                return `${url.protocol}//${EnsureSlash(url.hostname)}sites/PRE2_Doc`;
            }

            if (StartsWith(url.pathname.toLowerCase(), '/sites/pre')) {
                return `${url.protocol}//${EnsureSlash(url.hostname)}sites/PRE_Doc`;
            }

            break;

        case 'hiberus365.sharepoint.com':
        default:

            if (StartsWith(url.pathname.toLowerCase(), '/sites/dev-cepa-participadas-04')) {
                return `${url.protocol}//${EnsureSlash(url.hostname)}sites/dev-cepa-documentos-02`;
            }

            if (StartsWith(url.pathname.toLowerCase(), '/sites/dpobo_cepa_participadas_des18')) {
                return `${url.protocol}//${EnsureSlash(url.hostname)}sites/dev-cepa-documentos-02`;
            }

            break;
    }

    throw new Error("No se ha encontrado la SC de documentación");
}