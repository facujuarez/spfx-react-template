import { AadHttpClient, AadTokenProviderFactory, AadHttpClientFactory, HttpClient, HttpClientResponse } from "@microsoft/sp-http";
import { ArgumentNullException, IsUndefinedOrNull, EnsureSlash } from "../../utils/Utils";
import { IAZEmpresasService } from "../services/IAZEmpresasService";
import { IAZProperties } from "../utils/SPConstants";
import { AZBaseService } from "./_AZBaseService";

export class AZEmpresasService extends AZBaseService implements IAZEmpresasService {

    private _properties: IAZProperties = null;

    constructor(client: AadHttpClientFactory, tokenProvider: AadTokenProviderFactory, httpClient: HttpClient, properties: IAZProperties) {
        super(client, tokenProvider, httpClient);

        if (IsUndefinedOrNull(properties)) {
            throw new ArgumentNullException('properties');
        }

        this._properties = properties;
    }

    /**
     * Obtener empresa por ID
     */
    public ObtenerElementPorID = (empresaID: number) => new Promise<JSON>(async (resolve, reject) => { 
        try {
            const { 
                ResourceId, 
                EndPoint_Empresas_GetById, 
                EndPoint_Empresas_GetByIdExpandAuditoresConsejosValues } = this._properties;

            let client: Promise<HttpClientResponse> = null;

            const clientAd = await this.GetClientByResourceId(ResourceId);

            const requestHeaders: Headers = new Headers();
            requestHeaders.append('Content-type', 'application/json');

            let URL_Empresa_GetById = '';

            if (!IsUndefinedOrNull(empresaID) && empresaID > 0) {
                URL_Empresa_GetById = EnsureSlash(EndPoint_Empresas_GetByIdExpandAuditoresConsejosValues).concat(empresaID.toString());
            }

            client = clientAd.fetch(URL_Empresa_GetById, AadHttpClient.configurations.v1, {
                method: 'GET',
                mode: 'cors',
                headers: requestHeaders
            });

            if (IsUndefinedOrNull(client)) {
                return resolve(null);
            }

            client.then(result => {

                if (!result.ok) {
                    return reject("Error inesperado");
                }

                if (result.status === 204) {
                    return reject("Error inesperado");
                }

                result.json().then(resp => resolve(resp)).catch(e => reject(e));

            }).catch(e => reject(e));

        } catch (error) {
            return reject("Error inesperado");
        }
    });

    /**
     * Genera informe de empresas
     */
    public GenerarInformeEmpresas = (empresasId: number[], aplicaTodasEmpresas: boolean): Promise<Blob> => new Promise<Blob>(async (resolve, reject) => {

        try {

            const { ResourceId, EndPoint_Empresas_GeneradorInformes } = this._properties;

            let client: Promise<HttpClientResponse> = null;

            const clientAd = await this.GetClientByResourceId(ResourceId);

            const requestHeaders: Headers = new Headers();
            requestHeaders.append('Content-type', 'application/json');

            let data = { ['AplicaTodasEmpresas']: aplicaTodasEmpresas };

            if (!IsUndefinedOrNull(empresasId) && empresasId.length > 0) {
                data = { ...data, ...{ 'IdEmpresas': empresasId } };
            }

            client = clientAd.fetch(EndPoint_Empresas_GeneradorInformes, AadHttpClient.configurations.v1, {
                method: 'POST',
                mode: 'cors',
                headers: requestHeaders,
                body: JSON.stringify({ ...data })
            });

            if (IsUndefinedOrNull(client)) {
                return resolve(null);
            }

            client.then(result => {

                if (!result.ok) {
                    return reject("Error inesperado");
                }

                if (result.status === 204) {
                    return reject("Error inesperado");
                }

                result.blob().then(j => resolve(j)).catch(e => reject(e));

            }).catch(e => reject(e));

        } catch (error) {
            return reject("Error inesperado");
        }

    });

}