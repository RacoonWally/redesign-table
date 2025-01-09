import React, { useState } from 'react';

import { Nullable } from 'chaika-common-types';

import { TableField, TableFieldType } from '@components/Table/CreationMenu/CreationMenuField/CreationMenuField';
import { OptionType } from '@components/Select';
import { FACTOR, Money } from '@store/models/Money';
import { AntdOptionType, parseOptionTypeToAntdOptionType } from '@utils/makeOptionTypes';
import uniq from 'lodash/uniq';
import { translate } from '@chaika/i18n/helper';

interface Props {
    field: TableField;
    onChange(params: object): void;
}

interface Data {
    value: any;
    options: AntdOptionType[];
    unValidText: string;
    resetField(): void;
    onChangeSwitcher(params: any): void;
}

export function useHandlers({ field, onChange }: Props): Data {
    const [value, setValue] = useState(field.value);
    // Thats need for async select, options cannot update from parent component store
    const [options, setOptions] = useState<AntdOptionType[]>(field.options ?? []);
    const [unValidText, setUnValidText] = useState<string>('');

    function onChangeSwitcher(params: any): void {
        setUnValidTextAfterChange(field.validationParams?.unValidText);
        switch (field.type) {
            case TableFieldType.Currency:
            case TableFieldType.Select: {
                onSelectChange(params);
                break;
            }
            case TableFieldType.AsyncSelect: {
                onAsyncSelectChange(params);
                break;
            }
            case TableFieldType.Money: {
                onInputMoneyChange(params);
                break;
            }
            case TableFieldType.Duration:
            case TableFieldType.Input: {
                onInputChange(params);
                break;
            }
            case TableFieldType.Checkbox: {
                onCheckboxToggle();
                break;
            }
            case TableFieldType.SearchMultiSelect: {
                onMultiSelectChange(params);
                break;
            }
            case TableFieldType.DateField: {
                onInputDateChange(params);
                break;
            }
            case TableFieldType.BasePriceEditor:
            case TableFieldType.EhrInsuranceInfo:
            case TableFieldType.CompositePriceEditor:
            case TableFieldType.OrganizationAssignment:
            case TableFieldType.TranslationEditor: {
                onComplexFieldChange(params);
                break;
            }
        }
    }

    function onSelectChange(params: Nullable<OptionType<string>>): void {
        setValue(params?.value ?? null);
        onChange({
            [field.fieldName]: params?.value ?? null,
        });
    }

    function onAsyncSelectChange(params: Nullable<OptionType<string>>): void {
        setValue(params?.value ?? null);
        if (params) {
            const parsedToAntd = parseOptionTypeToAntdOptionType([params]);
            if (!options.find(item => item.value === params.value)) {
                setOptions(prevState => uniq([...prevState, ...parsedToAntd]));
            }
        }

        onChange({
            [field.fieldName]: params?.value ?? null,
        });
    }

    function onMultiSelectChange(params: OptionType<string>[]): void {
        setValue(params?.map(item => item.value));

        onChange({
            [field.fieldName]: params?.map(item => item.value) ?? null,
        });
    }

    function onInputMoneyChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const value = parseMoneyStringToNumber(event.target.value);
        setValue(event.target.value);

        onChange({
            [field.fieldName]: new Money(value),
        });
    }

    function onInputChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void {
        setValue(value);

        onChange({
            [field.fieldName]: value,
        });
    }

    function onCheckboxToggle(): void {
        setValue(!value);

        onChange({
            [field.fieldName]: !value,
        });
    }

    function onInputDateChange(date: Nullable<Date>): void {
        setValue(date?.toISOString());

        onChange({
            [field.fieldName]: date?.toISOString(),
        });
    }

    function onComplexFieldChange(params: any) {
        setValue(params);

        onChange({ [field.fieldName]: params });
    }

    function resetField() {
        setValue(field.value);
        onChange({ [field.fieldName]: field.value });
    }

    function parseMoneyStringToNumber(moneyString: string): number {
        return (moneyString.includes('.') ? parseFloat(moneyString) : Number(moneyString)) * FACTOR;
    }

    function setUnValidTextAfterChange(text?: string): void {
        setUnValidText(text ?? translate('notValid'));
    }

    return {
        value,
        options,
        unValidText,
        resetField,
        onChangeSwitcher,
    };
}
