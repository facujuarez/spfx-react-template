
import { Label } from "@fluentui/react";
import * as React from "react";

export const EmptyComponent = (properties: IEmptyProperties) => (<div><Label>{`${properties.TextLabel}`}</Label></div>)

export interface IEmptyProperties {
  TextLabel: string
}
