import type {
    ColumnType as AntdColumn,
    FilterValue as AntdFilterValue,
    SorterResult as AntdSorterResult,
    TableCurrentDataSource as AntdTableCurrentDataSource,
} from 'antd/es/table/interface';
import type { RenderedCell } from 'rc-table/lib/interface';
import { TableProps as AntdTableProps, TablePaginationConfig as AntdTablePaginationConfig } from 'antd';

import { ReactNode } from 'react';

import { Nullable } from 'chaika-common-types';

export enum ColumnRenderType {
    Truncated = 'truncated',
    RowText = 'rowText',
}

interface TableFilterData {
    filteredValue: Nullable<FilterValue>;
    withoutFilterCountIcon?: boolean;
    count?: number;
}

export interface ColumnType<D> extends Omit<AntdColumn<D>, 'filteredValue' | 'filterIcon' | 'render'> {
    renderType?: ColumnRenderType;
    filterData?: TableFilterData;
    makeColumnValue?(value: any, record: D): string;
    render?(value: any, record: D, index: number): RenderedCell<D> | ReactNode;
}

export type ColumnsType<D> = ColumnType<D>[];

export interface FilterValue extends AntdFilterValue {}
export interface SorterResult<D> extends AntdSorterResult<D> {}
export interface TableCurrentDataSource<D> extends AntdTableCurrentDataSource<D> {}
export interface TableProps<D> extends AntdTableProps<D> {}
export interface TablePaginationConfig extends AntdTablePaginationConfig {}
