import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/items";
import { IEmpresasService } from "../services/IEmpresasService";
import { IEmpresa, SPEmpresa } from "../models/IEmpresa";
import { ISPBaseProperties, SPBaseService } from "./_SPBaseService";
import { CamlHelper } from "../utils/CamlHelper";
import * as SPConstants from "../utils/SPConstants";
import { IsUndefinedOrNull } from "../../utils/Utils";

export class SPEmpresasService extends SPBaseService implements IEmpresasService {

    constructor(properties: ISPBaseProperties) {
        super(properties?.Context, properties?.WebAbsoluteUrl, properties?.WebListRootFolder);
    }

    /**
     * Obtiene todas las empresas
     * @returns 
     */
    public GetAll = (): Promise<IEmpresa[]> => new Promise<IEmpresa[]>((resolve, reject) => {

        try {

            const { CS_ID, CS_Title } = SPConstants;
            let viewFieldsString: string[] = [CS_ID, CS_Title];
            const viewFields: string = CamlHelper.ViewFields(viewFieldsString.map(d => CamlHelper.FieldRef(d)));
            const query = CamlHelper.Query(CamlHelper.OrderBy(`<FieldRef Name='${CS_Title}' Ascending='TRUE'/>`));
            const rowLimit: string = CamlHelper.RowLimitBy(5000);

            return this._list
                .getItemsByCAMLQuery({ ViewXml: CamlHelper.View(`${query}${viewFields}${rowLimit}`) })
                .then(items => {

                    if (IsUndefinedOrNull(items) || items.length <= 0) {
                        return resolve(null);
                    }

                    return resolve(SPEmpresa.ParseCollection(items));

                }).catch(e => reject(e));

        } catch (error) {
            return reject(error);
        }

    });

}