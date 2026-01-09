import * as React from 'react';
import styles from './Styles/SpinnerComponent.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { ICustomSpinner } from './utils/IStoreCommon';
import { IsUndefinedOrNull } from '../../../utils/Utils';

export const SpinnerComponent = (properties: { spinner: ICustomSpinner }): JSX.Element => {

  const Render = (): JSX.Element => {

    if (IsUndefinedOrNull(properties.spinner) || IsUndefinedOrNull(properties.spinner.Spinning) || IsUndefinedOrNull(properties.spinner.Position)) {
      return (<></>);
    }

    const { Spinning, Position, Label } = properties.spinner;

    if (!Spinning) {
      return (<></>);
    }

    switch (Position) {

      case 'block':
        return (<div className={styles.blockContainer}>
          <Spinner label={Label} size={SpinnerSize.large} />
        </div>);

      case 'absolute':
        return (<div className={styles.absoluteContainer}>
          <div className={styles.absoluteCenter}>
            <Spinner label={Label} size={SpinnerSize.large} />
          </div>
        </div>);

      default:
        return (<></>);
    }
  }

  return Render();
}
