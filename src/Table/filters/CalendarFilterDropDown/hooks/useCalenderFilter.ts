import { useState } from 'react';
import compact from 'lodash/compact';
import { FilterDropdownProps } from 'antd/es/table/interface';

import type { Nullable, Optional } from 'chaika-common-types';

import { DateRangeChangeDateParams } from '@components/datePickers/DateRangePicker/DateRangePicker';

interface Props {
    from: Date;
    to?: Nullable<Date>;
    filterProps: FilterDropdownProps;
}

interface Data {
    start?: Nullable<Date>;
    end?: Nullable<Date>;
    isButtonDisabled: boolean;
    onDateChange(dates: DateRangeChangeDateParams): void;
    onApply(): void;
    onReset(): void;
}

export function useCalenderFilter({ filterProps, from, to }: Props): Data {
    const [start, setStart] = useState<Optional<Nullable<Date>>>(from);
    const [end, setEnd] = useState<Optional<Nullable<Date>>>(to);
    function onApply(): void {
        filterProps.confirm();
    }

    function onReset(): void {
        filterProps.setSelectedKeys([]);

        filterProps.confirm();
    }

    function onDateChange({ start, end }: DateRangeChangeDateParams): void {
        setStart(start);
        setEnd(end);
        filterProps.setSelectedKeys(compact([start?.toISOString(), end?.toISOString()]));
    }

    function getIsButtonDisabled(): boolean {
        return false;
    }

    return {
        onApply,
        onReset,
        onDateChange,
        start,
        end,
        isButtonDisabled: getIsButtonDisabled(),
    };
}
