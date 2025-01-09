import React from 'react';
import { observer } from 'mobx-react';

import styles from './TableControls.tsx.scss';

import { SearchBar } from '@components/Table/SearchBar';
import { SearchParams } from '@components/Table/SearchBar/SearchBar';
import { ControlButton } from '@components/Table/ControlButton';
import { ButtonParams } from '@components/Table/ControlButton/ControlButton';
import {
    MeatballButton,
    MeatballButtonMenuItem,
    MeatballModifier,
    MeatballThemes,
} from '@components/ActionButtons/MeatballButton';

interface Props {
    searchParams?: SearchParams;
    mainButtonParams?: ButtonParams;
    additionalButtonsParams?: ButtonParams[];
    actions?: MeatballButtonMenuItem[];
}

export const TableControls = observer(({ searchParams, mainButtonParams, actions, additionalButtonsParams }: Props) => {
    return (
        <div className={styles.root}>
            {searchParams ? <SearchBar searchParams={searchParams} /> : <div />}
            {(mainButtonParams || actions) && (
                <div className={styles.rightControls}>
                    {mainButtonParams && <ControlButton buttonParams={mainButtonParams} />}
                    {additionalButtonsParams &&
                        additionalButtonsParams.map(params => (
                            <ControlButton
                                buttonParams={params}
                                key={params.label}
                            />
                        ))}
                    {actions && (
                        <div className={styles.actions}>
                            <MeatballButton
                                withIcon
                                theme={MeatballThemes.Primary}
                                modifiers={[MeatballModifier.InheritSize]}
                                items={actions}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});
