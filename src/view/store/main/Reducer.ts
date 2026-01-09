import { ICustomMessage, ICustomSpinner } from "../../components/_common/utils/IStoreCommon";
import { MainActions, MainActionsTypes } from "./Types";

export type WebPartStageType = 'InitialFetch' | 'ShowWP' | 'None';

export type WebPartNameType = 'MteWpProcesoCompras' | 'InfoSocietaria' | 'None';


export interface IMainState {
    Message: ICustomMessage,
    Spinner: ICustomSpinner,
    IdToRender: string,
    WebPartStageType: WebPartStageType,
    WebPartName: string
}

const InitialState: IMainState = {
    Message: null,
    Spinner: null,
    IdToRender: null,
    WebPartStageType: 'InitialFetch',
    WebPartName: 'None'
}

const Types = MainActionsTypes;

const Reducer = (state: IMainState = InitialState, action: MainActions): IMainState => {

    switch (action.type) {

        case Types.Message:
            return { ...state, Message: action.data };

        case Types.Spinner:
            return { ...state, Spinner: action.data };

        case Types.IdToRender:
            return { ...state, IdToRender: action.data };

        case Types.WebPartStageType:
            return { ...state, WebPartStageType: action.data };

        case Types.WebPartName:
            return { ...state, WebPartName: action.data };

        default:
            return state;
    }

}

export { Reducer as MainReducer };
export { InitialState as MainInitialState };