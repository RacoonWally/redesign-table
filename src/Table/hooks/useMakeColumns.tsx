import React, { useMemo } from 'react';

import { ColumnType as AntdColumn } from 'antd/es/table/interface';

import { isDefined } from '@utils/isDefined';
import { ColumnRenderType, ColumnType } from '@components/Table/types';
import { TruncatedText } from '@components/TruncatedText';
import { RowText } from '@components/Table/RowText';
import { FilterIcon } from '@components/Table/filters/FilterDropDown/FilterIcon';

interface Props {
    tableColumns: ColumnType<any>[];
}

interface Data {
    columns: Omit<AntdColumn<any>, 'renderType' | 'makeColumnValue' | 'filterIconData'>[];
}

export function useMakeColumns({ tableColumns }: Props): Data {
    function makaColumn({
        renderType,
        makeColumnValue,
        filterData,
        ...column
    }: ColumnType<any>): Omit<AntdColumn<any>, 'renderType'> {
        let render = column.render;
        if (!!renderType) {
            switch (renderType) {
                case ColumnRenderType.Truncated:
                    render = (value, record) => (
                        <TruncatedText
                            maxLine={2}
                            value={!!makeColumnValue ? makeColumnValue(value, record) : value}
                        />
                    );
                    break;
                case ColumnRenderType.RowText:
                    render = (value, record) => (
                        <RowText text={!!makeColumnValue ? makeColumnValue(value, record) : value} />
                    );
                    break;
                default:
                    const type: undefined = renderType;
                    console.error(`Forgot add render for ${type}`);
            }
        }

        return {
            ...column,
            render,
            filteredValue: filterData?.filteredValue,
            filterIcon:
                isDefined(filterData) && !filterData.withoutFilterCountIcon
                    ? (filtered: boolean) => (
                          <FilterIcon
                              filtered={filtered}
                              count={filterData.count}
                          />
                      )
                    : undefined,
        };
    }

    const columns: ColumnType<any>[] = useMemo(() => tableColumns.map(makaColumn), [tableColumns]);

    return {
        columns,
    };
}
