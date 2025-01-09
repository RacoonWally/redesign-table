import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import styles from './SummaryFooter.scss';

import { Currency } from 'chaika-enums';
import { Money } from '@store/models/Money';

interface Props {
    rows: any[];
    summaryField: string;
    summaryText: string;
    selectedRows: string[];
    className?: string;
    showSummary: boolean;
    type?: SummaryType;
    currency?: Currency;
}

export enum SummaryType {
    Number = 'number',
    Money = 'money',
}

export const SummaryFooter = observer(
    ({
        rows,
        summaryField,
        selectedRows,
        className,
        summaryText,
        showSummary,
        type = SummaryType.Money,
        currency = Currency.RUB,
    }: Props) => {
        const summaryRows = selectedRows.length > 0 ? rows.filter(row => selectedRows.includes(row.key)) : rows;

        const total = summaryRows.reduce((acc, row) => acc + Number(row[summaryField]), 0);

        const summary =
            type === SummaryType.Money ? new Money(total, currency).toString({ withoutKopecks: true }) : total;

        const text = `${summaryText}${showSummary ? `: ${summary}` : ''}`;

        return <div className={classNames(styles.root, className)}>{text}</div>;
    },
);
