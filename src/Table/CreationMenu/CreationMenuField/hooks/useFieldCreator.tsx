// import React from 'react';
// import isEmpty from 'lodash/isEmpty';
// import flattenDeep from 'lodash/flattenDeep';
//
// import { DatePicker } from '@components/datePickers';
// import { AsyncSelect, MultiSelect, OptionType, Select } from '@components/Select';
// import { parseAntdOptionTypeToOptionType } from '@utils/makeOptionTypes';
// import { Input } from '@components/Input';
// import { Checkbox } from '@components/Checkbox';
// import {
//     ActionTypes,
//     DefaultFunctionResult,
//     TableField,
//     TableFieldType,
// } from '@components/Table/CreationMenu/CreationMenuField/CreationMenuField';
// import { useHandlers } from '@components/Table/CreationMenu/CreationMenuField/hooks/useHandlers';
// import { FieldTitle, FieldTitleTheme } from '@components/FieldTitle';
// import { SelectModifiers } from '@components/Select/Select';
// import {
//     BasePriceEditor,
//     CompositePriceEditor,
//     Duration,
//     HiddenField,
//     TranslationEditor,
// } from '@modules/common/CreationMenuFields';
// import { Status } from '@common/CreationMenuFields/Status/Status';
// import { Text } from '@components/Text';
// import { OrganizationAssignment } from '@common/CreationMenuFields/OrganizationAssignment';
// import { translate } from '@chaika/i18n/helper';
// import { TextModifiers } from '@components/Text/Text';
// import { EhrInsuranceInfo } from '@common/CreationMenuFields/EhrInsuranceInfo';
//
// interface Props {
//     menuData: Object;
//     field: TableField;
//     fields: TableField[];
//     onChange(params: object): Promise<void>;
// }
//
// interface Data {
//     getField(fieldParams: TableField): React.JSX.Element;
// }
//
// export function useFieldCreator({ field, fields, onChange, menuData }: Props): Data {
//     const { value, unValidText, options, resetField, onChangeSwitcher } = useHandlers({
//         onChange,
//         field,
//     });
//
//     const isValid = validateValue(value);
//
//     function getField(fieldParams: TableField): React.JSX.Element {
//         let fieldType;
//
//         const isHiddenType = !!fieldParams.depByFields?.actionType.includes(ActionTypes.Hidden);
//         const isDisabledType = !!fieldParams.depByFields?.actionType.includes(ActionTypes.Disabled);
//         const isOptionsByField = !!fieldParams.depByFields?.actionType.includes(ActionTypes.OptionsByField);
//
//         const disabled = fieldParams.disabled || (isDisabledType && checkDependencies(fieldParams));
//         const isHidden = isHiddenType && checkDependencies(fieldParams);
//
//         if (isHidden) {
//             fieldType = (
//                 <HiddenField
//                     dataTest={fieldParams.dataTest}
//                     resetField={resetField}
//                 />
//             );
//         } else {
//             switch (fieldParams.type) {
//                 case TableFieldType.AsyncSelect: {
//                     fieldType = (
//                         <AsyncSelect
//                             redesign
//                             hideSelectedOptions
//                             isValid={isValid}
//                             notValidText={unValidText}
//                             isClearable={fieldParams.isClearable}
//                             dataTest={fieldParams.dataTest}
//                             disabled={disabled}
//                             title={fieldParams.label}
//                             name={fieldParams.label}
//                             selectedValue={value}
//                             defaultOptions={parseAntdOptionTypeToOptionType(options ?? [])}
//                             onChange={onChangeSwitcher}
//                             loadOptions={async value =>
//                                 parseAntdOptionTypeToOptionType(await fieldParams.loadOptions!(value))
//                             }
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.FieldTitle: {
//                     fieldType = (
//                         <FieldTitle
//                             redesign
//                             theme={FieldTitleTheme.Redesign}
//                             title={fieldParams.label}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.Text: {
//                     fieldType = (
//                         <Text
//                             redesign
//                             modifiers={(fieldParams.modifiers ?? []) as TextModifiers[]}
//                             title={fieldParams.label}
//                             text={value}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.Select: {
//                     const modifiers = (fieldParams.modifiers ?? []) as SelectModifiers[];
//                     const options = getOptions(isOptionsByField, fieldParams);
//
//                     fieldType = (
//                         <Select
//                             redesign
//                             isClearable
//                             isValid={isValid}
//                             notValidText={unValidText}
//                             modifiers={modifiers}
//                             isSearchable
//                             resetValueOnUpdateOption={fieldParams.resetValueOnUpdateOption}
//                             dataTest={fieldParams.dataTest}
//                             disabled={disabled}
//                             title={fieldParams.label}
//                             name={fieldParams.label}
//                             selectedValue={value}
//                             options={options}
//                             onChange={onChangeSwitcher}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.Currency: {
//                     fieldType = (
//                         <Select
//                             isValid={isValid}
//                             redesign
//                             dataTest={fieldParams.dataTest}
//                             disabled={disabled}
//                             title={fieldParams.label}
//                             name={fieldParams.label}
//                             selectedValue={value}
//                             options={fieldParams.options ? parseAntdOptionTypeToOptionType(fieldParams.options) : []}
//                             onChange={onChangeSwitcher}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.SearchMultiSelect: {
//                     fieldType = (
//                         <MultiSelect
//                             isValid={isValid}
//                             redesign
//                             isSearchable
//                             dataTest={fieldParams.dataTest}
//                             disabled={disabled}
//                             title={fieldParams.label}
//                             name={fieldParams.label}
//                             selectedValues={value}
//                             options={fieldParams.options ? parseAntdOptionTypeToOptionType(fieldParams.options) : []}
//                             onChange={onChangeSwitcher}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.Money: {
//                     fieldType = (
//                         <Input
//                             isValid={isValid}
//                             redesign
//                             withoutCurrency
//                             title={fieldParams.label}
//                             type={'money'}
//                             value={value}
//                             disabled={disabled}
//                             dataTest={fieldParams.dataTest}
//                             onChange={onChangeSwitcher}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.Input: {
//                     fieldType = (
//                         <Input
//                             isValid={isValid}
//                             redesign
//                             title={fieldParams.label}
//                             type={'text'}
//                             value={value}
//                             disabled={disabled}
//                             dataTest={fieldParams.dataTest}
//                             onChange={onChangeSwitcher}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.Checkbox: {
//                     fieldType = (
//                         <Checkbox
//                             isValid={isValid}
//                             redesign
//                             label={fieldParams.label}
//                             isChecked={value ?? !!value}
//                             dataTest={fieldParams.dataTest}
//                             disabled={disabled}
//                             onChange={onChangeSwitcher}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.DateField: {
//                     fieldType = (
//                         <DatePicker
//                             isValid={isValid}
//                             redesign
//                             disabled={disabled}
//                             isClearable={fieldParams.isClearable}
//                             dataTest={fieldParams.dataTest}
//                             title={fieldParams.label}
//                             name={fieldParams.label}
//                             placeholder={translate('ddmmyyyy')}
//                             selected={!isEmpty(value) ? new Date(value) : null}
//                             onChange={onChangeSwitcher}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.Duration: {
//                     fieldType = (
//                         <Duration
//                             redesign
//                             title={fieldParams.label}
//                             name={fieldParams.label}
//                             valueType={fieldParams.valueType}
//                             dataTest={fieldParams.dataTest}
//                             value={value}
//                             disabled={disabled}
//                             type={'number'}
//                             onChange={onChangeSwitcher}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.TranslationEditor: {
//                     fieldType = (
//                         <TranslationEditor
//                             value={value}
//                             dataTest={fieldParams.dataTest}
//                             onChange={onChangeSwitcher}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.BasePriceEditor: {
//                     fieldType = (
//                         <BasePriceEditor
//                             disabled={disabled}
//                             value={value}
//                             dataTest={fieldParams.dataTest}
//                             onChange={onChangeSwitcher}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.CompositePriceEditor: {
//                     const data = { legalEntityIds: [], ...menuData };
//                     fieldType = (
//                         <CompositePriceEditor
//                             title={fieldParams.label}
//                             disabled={disabled}
//                             dataTest={fieldParams.dataTest}
//                             legalEntityIds={data.legalEntityIds}
//                             includedServices={value}
//                             onChange={onChangeSwitcher}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.Status: {
//                     fieldType = (
//                         <Status
//                             value={value}
//                             dataTest={fieldParams.dataTest}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.OrganizationAssignment: {
//                     fieldType = (
//                         <OrganizationAssignment
//                             title={fieldParams.label}
//                             value={value}
//                             dataTest={fieldParams.dataTest}
//                             onChange={onChangeSwitcher}
//                         />
//                     );
//                     break;
//                 }
//                 case TableFieldType.EhrInsuranceInfo: {
//                     fieldType = (
//                         <EhrInsuranceInfo
//                             value={value}
//                             dataTest={fieldParams.dataTest}
//                         />
//                     );
//                     break;
//                 }
//                 default:
//                     // @ts-ignore
//                     // eslint-disable-next-line
//                     const neverType: never = fieldParams.type;
//                     fieldType = <div>Illegal Field Type</div>;
//             }
//         }
//
//         return fieldType;
//     }
//
//     function validateValue(value: any): boolean {
//         let isValid = true;
//
//         if (field.validationParams?.validationFunction) {
//             isValid = field.validationParams.validationFunction(value);
//         }
//
//         return isValid;
//     }
//
//     function checkDependencies(fieldParams: TableField): boolean {
//         let isNotValid = false;
//
//         if (fieldParams.depByFields) {
//             const { dependencies } = fieldParams.depByFields;
//
//             const flattenFields = flattenDeep(fields);
//             const depFields = flattenFields.filter(item => dependencies.find(dep => dep.field === item.fieldName));
//
//             if (depFields.length > 0) {
//                 if (dependencies.some(dependency => !!dependency.checkFunction)) {
//                     dependencies.forEach(dependency => {
//                         if (!!dependency.checkFunction) {
//                             dependency.checkFunction(depFields);
//                         } else {
//                             isNotValid = defaultCheckFunction(depFields, dependency.defaultFunctionResult);
//                         }
//                     });
//                 } else {
//                     isNotValid = dependencies.some(dependency =>
//                         defaultCheckFunction(depFields, dependency.defaultFunctionResult),
//                     );
//                 }
//             }
//         }
//
//         return isNotValid;
//     }
//
//     function defaultCheckFunction(
//         dependencyFields: TableField[],
//         functionResult: DefaultFunctionResult = DefaultFunctionResult.Positive,
//     ): boolean {
//         const isPositiveResult = functionResult === DefaultFunctionResult.Positive;
//         return dependencyFields.some(field =>
//             isPositiveResult ? !menuData[field.fieldName] : !!menuData[field.fieldName],
//         );
//     }
//
//     function getOptions(isOptionsByField: boolean, fieldParams: TableField): OptionType[] {
//         const dependency = isOptionsByField
//             ? fieldParams.depByFields!.dependencies!.find(item => item.getOptions)!
//             : undefined;
//
//         const options =
//             isOptionsByField && dependency?.getOptions
//                 ? dependency.getOptions(menuData)
//                 : (fieldParams?.getOptions && fieldParams.getOptions()) ?? fieldParams.options ?? [];
//
//         return parseAntdOptionTypeToOptionType(options);
//     }
//
//     return {
//         getField,
//     };
// }
