import React from 'react';
import { observer } from 'mobx-react';

import styles from './EmptyText.scss';

interface Props {
    text: string;
}

export const EmptyText = observer(({ text }: Props) => {
    return <div className={styles.root}>{text}</div>;
});
