import { MessageBarType } from "@fluentui/react"

export interface ICustomMessage {
  Message: string,
  Type: MessageBarType | null
}

export interface ICustomSpinner {
  Spinning: boolean,
  Position: 'block' | 'absolute',
  Label?: string
}
