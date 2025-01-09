import { useEffect, useState } from 'react';
import { TableField } from '@components/Table/CreationMenu/CreationMenuField/CreationMenuField';
import { Nullable } from 'chaika-common-types';

interface Props {
    fields: TableField<Nullable<string>>[];
    onSaveClick?(params: any): void;
    onCancelClick?(): void;
}

interface Data {
    menuData: Object;
    isAllValid: boolean;
    setValidStatus(value: boolean): void;
    setMenuDataValues(params: object): Promise<void>;
    onButtonSaveClick(): void;
    onCancelButtonClick(): void;
}

export function useCreationMenu({ fields, onSaveClick, onCancelClick }: Props): Data {
    const [menuData, setMenuData] = useState<object>({});
    const [isAllValid, setIsAllValid] = useState<boolean>(true);

    useEffect(() => {
        const objFields = {};
        fields.forEach(item => {
            if (!item.isNotUpdated) {
                objFields[item.fieldName] = item.value;
            }
            item.multiFields?.forEach(multiField => {
                if (!multiField.isNotUpdated) {
                    objFields[multiField.fieldName] = multiField.value;
                }
            });
        });

        setMenuData(objFields);
    }, []);

    useEffect(() => {
        const valid = fields.every(field =>
            field.validationParams?.validationFunction
                ? field.validationParams.validationFunction!(menuData[field.fieldName])
                : true,
        );
        setIsAllValid(valid);
    }, [menuData]);

    async function setMenuDataValues(params: object): Promise<void> {
        setMenuData(oldMenuData => ({
            ...oldMenuData,
            ...params,
        }));

        const field = fields.find(field => Object.keys(params).find(key => key === field.fieldName));
        if (field?.onChangeValue) {
            const newData = { ...menuData, ...params };
            await field.onChangeValue(newData);
        }
    }

    function onButtonSaveClick(): void {
        onSaveClick?.(menuData);
    }

    function onCancelButtonClick(): void {
        onCancelClick?.();
    }

    function setValidStatus(value: boolean): void {
        setIsAllValid(value);
    }

    return {
        menuData,
        isAllValid,
        setValidStatus,
        setMenuDataValues,
        onButtonSaveClick,
        onCancelButtonClick,
    };
}
