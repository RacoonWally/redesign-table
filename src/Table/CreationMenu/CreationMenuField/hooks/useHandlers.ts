// import React, { useState, useCallback } from 'react';
// import uniq from 'lodash/uniq';
// import { translate } from '@chaika/i18n/helper';
//
// interface Props {
//     field: TableField;
//     onChange(params: object): void;
// }
//
// interface Data {
//     value: any;
//     options: AntdOptionType[];
//     unValidText: string;
//     resetField(): void;
//     onChangeSwitcher(params: any): void;
// }
//
// export function useHandlers({ field, onChange }: Props): Data {
//     const [value, setValue] = useState(field.value);
//     const [options, setOptions] = useState<AntdOptionType[]>(field.options ?? []);
//     const [unValidText, setUnValidText] = useState<string>('');
//
//     const onSelectChange = useCallback((params: Nullable<OptionType<string>>): void => {
//         setValue(params?.value ?? null);
//         onChange({
//             [field.fieldName]: params?.value ?? null,
//         });
//     }, [field.fieldName, onChange]);
//
//     const onAsyncSelectChange = useCallback((params: Nullable<OptionType<string>>): void => {
//         setValue(params?.value ?? null);
//         if (params) {
//             const parsedToAntd = parseOptionTypeToAntdOptionType([params]);
//             if (!options.find(item => item.value === params.value)) {
//                 setOptions(prevState => uniq([...prevState, ...parsedToAntd]));
//             }
//         }
//         onChange({
//             [field.fieldName]: params?.value ?? null,
//         });
//     }, [field.fieldName, onChange, options]);
//
//     const onMultiSelectChange = useCallback((params: OptionType<string>[]): void => {
//         setValue(params?.map(item => item.value));
//         onChange({
//             [field.fieldName]: params?.map(item => item.value) ?? null,
//         });
//     }, [field.fieldName, onChange]);
//
//     const onInputMoneyChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
//         const value = parseMoneyStringToNumber(event.target.value);
//         setValue(event.target.value);
//         onChange({
//             [field.fieldName]: new Money(value),
//         });
//     }, [field.fieldName, onChange]);
//
//     const onInputChange = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
//         setValue(value);
//         onChange({
//             [field.fieldName]: value,
//         });
//     }, [field.fieldName, onChange]);
//
//     const onCheckboxToggle = useCallback((): void => {
//         setValue(!value);
//         onChange({
//             [field.fieldName]: !value,
//         });
//     }, [field.fieldName, onChange, value]);
//
//     const onInputDateChange = useCallback((date: Nullable<Date>): void => {
//         setValue(date?.toISOString());
//         onChange({
//             [field.fieldName]: date?.toISOString(),
//         });
//     }, [field.fieldName, onChange]);
//
//     const onComplexFieldChange = useCallback((params: any) => {
//         setValue(params);
//         onChange({ [field.fieldName]: params });
//     }, [field.fieldName, onChange]);
//
//     const resetField = useCallback(() => {
//         setValue(field.value);
//         onChange({ [field.fieldName]: field.value });
//     }, [field.fieldName, field.value, onChange]);
//
//     const parseMoneyStringToNumber = useCallback((moneyString: string): number => {
//         return (moneyString.includes('.') ? parseFloat(moneyString) : Number(moneyString)) * FACTOR;
//     }, []);
//
//     const setUnValidTextAfterChange = useCallback((text?: string): void => {
//         setUnValidText(text ?? translate('notValid'));
//     }, []);
//
//     const onChangeSwitcher = useCallback((params: any): void => {
//         setUnValidTextAfterChange(field.validationParams?.unValidText);
//         switch (field.type) {
//             case TableFieldType.Currency:
//             case TableFieldType.Select:
//                 onSelectChange(params);
//                 break;
//             case TableFieldType.AsyncSelect:
//                 onAsyncSelectChange(params);
//                 break;
//             case TableFieldType.Money:
//                 onInputMoneyChange(params);
//                 break;
//             case TableFieldType.Duration:
//             case TableFieldType.Input:
//                 onInputChange(params);
//                 break;
//             case TableFieldType.Checkbox:
//                 onCheckboxToggle();
//                 break;
//             case TableFieldType.SearchMultiSelect:
//                 onMultiSelectChange(params);
//                 break;
//             case TableFieldType.DateField:
//                 onInputDateChange(params);
//                 break;
//             case TableFieldType.BasePriceEditor:
//             case TableFieldType.EhrInsuranceInfo:
//             case TableFieldType.CompositePriceEditor:
//             case TableFieldType.OrganizationAssignment:
//             case TableFieldType.TranslationEditor:
//                 onComplexFieldChange(params);
//                 break;
//         }
//     }, [
//         field.validationParams,
//         field.type,
//         onSelectChange,
//         onAsyncSelectChange,
//         onInputMoneyChange,
//         onInputChange,
//         onCheckboxToggle,
//         onMultiSelectChange,
//         onInputDateChange,
//         onComplexFieldChange,
//         setUnValidTextAfterChange,
//     ]);
//
//     return {
//         value,
//         options,
//         unValidText,
//         resetField,
//         onChangeSwitcher,
//     };
// }