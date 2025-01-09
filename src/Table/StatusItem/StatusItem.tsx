import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import styles from './StatusItem.scss';

interface Props {
    theme?: StatusItemTheme;
}

export enum StatusItemTheme {
    // @ts-ignore
    Green = styles.green,
    // @ts-ignore
    Azure = styles.azure,
    // @ts-ignore
    Red = styles.red,
    // @ts-ignore
    Transparent = styles.transparent,
    // @ts-ignore
    Yellow = styles.yellow,
    // @ts-ignore
    Grey = styles.grey,
}

export const StatusItem = observer(({ theme }: Props) => {
    return <div className={classNames([styles.root, theme])}></div>;
});
