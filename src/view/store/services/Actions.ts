import { IAZService } from "../../../services/services/IAZService";
import { ISPService } from "../../../services/services/ISPService";
import { ServicesActions, ServicesActionsTypes } from "./Types";


const Actions = (action: React.Dispatch<ServicesActions>): IServicesActions => {

    const setSPService = (data: ISPService): void => action({ type: ServicesActionsTypes.SPService, data });
    
    const setAZService = (data: IAZService): void => action({ type: ServicesActionsTypes.AZService, data });

    const actions: IServicesActions = {
        setSPService,
        setAZService
    }

    return actions;
}

export interface IServicesActions {
    setSPService: (data: ISPService) => void,
    setAZService: (data: IAZService) => void
}

export { Actions as ServicesActions };