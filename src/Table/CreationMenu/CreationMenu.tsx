import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import styles from './CreationMenu.scss';
import commonStyle from '@components/mixins/commonStyles.scss';

import { useCreationMenu } from '@components/Table/CreationMenu/hooks/useCreationMenu';
import { Button, ButtonModifiers, ButtonTheme } from '@components/Button';
import { CreationMenuField } from './CreationMenuField';
import { TableField } from './CreationMenuField/CreationMenuField';
import { translate } from '@chaika/i18n/helper';
import { Nullable } from 'chaika-common-types';

export interface CreationMenuProps {
    title: string;
    subtitle?: string;
    fields: TableField<Nullable<string>>[];
    buttonsParams: CreationMenuButtonsParams;
}

export interface CreationMenuButtonsParams {
    saveButtonOptions?: CreationButtonOptions;
    cancelButtonOptions?: CreationButtonOptions;
    customButtonsOptions?: CustomButtons;
}

export interface CreationButtonOptions {
    dataTest: string;
    title?: string;
    modifiers?: ButtonModifiers[];
    theme?: ButtonTheme;
    onClick(params?: any): void | Promise<void>;
}

export interface CustomButtons {
    saveButton?: React.ReactNode;
    cancelButton?: React.ReactNode;
    otherButtons?: React.ReactNode[];
}

export enum Mode {
    Creation = 'creation',
    Edit = 'edit',
    View = 'view',
}

export const CreationMenu = observer(
    ({
        title,
        subtitle,
        fields,
        buttonsParams: { saveButtonOptions, cancelButtonOptions, customButtonsOptions },
    }: CreationMenuProps) => {
        const { isAllValid, onButtonSaveClick, onCancelButtonClick, setMenuDataValues, menuData } = useCreationMenu({
            fields,
            onSaveClick: saveButtonOptions?.onClick,
            onCancelClick: cancelButtonOptions?.onClick,
        });

        return (
            <div className={styles.root}>
                <div className={styles.titleBlock}>
                    <div className={commonStyle.font_h1}>{title}</div>
                    {subtitle && <div className={classNames([commonStyle.font_body, styles.subtitle])}>{subtitle}</div>}
                </div>
                <div className={styles.fields}>
                    {fields.map(field => (
                        <CreationMenuField
                            key={`${field.label}_${field.fieldName}`}
                            field={field}
                            fields={fields}
                            menuData={menuData}
                            onChange={setMenuDataValues}
                        />
                    ))}
                </div>
                <div className={styles.buttons}>
                    {(saveButtonOptions || customButtonsOptions?.saveButton) &&
                        (customButtonsOptions?.saveButton
                            ? customButtonsOptions.saveButton
                            : saveButtonOptions && (
                                  <Button
                                      disabled={!isAllValid}
                                      redesign
                                      dataTest={saveButtonOptions.dataTest}
                                      onClick={onButtonSaveClick}
                                      modifiers={saveButtonOptions?.modifiers}
                                      theme={saveButtonOptions?.theme ?? ButtonTheme.Primary}
                                  >
                                      {saveButtonOptions.title ?? translate('save')}
                                  </Button>
                              ))}
                    {(cancelButtonOptions || customButtonsOptions?.cancelButton) &&
                        (customButtonsOptions?.cancelButton
                            ? customButtonsOptions.cancelButton
                            : cancelButtonOptions && (
                                  <Button
                                      redesign
                                      dataTest={cancelButtonOptions.dataTest}
                                      onClick={onCancelButtonClick}
                                      modifiers={cancelButtonOptions.modifiers}
                                      theme={cancelButtonOptions.theme ?? ButtonTheme.Secondary}
                                  >
                                      {cancelButtonOptions.title ?? translate('cancel')}
                                  </Button>
                              ))}
                </div>
            </div>
        );
    },
);
