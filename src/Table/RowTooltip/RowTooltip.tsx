import React from 'react';
import { observer } from 'mobx-react';

import styles from './RowTooltip.scss';

import { Tooltip, TooltipPlace } from '@components/Tooltip';
import { Icon, IconType } from '@components/Icon';

interface Props {
    text: string;
    iconType: IconType;
}

export const RowTooltip = observer(({ text, iconType }: Props) => {
    return (
        <Tooltip
            title={text}
            place={TooltipPlace.Left}
        >
            <div className={styles.iconWrapper}>
                <Icon type={iconType} />
            </div>
        </Tooltip>
    );
});
