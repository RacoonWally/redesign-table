import React from 'react';

import { Checkbox, CheckBoxModifiers } from '@components/Checkbox';

interface Props {
    disabled?: boolean;
    className?: string;
    isChecked: boolean;
    onChange(event: React.ChangeEvent<HTMLInputElement>, checked?: boolean): void;
}

export function TableCheckbox({ className, isChecked, onChange, disabled }: Props) {
    return (
        <div className={className}>
            <Checkbox
                redesign
                disabled={disabled}
                isChecked={isChecked}
                dataTest={''}
                modifiers={[CheckBoxModifiers.Small]}
                onChange={onChange}
            />
        </div>
    );
}
