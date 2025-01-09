import React from 'react';
import { observer } from 'mobx-react';

import styles from './RowText.scss';
import classNames from 'classnames';

interface Props {
    text: string;
    isDanger?: boolean;
    prefix?: React.ReactNode;
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

export const RowText = observer(({ text = '', isDanger, onClick, prefix }: Props) => {
    return (
        <div
            className={classNames([styles.root, onClick && styles.clickable, isDanger && styles.root_danger])}
            onClick={onClick}
        >
            <div className={styles.prefix}>{prefix}</div>
            {text}
        </div>
    );
});
