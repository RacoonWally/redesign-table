import React from 'react';
import { observer } from 'mobx-react';

import { Button, ButtonModifiers, ButtonTheme } from '@components/Button';
import { translate } from '@chaika/i18n/helper';

interface Props {
    buttonParams: ButtonParams;
}

export interface ButtonParams {
    label?: string;
    dataTest?: string;
    theme?: ButtonTheme;
    onClick(): void;
}

export const ControlButton = observer(({ buttonParams }: Props) => {
    return (
        <Button
            redesign
            modifiers={[ButtonModifiers.Big]}
            theme={buttonParams.theme ?? ButtonTheme.Primary}
            dataTest={buttonParams.dataTest}
            onClick={buttonParams.onClick}
            label={buttonParams.label ?? translate('add')}
        />
    );
});
