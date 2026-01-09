import * as React from 'react'

import { IDispatcherOrchestator } from '../../store/_dispatcher/_Orquestador';
import { IApplicationState } from '../../store/ApplicationState';


const ElementComponent = (properties: IElementProperties) => {

    const { Store, Dispatcher } = properties;
    const { WebPartName } = Store.Main.State;
    const {  } = Dispatcher;


    return (
        <>
            <h1>SPFx React Hook Component</h1>            
            <p> Hi! This webpart is {WebPartName}</p>
        </>
    )
}

interface IElementProperties {
    Store: IApplicationState,
    Dispatcher: IDispatcherOrchestator
}

export { IElementProperties as IElementProperties }
export { ElementComponent as ElementComponent }