import React from 'react';

import styles from './ResetFilters.scss';
import { translate } from '@chaika/i18n/helper';

interface Props {
    onClick(): void;
}

export const ResetFilters = ({ onClick }: Props) => {
    return (
        <div
            className={styles.root}
            onClick={onClick}
        >
            {translate('resetFilters')}
        </div>
    );
};
