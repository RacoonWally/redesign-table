import React from 'react';

import styles from './SortingIcon.scss';

import { Icon, IconType } from '@components/Icon';
import { SortOrder } from 'antd/es/table/interface';

interface Props {
    sortOrder: SortOrder;
}

export const SortingIcon = ({ sortOrder }: Props) => {
    return (
        <div className={styles.root}>
            {sortOrder === 'ascend' ? <Icon type={IconType.SORTING_NEW_AZ} /> : <Icon type={IconType.SORTING_NEW_ZA} />}
        </div>
    );
};
