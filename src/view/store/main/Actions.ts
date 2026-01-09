import { ICustomMessage, ICustomSpinner } from "../../components/_common/utils/IStoreCommon";
import { WebPartNameType, WebPartStageType } from "./Reducer";
import { MainActions, MainActionsTypes } from "./Types";

const Actions = (action: React.Dispatch<MainActions>): IMainActions => {

    /**
    * Actualiza el mensaje principal de la aplicación
    * @param data Mensaje
    */
    const setMessage = (data?: ICustomMessage): void => action({ type: MainActionsTypes.Message, data: data ? data : { Message: '', Type: null } });

    /**
     * Cargando
     * @param data Spinner
     */
    const setSpinner = (data?: ICustomSpinner): void => action({ type: MainActionsTypes.Spinner, data: data ? data : { Spinning: false, Position: 'block', Label: undefined } });

    /**
     * Render
     * @param data Render
     */
    const setIdToRender = (data?: string): void => action({ type: MainActionsTypes.IdToRender, data: data ? data : '' });

    /**
     * WebPartStage
     * @param data WebPartStageType
     */
    const setWebPartStageType = (data?: WebPartStageType): void => action({ type: MainActionsTypes.WebPartStageType, data : data ? data : 'None' });

    /**
     * WebPartName
     * @param data WebPartNameType
     */
     const setWebPartNameType = (data?: WebPartNameType): void => action({ type: MainActionsTypes.WebPartName, data : data ? data : 'None' });

    const actions: IMainActions = {
        setMessage,
        setSpinner,
        setIdToRender,
        setWebPartStageType,
        setWebPartNameType
    }

    return actions;
}

export interface IMainActions {
    setMessage: (data?: ICustomMessage ) => void,
    setSpinner: (data?: ICustomSpinner) => void,
    setIdToRender: (data?: string) => void,
    setWebPartStageType: (data?: WebPartStageType) => void,
    setWebPartNameType: (data?: WebPartNameType) => void
}

export { Actions as MainActions };