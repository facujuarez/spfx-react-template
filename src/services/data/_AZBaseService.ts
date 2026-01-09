import { AadHttpClient, AadTokenProviderFactory, AadTokenProvider, AadHttpClientFactory, HttpClient } from "@microsoft/sp-http";
import { ArgumentNullException, IsUndefinedOrNull } from "../../utils/Utils";

export class AZBaseService {

  _client: AadHttpClientFactory = null;
  _httpClient: HttpClient = null;
  _tokenProvider: AadTokenProviderFactory = null;

  constructor(client: AadHttpClientFactory, tokenProvider: AadTokenProviderFactory, httpClient: HttpClient) {

    if (IsUndefinedOrNull(client)) {
      throw new ArgumentNullException('client');
    }

    this._client = client;

    if (IsUndefinedOrNull(httpClient)) {
      throw new ArgumentNullException('httpclient');
    }

    this._httpClient = httpClient;

    if (!IsUndefinedOrNull(tokenProvider)) {
      this._tokenProvider = tokenProvider;
    }

  }

  /**
   * Obtiene token de aplicacion 
   * @param resourceId ResourceId
   */
  public GetAccessTokenByResourceId = (resourceId: string): Promise<string> => new Promise<string>((resolve, reject) => {

    try {

      if (IsUndefinedOrNull(this._tokenProvider)) {
        return reject(new Error('Inesperado'));
      }

      return this._tokenProvider.getTokenProvider()
        .then((tokenProvider: AadTokenProvider): Promise<string> => tokenProvider.getToken(resourceId))
        .then((accessToken: string): void => resolve(accessToken))
        .catch(e => reject(e))
        .catch(e => reject(e));

    } catch (error) {
      return reject(error);
    }

  });

  /**
  * Se autentica contra un recurso de azure a partir del identificador de la aplicación registrada en el AAD
   * @param resourceId 
   * @returns 
   */
  public GetClientByResourceId = (resourceId: string): Promise<AadHttpClient> => new Promise<AadHttpClient>((resolve, reject) => {

    try {

      return resolve(this._client.getClient(resourceId));

    } catch (error) {
      return reject(error);
    }

  });
}

export interface IAZServiceBase {

  /**
   * Obtiene token de aplicacion 
   * @param resourceId ResourceId
   */
  GetAccessTokenByResourceId(resourceId: string): Promise<string>,

  /**
   * Obtiene token de solicitudes
   */
  GetClientByResourceId(resourceId: string): Promise<AadHttpClient>
}