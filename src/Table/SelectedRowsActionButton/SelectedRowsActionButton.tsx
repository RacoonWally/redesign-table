import React, { Key, useState } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import styles from './SelectedRowsActionButton.scss';

import { ClickOutsideMask } from '@components/ClickOutsideMask';
import { Icon, IconType } from '@components/Icon';
import { SelectButtonItem } from '@components/SelectButtonItem';
import { translate } from '@chaika/i18n/helper';

interface Props {
    actions: TableActionParams[];
    selectedRowKeys?: Key[];
}

export interface TableActionParams {
    label: string;
    value?: string;
    disabled?: boolean;
    dataTest: string;
    onActionClick(selectedRowKeys: Key[]): void;
}

export const SelectedRowsActionButton = observer(({ actions, selectedRowKeys }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isDisabled = !selectedRowKeys || selectedRowKeys.length === 0;

    function onToggleOpen(event?: React.MouseEvent<HTMLDivElement>): void {
        event?.stopPropagation();

        if (!isDisabled) {
            setIsOpen(!isOpen);
        }
    }

    return (
        <div className={styles.root}>
            <div
                className={classNames([styles.button, isOpen && styles.open, isDisabled && styles.disabled])}
                onClick={event => onToggleOpen(event)}
            >
                <span>{translate('actions')}</span>
                <Icon type={IconType.MEATBALL} />
            </div>
            {isOpen && (
                <>
                    <ClickOutsideMask
                        zIndex={1}
                        transparentBackground
                        onClickOutside={onToggleOpen}
                    />
                    <div className={styles.menuWrapper}>
                        {actions.map((action, index) =>
                            'divider' in action ? (
                                <div
                                    key={`divider_${index}`}
                                    className={styles.divider}
                                />
                            ) : (
                                <SelectButtonItem
                                    redesign
                                    disable={action.disabled}
                                    dataTest={action.dataTest}
                                    key={action.label}
                                    value={action.value}
                                    label={action.label}
                                    toggleIsOpen={onToggleOpen}
                                    onItemClick={() => action.onActionClick(selectedRowKeys ?? [])}
                                />
                            ),
                        )}
                    </div>
                </>
            )}
        </div>
    );
});
