import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import styles from './Title.scss';

interface Props {
    title: string;
    modifiers?: TitleModifiers[];
}

export enum TitleModifiers {
    // @ts-ignore
    SmallTitle = styles.smallTitle,
}

export const Title = observer(({ modifiers, title }: Props) => {
    return (
        <div
            className={classNames([
                styles.root,
                modifiers?.includes(TitleModifiers.SmallTitle) && TitleModifiers.SmallTitle,
            ])}
        >
            {title}
        </div>
    );
});
