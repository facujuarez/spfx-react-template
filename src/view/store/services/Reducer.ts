
import { IAZService } from "../../../services/services/IAZService";
import { ISPService } from "../../../services/services/ISPService";
import { ServicesActions, ServicesActionsTypes } from "./Types";

export interface IServicesState {
    SPService: ISPService,
    AZService: IAZService 
}

const InitialState: IServicesState = {
    SPService: null,
    AZService: null
}

const Types = ServicesActionsTypes;

const Reducer = (state: IServicesState = InitialState, action: ServicesActions): IServicesState => {

    switch (action.type) {

        case Types.SPService:
            return { ...state, SPService: action.data };

        case Types.AZService:
            return { ...state, AZService: action.data };

        default:
            return state;
    }

}

export { Reducer as ServicesReducer };
export { InitialState as ServicesInitialState };