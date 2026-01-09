import { IApplicationState } from "../ApplicationState";
import { IsUndefinedOrNull, NewGuidToStringD } from "../../../utils/Utils";
import { ActionsHelper, IHelper } from "../../components/_common/utils/ActionsHelper";
import { MessageBarType } from "@fluentui/react";

const DispatcherBase = (store: IApplicationState): IDispatcherBase => {

    const { Main } = store;
    const { setIdToRender, setMessage: setMessageAction, setSpinner } = Main.Actions;

    /**
    * ExecuteWithTryCatch
    * @param func Acción
    */
    const ExecuteWithTryCatch = (func: Function) => (aditionalValues: IExecuteWithTryCatchAditionalValues = { setLoading: 'None', setMessage: true, setfinishRefresh: false }) => {

        const { setMessage, setLoading, setfinishRefresh, aditionalFunc } = aditionalValues;

        try {

            if (setMessage) {
                setMessageAction(undefined);
            }

            if (!IsUndefinedOrNull(setLoading) && setLoading !== 'None') {
                setSpinner({ Spinning: true, Position: setLoading === 'Block' ? 'block' : 'absolute' });
            }

            if (!IsUndefinedOrNull(aditionalFunc)) {
                aditionalFunc ? aditionalFunc() : undefined;
            }

            if ((!IsUndefinedOrNull(setLoading) && setLoading !== 'None') || setMessage || !IsUndefinedOrNull(aditionalFunc)) {
                ForceRefresh();
            }

            func();

        } catch (error) {
            HandleError(error as Error);
        } finally {
            if (setfinishRefresh) {
                FinishLoadAndForceRefresh();
            }
        }
    }

    /**
     * ExecuteTryCatch con función async
     * @param funcAsync Async
     */
    const ExecuteWithTryCatchAsync = (funcAsync: Function) => async (aditionalValues: IExecuteWithTryCatchAditionalValues = { setLoading: 'None', setMessage: true, setfinishRefresh: false }) => {

        const { setMessage, setLoading, setfinishRefresh, aditionalFunc } = aditionalValues;

        try {

            if (setMessage) {
                setMessageAction(undefined);
            }

            if (setLoading) {
                setSpinner({ Spinning: true, Position: setLoading === 'Block' ? 'block' : 'absolute' });
            }

            if (!IsUndefinedOrNull(aditionalFunc)) {
                aditionalFunc ? aditionalFunc() : undefined;
            }

            if ((!IsUndefinedOrNull(setLoading) && setLoading !== 'None') || setMessage || !IsUndefinedOrNull(aditionalFunc)) {
                ForceRefresh();
            }

            await funcAsync();

        } catch (error) {
            HandleError(error as Error);
        } finally {
            if (setfinishRefresh) {
                FinishLoadAndForceRefresh();
            }
        }
    }

    /**
    * Error
    * @param error Error
    */
    const HandleError = (error?: Error) => {
        setSpinner(undefined);
        setMessageAction({ Message: error?.message || (<any>error), Type: MessageBarType.error });
        ForceRefresh();
    }

    /**
    * Establece a false lading
    * Fuerza renderizado
    */
    const FinishLoadAndForceRefresh = () => {
        setSpinner(undefined);
        ForceRefresh();
    }

    /**
     * Fuerza renderizado
     */
    const ForceRefresh = () => setIdToRender(NewGuidToStringD())

    const dispatcherResolve: IDispatcherBase = {
        ExecuteWithTryCatch,
        ExecuteWithTryCatchAsync,
        HandleError,
        FinishLoadAndForceRefresh,
        ForceRefresh,
        Helper: ActionsHelper()
    }

    return dispatcherResolve;
}

interface IDispatcherBase {
    ExecuteWithTryCatch: (func: Function) => (values?: IExecuteWithTryCatchAditionalValues) => void,
    ExecuteWithTryCatchAsync: (func: Function) => (values?: IExecuteWithTryCatchAditionalValues) => void,
    HandleError: (error: Error) => void,
    FinishLoadAndForceRefresh: () => void,
    ForceRefresh: () => void,
    Helper: IHelper
}

interface IExecuteWithTryCatchAditionalValues {
    setMessage?: boolean,
    setLoading?: LoadingType,
    setfinishRefresh?: boolean,
    aditionalFunc?: Function
}

export type LoadingType = 'Block' | 'Floating' | 'None';

export { DispatcherBase as DispatcherBase };
export { IDispatcherBase as IDispatcherBase };