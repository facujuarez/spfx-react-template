import { IApplicationState } from "../ApplicationState";
import { IDispatcherBase } from "./_Base";
import { ConvertToInteger, GetQueryStringParam, IsUndefinedOrNullOrEmpty } from "../../../utils/Utils";
import * as SPConstants from "../../../services/utils/SPConstants";

const Dispatcher = (dispatcherBase: IDispatcherBase) => (store: IApplicationState): IDispatcherActions => {

    const { ExecuteWithTryCatchAsync, Helper } = dispatcherBase;
    const { IsUndefinedOrNull, strings } = Helper;

    const { Main, Services } = store;

    const InitialLoad = (): void => ExecuteWithTryCatchAsync(async () => {

         Main.Actions.setWebPartStageType('ShowWP');

    })({ setLoading: 'Block', setMessage: true, setfinishRefresh: true })


    const actions: IDispatcherActions = {
        InitialLoad,
    }

    return actions;
}

interface IDispatcherActions {
    InitialLoad: () => void,
    
}

export { Dispatcher as MainDispatcher };
export { IDispatcherActions as IMainDispatcherActions };