import { IApplicationState } from "../ApplicationState";
import { IDispatcherBase } from "./_Base";

const Dispatcher = (dispatcherBase: IDispatcherBase) => (store: IApplicationState): IDispatcherActions => {

    const { ExecuteWithTryCatch, ExecuteWithTryCatchAsync, Helper } = dispatcherBase;
    const { IsUndefinedOrNull, IsUndefinedOrNullOrEmpty, strings } = Helper;
    const { Element, Services } = store;
    const { Empresa } = Element.State;
    //const { AZEmpresasService } = Services.State;

    
    const OnClick_GenerarFicha = () => ExecuteWithTryCatchAsync(async () => {

        const empresasId: number[] = [];

    })({ setLoading: 'Floating', setMessage: true, setfinishRefresh: true })

    const actions: IDispatcherActions = {
        OnClick_GenerarFicha,
    
    }

    return actions;
}

interface IDispatcherActions {
    OnClick_GenerarFicha: () => void,
   
}

export { Dispatcher as ElementDispatcher };
export { IDispatcherActions as IElementDispatcherActions };