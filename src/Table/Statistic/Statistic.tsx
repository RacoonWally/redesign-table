import React from 'react';
import { observer } from 'mobx-react';

import styles from './Statistic.scss';

import { Tooltip, TooltipPlace, TooltipType } from '@components/Tooltip';
import classNames from 'classnames';

interface Props {
    params: Statics[];
}

export interface Statics {
    value: string | number;
    description?: string;
    color: StatisticTheme;
}

export enum StatisticTheme {
    // @ts-ignore
    LightGreen = styles.lightGreen,
    // @ts-ignore
    LightRed = styles.lightRed,
}

export const Statistic = observer(({ params }: Props) => {
    return (
        <div className={styles.root}>
            {params.map(it => {
                return it.description ? (
                    <Tooltip
                        title={it.description}
                        titleId={it.description}
                        place={TooltipPlace.Bottom}
                        type={TooltipType.Light}
                    >
                        <div className={classNames([styles.item, it.color])}>{it.value}</div>
                    </Tooltip>
                ) : (
                    <div className={classNames([styles.item, it.color])}>{it.value}</div>
                );
            })}
        </div>
    );
});
