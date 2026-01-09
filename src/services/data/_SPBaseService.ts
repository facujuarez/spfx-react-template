import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ArgumentNullException, IsUndefinedOrNull, IsUndefinedOrNullOrEmpty } from "../../utils/Utils";
import { spfi, SPFI, SPFx, SPInit } from "@pnp/sp";
import { IList } from "@pnp/sp/lists";
import "@pnp/sp/sites";
import "@pnp/sp/presets/all";

export class SPBaseService {

    public _sp: SPFI = null;
    public _list: IList = null;

    constructor(context: WebPartContext, webAbsoluteUrl?: string, webListRootFolder?: string) {

        if (IsUndefinedOrNull(context)) {
            throw new ArgumentNullException('context');
        }

        if (IsUndefinedOrNullOrEmpty(webAbsoluteUrl)) {
            this._sp = spfi().using(SPFx(context));
        } else {
            this._sp = spfi(webAbsoluteUrl).using(SPFx(context));
        }

        if (!IsUndefinedOrNullOrEmpty(webListRootFolder)) {
            this._list = this._sp.web.getList(webListRootFolder);
        }
    }

}

export interface ISPBaseProperties {
    Context: WebPartContext, // add Extension context
    WebAbsoluteUrl?: string,
    WebListRootFolder: string
}