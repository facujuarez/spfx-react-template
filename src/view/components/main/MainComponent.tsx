import * as React from "react";

import { MessageComponent } from "../_common/MessageComponent";
import { SpinnerComponent } from "../_common/SpinnerComponent";
import { ElementComponent } from "../element/ElementComponent";
import { DispatcherOrchestator } from "../../store/_dispatcher/_Orquestador";
import { ApplicationState, IStoreInitialValuesOverride } from "../../store/ApplicationState";

const MainComponent = (properties: IMainProperties): JSX.Element => {

    const _store = ApplicationState(properties.StoreInitialValues);
    const _dispatcher = DispatcherOrchestator(_store);

    React.useEffect(() => _dispatcher.Main.InitialLoad(), [])

    const { Main } = _store;
    const { Message, Spinner, IdToRender, WebPartStageType } = Main.State;  

    const Render = (): JSX.Element => React.useMemo(() => (
        <>
            <MessageComponent message={Message} />
            <SpinnerComponent spinner={Spinner} />
            {(WebPartStageType === 'ShowWP') && ElementComponent({ Store: _store, Dispatcher: _dispatcher })}
        </>), [IdToRender]);

    return Render();
}

interface IMainProperties {
    StoreInitialValues: IStoreInitialValuesOverride,
}

export { IMainProperties as IMainProperties }
export { MainComponent as MainComponent }