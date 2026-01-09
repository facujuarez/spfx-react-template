import * as React from "react";
import { ICustomMessage } from "./utils/IStoreCommon";
import { IsUndefinedOrNull, IsUndefinedOrNullOrEmpty } from "../../../utils/Utils";
import { MessageBar } from "@fluentui/react";

export const MessageComponent = (properties: { message: ICustomMessage }): JSX.Element => {

  const _stylesWrapper: React.CSSProperties = { marginBottom: '15px' };

  const Render = (): JSX.Element => {

    const { message } = properties;

    if (IsUndefinedOrNull(message) || IsUndefinedOrNullOrEmpty(message.Message)) {
      return (<></>);
    }

    return (<div style={_stylesWrapper}>
      <MessageBar messageBarType={message.Type} isMultiline>{message.Message}</MessageBar>
    </div>);
  }

  return Render();
}
