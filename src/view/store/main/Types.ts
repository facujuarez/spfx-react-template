import { ICustomMessage, ICustomSpinner } from "../../components/_common/utils/IStoreCommon";
import { WebPartNameType, WebPartStageType } from "./Reducer";

export enum MainActionsTypes {
    Message = '@@MainActionsTypes/Message',
    Spinner = '@@MainActionsTypes/Spinner',
    IdToRender = '@@MainActionsTypes/IdToRender',
    WebPartStageType = '@@MainActionsTypes/WebPartStageType',
    WebPartName = '@@MainActionsTypes/WebPartName'
}

export type MainActions =
    { type: MainActionsTypes.Message, data: ICustomMessage } |
    { type: MainActionsTypes.Spinner, data: ICustomSpinner } |
    { type: MainActionsTypes.IdToRender, data: string } |
    { type: MainActionsTypes.WebPartStageType, data: WebPartStageType } |
    { type: MainActionsTypes.WebPartName, data: WebPartNameType };