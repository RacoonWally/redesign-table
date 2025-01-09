import React, { Key } from 'react';
import { observer } from 'mobx-react';

import styles from './SelectedRowsMainActionButtons.scss';

import { Button, ButtonParams, ButtonTheme } from '@components/Button';

interface Props {
    actions: TableMainActionParams[];
    selectedRowKeys?: Key[];
}

export interface TableMainActionParams extends ButtonParams {
    onActionClick(selectedRowKeys: Key[]): void;
}

export const SelectedRowsMainActionButtons = observer(({ actions, selectedRowKeys }: Props) => {
    const isDisabled = !selectedRowKeys || selectedRowKeys.length === 0;

    return (
        <div className={styles.root}>
            {actions.map(({ onActionClick, ...action }) => (
                <Button
                    redesign
                    key={action.label}
                    {...action}
                    onClick={() => onActionClick(selectedRowKeys ?? [])}
                    disabled={action.disabled ?? isDisabled}
                    theme={ButtonTheme.White ?? action.theme}
                />
            ))}
        </div>
    );
});
