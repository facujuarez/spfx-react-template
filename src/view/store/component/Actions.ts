import { IEmpresa } from "../../../services/models/IEmpresa";
import { ElementAction, ElementActionsTypes } from "./Types";

const Actions = (action: React.Dispatch<ElementAction>): IElementActions => {

     const setEmpresa = (data: IEmpresa): void => action({ type: ElementActionsTypes.Empresa, data });

    const actions: IElementActions = {
        setEmpresa
    }

    return actions;
}

export interface IElementActions {
    setEmpresa: (data: IEmpresa) => void,
}

export { Actions as ElementActions };