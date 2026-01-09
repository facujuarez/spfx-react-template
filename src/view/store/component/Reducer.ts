
import { IEmpresa } from "../../../services/models/IEmpresa";
import { ElementAction, ElementActionsTypes } from "./Types";

export interface IElementState {
    Empresa: IEmpresa
}

const InitialState: IElementState = {
    Empresa: null,
}

const Types = ElementActionsTypes;

const Reducer = (state: IElementState = InitialState, action: ElementAction): IElementState => {

    switch (action.type) {

        case Types.Empresa:
            return { ...state, Empresa: action.data };

        default:
            return state;
    }

}

export { Reducer as ElementReducer };
export { InitialState as ElementInitialState };