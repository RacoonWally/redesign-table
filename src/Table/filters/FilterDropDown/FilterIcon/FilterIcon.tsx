import React from 'react';
import classNames from 'classnames';

import styles from './FilterIcon.scss';

import { Icon, IconType } from '@components/Icon';

interface Props {
    filtered: boolean;
    count?: number;
}

export const FilterIcon = ({ filtered, count }: Props) => {
    return (
        <div className={styles.root}>
            {filtered && count ? (
                <div className={classNames([styles.icon, styles.filteredIcons])}>
                    <div className={classNames([styles.icon, styles.filteredCount])}>{count}</div>
                    <div className={classNames([styles.icon, styles.hiddenIcon])}>
                        <Icon type={IconType.TABLE_FILTER} />
                        <div className={styles.iconCircle} />
                    </div>
                </div>
            ) : (
                <div className={styles.icon}>
                    <Icon type={IconType.TABLE_FILTER} />
                </div>
            )}
        </div>
    );
};
