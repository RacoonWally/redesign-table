import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import styles from './CreationMenuField.scss';

import { AntdOptionType } from '@utils/makeOptionTypes';
import { useFieldCreator } from '@components/Table/CreationMenu/CreationMenuField/hooks/useFieldCreator';
import { FieldTitle, FieldTitleModificator, FieldTitleTheme } from '@components/FieldTitle';
import { DurationType } from '@common/CreationMenuFields/Duration/Duration';

interface Props {
    menuData: Object;
    field: TableField;
    fields: TableField[];
    isMultiField?: boolean;
    onChange(params: object): Promise<void>;
}

export interface TableField<OptionValue = any> {
    label: string;
    dataTest: string;
    value?: any;
    isClearable?: boolean;
    fieldName: string;
    valueType?: DurationType;
    type: TableFieldType;
    modifiers?: any[];
    depByFields?: DependencyByField;
    options?: AntdOptionType<OptionValue>[];
    loadOptions?: (inputValue: string, params?: any) => Promise<AntdOptionType[]>;
    multiFields?: TableField[];
    fieldModifiers?: FieldModifier[];
    multiFieldModifiers?: MultiFieldModifier[];
    fieldTitleTheme?: FieldTitleTheme;
    customStyle?: string;
    resetValueOnUpdateOption?: boolean;
    disabled?: boolean;
    isNotUpdated?: boolean;
    validationParams?: ValidationParams;
    getOptions?(): AntdOptionType[];
    onChangeValue?(value: any): Promise<void>;
}

export interface DependencyByField {
    actionType: ActionTypes[];
    dependencies: Dependency[];
}

interface Dependency {
    field: string;
    defaultFunctionResult?: DefaultFunctionResult;
    getOptions?(menuData: Object): AntdOptionType[];
    resetFunction?(): void;
    checkFunction?(dependencyFields: TableField[]): boolean;
}

export enum DefaultFunctionResult {
    Positive = 'positive',
    Negative = 'negative',
}

export enum ActionTypes {
    Disabled = 'disabled',
    Hidden = 'hidden',
    OptionsByField = 'optionsByField',
}

export enum FieldModifier {
    // @ts-ignore
    NoWrapContent = styles.noWrapContent,
}

export enum MultiFieldModifier {
    // @ts-ignore
    MultiFieldFullLine = styles.fullLineField,
}

export interface ValidationParams {
    unValidText?: string;
    validationFunction(value: any): boolean;
}

export enum TableFieldType {
    Select = 'select',
    AsyncSelect = 'asyncSelect',
    Money = 'money',
    Status = 'status',
    Currency = 'currency',
    Checkbox = 'checkbox',
    Text = 'text',
    SearchMultiSelect = 'searchMultiSelect',
    DateField = 'date',
    MultiField = 'multiField',
    FieldTitle = 'fieldTitle',
    Input = 'input',
    TranslationEditor = 'translationEditor',
    Duration = 'duration',
    BasePriceEditor = 'basePriceEditor',
    CompositePriceEditor = 'compositePriceEditor',
    EhrInsuranceInfo = 'ehrInsuranceInfo',
    OrganizationAssignment = 'organizationAssignment',
}

export const CreationMenuField = observer(({ field, onChange, isMultiField, fields, menuData }: Props) => {
    const { getField } = useFieldCreator({ field, fields, onChange, menuData });

    return (
        <div className={classNames([styles.root, isMultiField && styles.withoutMargin])}>
            {field.multiFields ? (
                <div>
                    {!!field.fieldName && (
                        <FieldTitle
                            redesign
                            theme={field.fieldTitleTheme ?? FieldTitleTheme.Redesign}
                            modificators={[FieldTitleModificator.WithPadding]}
                            title={field.label}
                        />
                    )}
                    <div className={classNames([styles.multiFields, ...(field?.multiFieldModifiers ?? [])])}>
                        {field.multiFields.map(item => (
                            <div
                                key={`${item.label}_${item.fieldName}`}
                                className={classNames([
                                    styles.field,
                                    ...(field?.fieldModifiers ?? []),
                                    field.customStyle,
                                ])}
                            >
                                <CreationMenuField
                                    menuData={menuData}
                                    fields={fields}
                                    isMultiField
                                    field={item}
                                    onChange={onChange}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={classNames([styles.field, ...(field?.fieldModifiers ?? []), field.customStyle])}>
                    {getField({ ...field, value: field.value ?? menuData[field.fieldName] })}
                </div>
            )}
        </div>
    );
});
