import React from 'react';
import { observer } from 'mobx-react';

import styles from './FilterDropDown.scss';

import { AntdOptionType } from '@utils/makeOptionTypes';
import { FilterDropdownProps, FilterValue } from 'antd/es/table/interface';
import { Input, InputModifiers } from '@components/Input';
import { Checkbox, CheckBoxModifiers } from '@components/Checkbox';
import { Button, ButtonModifiers, ButtonTheme } from '@components/Button';
import { Icon, IconType } from '@components/Icon';
import { useDropDownFilters } from '@components/Table/filters/FilterDropDown/hooks/useDropDownFilters';
import { translate } from '@chaika/i18n/helper';

interface Props {
    dataTest?: string;
    filteredInfo: FilterValue | null;
    filterProps: FilterDropdownProps;
    options?: AntdOptionType[];
    loadByQuery?(query: string): Promise<AntdOptionType[]>;
}

export const FilterDropDown = observer(({ loadByQuery, filterProps, options, filteredInfo, dataTest }: Props) => {
    const {
        inputValue,
        foundValues,
        isButtonDisabled,
        onSelectItem,
        getIsItemChecked,
        onInputChange,
        onApply,
        onReset,
    } = useDropDownFilters({
        options,
        filterProps,
        loadByQuery,
        filteredInfo,
    });

    return (
        <div className={styles.root}>
            <div className={styles.title}>{translate('doFilter')}</div>
            <div className={styles.search}>
                <Input
                    redesign
                    placeholder={translate('search')}
                    value={inputValue}
                    modifiers={[InputModifiers.InheritHeight, InputModifiers.WithSmallPaddings]}
                    dataTest={`${dataTest}_search`}
                    onChange={event => onInputChange(event.target.value)}
                />
                {!!inputValue && (
                    <div
                        className={styles.clearIcon}
                        onClick={() => onInputChange('')}
                    >
                        <Icon type={IconType.REMOVE_REDESIGN} />
                    </div>
                )}
            </div>
            {foundValues.length > 0 && (
                <div className={styles.optionList}>
                    {foundValues.map(item => {
                        const isChecked = getIsItemChecked(item);

                        return (
                            <div
                                className={styles.optionItem}
                                key={item.value}
                                style={{
                                    order: isChecked ? 1 : 3,
                                }}
                            >
                                <Checkbox
                                    redesign
                                    modifiers={[CheckBoxModifiers.InheritWidth]}
                                    isChecked={isChecked}
                                    dataTest={`${dataTest}_checkbox`}
                                    label={item.text ?? ''}
                                    onChange={() => onSelectItem(item)}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
            <hr className={styles.line} />
            <div className={styles.buttons}>
                <Button
                    redesign
                    theme={ButtonTheme.Primary}
                    modifiers={[ButtonModifiers.Small]}
                    label={translate('apply')}
                    dataTest={`${dataTest}_apply`}
                    disabled={isButtonDisabled}
                    onClick={onApply}
                ></Button>
                <Button
                    redesign
                    theme={ButtonTheme.Secondary}
                    modifiers={[ButtonModifiers.Small]}
                    label={translate('clearFilter')}
                    dataTest={`${dataTest}_reset`}
                    disabled={isButtonDisabled}
                    onClick={onReset}
                ></Button>
            </div>
        </div>
    );
});
