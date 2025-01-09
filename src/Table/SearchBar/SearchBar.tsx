import React, { useState } from 'react';
import { observer } from 'mobx-react';

import styles from './SearchBar.scss';

import { SearchInput } from '@components/SearchInput';
import { Button, ButtonModifiers, ButtonTheme } from '@components/Button';
import { SearchInputTheme } from '@components/SearchInput/SearchInput';
import { translate } from '@chaika/i18n/helper';

interface Props {
    searchParams: SearchParams;
}

export interface SearchParams {
    dataTest: string;
    dataTestInput: string;
    placeHolder?: string;
    onSearchClick(value?: string): Promise<void> | void;
}

export const SearchBar = observer(
    ({ searchParams: { onSearchClick, dataTest, dataTestInput, placeHolder } }: Props) => {
        const [value, setValue] = useState<string>('');

        return (
            <div className={styles.root}>
                <SearchInput
                    redesign
                    withSmallLeftPadding
                    placeholder={placeHolder ?? translate('search')}
                    value={value}
                    theme={SearchInputTheme.White}
                    onChange={event => setValue(event.target.value)}
                    onCancelClick={() => {
                        setValue('');
                        onSearchClick();
                    }}
                    dataTest={dataTestInput}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            onSearchClick(value);
                        }
                    }}
                />
                <Button
                    redesign
                    modifiers={[ButtonModifiers.Big]}
                    theme={ButtonTheme.White}
                    dataTest={dataTest}
                    onClick={() => onSearchClick(value)}
                    label={translate('makeSearch')}
                />
            </div>
        );
    },
);
