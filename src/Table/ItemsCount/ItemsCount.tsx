import React from 'react';
import { observer } from 'mobx-react';
import isUndefined from 'lodash/isUndefined';

import styles from './ItemsCount.scss';

import { Declension } from '@utils/Declension';
import { translate } from '@chaika/i18n/helper';

interface Props {
    count?: number;
    selectedCount?: number;
    hasFilters?: boolean;
}

export const ItemsCount = observer(({ count, selectedCount, hasFilters }: Props) => {
    return (
        <div className={styles.root}>
            {!!selectedCount &&
                selectedCount > 0 &&
                `${translate('chosen')} ${selectedCount} ${Declension.entries(selectedCount).toLowerCase()}`}
            {!isUndefined(count) &&
                `${hasFilters ? translate('found') : translate('shown')}: ${count} ${Declension.entries(
                    count,
                ).toLowerCase()}`}
        </div>
    );
});
