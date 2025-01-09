import React from 'react';
import { observer } from 'mobx-react';
import { FilterDropdownProps } from 'antd/es/table/interface';

import styles from './CalendarFilterDropDown.scss';

import { Nullable } from 'chaika-frontend-types/backend';

import { Button, ButtonModifiers, ButtonTheme } from '@components/Button';
import { useCalenderFilter } from '@components/Table/filters/CalendarFilterDropDown/hooks/useCalenderFilter';
import { DateRangePicker } from '@components/datePickers/DateRangePicker';
import { translate } from '@chaika/i18n/helper';

interface Props {
    dataTest?: string;
    filterProps: FilterDropdownProps;
    periodDuration: PeriodDuration;
}

interface PeriodDuration {
    from: Date;
    to?: Nullable<Date>;
}

export const CalendarFilterDropDown = observer(({ dataTest, periodDuration, filterProps }: Props) => {
    const { from, to } = periodDuration;
    const { isButtonDisabled, onReset, start, end, onApply, onDateChange } = useCalenderFilter({
        from,
        to,
        filterProps,
    });

    return (
        <div className={styles.root}>
            <div className={styles.search}>
                <DateRangePicker
                    start={start}
                    end={end}
                    onDateChange={onDateChange}
                />
            </div>
            <hr className={styles.line} />
            <div className={styles.buttons}>
                <Button
                    redesign
                    theme={ButtonTheme.Primary}
                    modifiers={[ButtonModifiers.Small]}
                    label={translate('apply')}
                    dataTest={`${dataTest}_apply`}
                    disabled={isButtonDisabled}
                    onClick={onApply}
                ></Button>
                <Button
                    redesign
                    theme={ButtonTheme.Secondary}
                    modifiers={[ButtonModifiers.Small]}
                    label={translate('clearFilter')}
                    dataTest={`${dataTest}_reset`}
                    disabled={isButtonDisabled}
                    onClick={onReset}
                ></Button>
            </div>
        </div>
    );
});
