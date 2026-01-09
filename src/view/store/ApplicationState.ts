import * as React from "react";
import { IMainActions, MainActions } from "./main/Actions";
import { IMainState, MainInitialState, MainReducer } from "./main/Reducer";
import { IServicesActions, ServicesActions } from "./services/Actions";
import { IServicesState, ServicesInitialState, ServicesReducer } from "./services/Reducer";
import { ElementActions, IElementActions } from "./component/Actions";
import { ElementInitialState, ElementReducer, IElementState } from "./component/Reducer";

const ApplicationState = (initialValues?: IStoreInitialValuesOverride): IApplicationState => {

    const [mainState, mainDispatcher] = React.useReducer(MainReducer, initialValues && initialValues.Main || MainInitialState);
    const [componentState, componentDispatcher] = React.useReducer(ElementReducer, initialValues && initialValues.Element || ElementInitialState)
    const [servicesState, servicesDispatcher] = React.useReducer(ServicesReducer, initialValues && initialValues.Services || ServicesInitialState);

    const applicationState: IApplicationState = {
        Main: {
            State: mainState,
            Actions: MainActions(mainDispatcher)
        },
        Element: {
            State: componentState,
            Actions: ElementActions(componentDispatcher)
        },
        Services: {
            State: servicesState,
            Actions: ServicesActions(servicesDispatcher)
        }
    }

    return applicationState;
}

interface IApplicationState {
    Main: {
        State: IMainState,
        Actions: IMainActions
    },
    Element: {
        State: IElementState,
        Actions: IElementActions
    }
    Services: {
        State: IServicesState,
        Actions: IServicesActions
    }
}

interface IStoreInitialValuesOverride {
    Main?: IMainState,
    Element?: IElementState,
    Services?: IServicesState,
}

export { ApplicationState as ApplicationState };
export { IApplicationState as IApplicationState };
export { IStoreInitialValuesOverride as IStoreInitialValuesOverride };