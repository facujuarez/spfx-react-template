import { IApplicationState } from "../ApplicationState";
import { IMainDispatcherActions, MainDispatcher } from "./Main";
import { DispatcherBase } from "./_Base";

const Dispatcher = (store: IApplicationState): IDispatcherOrchestator => {

    const _dispatcherBase = DispatcherBase(store);

    const dispatchers: IDispatcherOrchestator = {
        Main: MainDispatcher(_dispatcherBase)(store),        
    }

    return dispatchers;
}

interface IDispatcherOrchestator {
    Main: IMainDispatcherActions,    
}

export { Dispatcher as DispatcherOrchestator };
export { IDispatcherOrchestator as IDispatcherOrchestator };