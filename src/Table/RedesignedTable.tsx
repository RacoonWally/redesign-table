import React, { useCallback, useId, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Table, TableProps } from 'antd';
import { VList } from 'virtuallist-antd';
import classNames from 'classnames';

import styles from './RedesignedTable_.scss';

import type { TableRowSelection } from 'antd/es/table/interface';
import type { ColumnsType } from './types';

import { isDefined } from '@utils/isDefined';
import { MeatballButtonMenuItem } from '@components/ActionButtons/MeatballButton';

import { useFilters } from './hooks/useFilters';
import { useCheckboxes } from './Checkbox/hooks/useCheckboxes';
import { useMakeColumns } from './hooks/useMakeColumns';
import { useChangeTable } from './hooks/useChangeTable';
import { ItemsCount } from './ItemsCount';
import { PresetFilters } from './filters/PresetFilters';
import { PresetFiltersParams } from '@components/Table/filters/PresetFilters/PresetFilters';
import { TableActionParams } from './SelectedRowsActionButton/SelectedRowsActionButton';
import { SelectedRowsActionButton } from './SelectedRowsActionButton';
import { EmptyText } from './EmptyText';
import { ResetFilters } from './filters/ResetFilters';
import { SearchParams } from './SearchBar/SearchBar';
import { ButtonParams } from './ControlButton/ControlButton';

import { TableControls } from './TableControls';
import { Title } from './Title';
import { TitleModifiers } from './Title/Title';
import { SelectedRowsMainActionButtons } from './SelectedRowsMainActionButtons';
import { TableMainActionParams } from './SelectedRowsMainActionButtons/SelectedRowsMainActionButtons';
import { SortingOrder } from 'chaika-enums';
import { translate } from '@chaika/i18n/helper';
import { useStore } from '@store/useStore';
import { ViewPortState } from '@store/ViewPort';

export interface RedesignedTableProps extends Omit<TableProps<any>, 'columns'> {
    withoutBorderRadius?: boolean;
    tableTitle?: string;
    count?: number;
    withCheckboxes?: boolean;
    selectedFilters?: Record<any, any>;
    presetFiltersParams?: PresetFiltersParams;
    mainButtonParams?: ButtonParams;
    additionalButtonsParams?: ButtonParams[];
    height?: number;
    minHeight?: number;
    emptyText?: string;
    rowSelection?: RowSelectionParams;
    rowKey: string | ((record: any) => string);
    actions?: MeatballButtonMenuItem[];
    selectedRowsActions?: TableActionParams[];
    rowMainActionParams?: TableMainActionParams[];
    searchParams?: SearchParams;
    columns: ColumnsType<any>;
    titleModifiers?: TitleModifiers[];
    onFiltersChange?(params: Record<any, any>): Promise<void> | void;
    onLoadMore?(): Promise<void>;
    onRow?(record: Record<any, any>): RowHandlers;
    onSortingOrderChange?(order: SortingOrder): Promise<void>;
}

export interface RowHandlers {
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
    onDoubleClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

export interface RowSelectionParams extends TableRowSelection<any> {
    setSelectedRowsKeys(selectedRows: any[]): void;
}

export enum TableAction {
    Filter = 'filter',
    Sort = 'sort',
    Paginate = 'paginate',
}

export enum TableModifiers {
    SmallTitle = 'redesigned_table_smallTitle',
}

// Most complete example how can use the table
// @modules/services/ui/ServicesPageNew/pages/Prices/PricesPage.tsx
export const RedesignedTable = observer(
    ({
        withoutBorderRadius = false,
        tableTitle,
        columns: tableColumns,
        dataSource = [],
        onLoadMore,
        withCheckboxes,
        count = dataSource.length,
        height,
        minHeight,
        presetFiltersParams,
        onFiltersChange,
        searchParams,
        selectedRowsActions,
        mainButtonParams,
        selectedFilters,
        actions,
        rowKey,
        emptyText,
        rowSelection: rowSelectionParent,
        onRow,
        titleModifiers = [],
        additionalButtonsParams,
        rowMainActionParams,
        onSortingOrderChange,
        onChange,
        rowClassName,
        ...props
    }: RedesignedTableProps) => {
        const { viewPort } = useStore([ViewPortState.Name]);
        const [loading, setLoading] = useState(false);
        const tableRef: React.RefObject<HTMLDivElement> = useRef(null);
        const vid = useId();
        const { columns } = useMakeColumns({ tableColumns });

        const calculatedHeight = useMemo<number>(() => {
            const clientRect = tableRef?.current?.getBoundingClientRect();

            return isDefined(clientRect)
                ? document.body.scrollHeight - clientRect.top - 100
                : viewPort.pageHeight * 0.7;
        }, [tableRef?.current]);

        const tableHeight = height ?? calculatedHeight;
        const tableMinHeight = minHeight ?? calculatedHeight;

        const { rowSelection } = useCheckboxes({ dataSource, rowSelectionParent });
        const { tableIndex, hasPresetFilters, hasFilters, selectedPreset, onResetFilters, onPresetFilterClick } =
            useFilters({
                selectedFilters,
                presetFiltersParams,
                onFiltersChange,
            });
        const { onTableChange } = useChangeTable({ onChange, onFiltersChange, onSortingOrderChange });

        const handleReachEnd = useCallback(async (): Promise<void> => {
            if (dataSource && !loading && onLoadMore) {
                setLoading(true);
                await onLoadMore();
                setLoading(false);
            }
        }, []);

        const vc = useMemo(() => {
            return VList({
                vid,
                height: tableHeight,
                onReachEnd: handleReachEnd,
                debounceListRenderMS: 100,
            });
        }, [handleReachEnd]);

        const isShowingTableControls =
            isDefined(searchParams) ||
            isDefined(additionalButtonsParams) ||
            isDefined(mainButtonParams) ||
            isDefined(actions);

        return (
            <div
                className={classNames([
                    styles.redesigned_table_root_container,
                    withoutBorderRadius && styles.redesigned_table_root_container__withoutBorderRaduis,
                    isDefined(tableMinHeight) && styles.redesigned_table_root_container__withMinHeight,
                ])}
                style={{ '--redesign-table--min-height': `${tableMinHeight}px` }}
            >
                {isDefined(tableTitle) && (
                    <div className={styles.redesigned_table_header}>
                        <Title
                            title={tableTitle}
                            modifiers={titleModifiers}
                        />
                    </div>
                )}
                {isShowingTableControls && (
                    <TableControls
                        searchParams={searchParams}
                        additionalButtonsParams={additionalButtonsParams}
                        mainButtonParams={mainButtonParams}
                        actions={actions}
                    />
                )}
                <div className={styles.redesigned_table_tablePanel}>
                    <div className={styles.redesigned_table_leftSide}>
                        {hasPresetFilters && presetFiltersParams && (
                            <PresetFilters
                                selectedFilters={selectedFilters}
                                selectedPreset={selectedPreset}
                                presetFiltersParams={{
                                    ...presetFiltersParams,
                                    onPresetFilter: onPresetFilterClick,
                                }}
                            />
                        )}
                        <div className={styles.redesigned_table_filtersInfo}>
                            <ItemsCount
                                count={count}
                                hasFilters={hasFilters}
                            />
                            {hasFilters && <ResetFilters onClick={onResetFilters} />}
                        </div>
                    </div>
                    <div className={styles.redesigned_table_rightSide}>
                        <ItemsCount selectedCount={rowSelection.selectedRowKeys?.length} />
                        {!!selectedRowsActions?.length && (
                            <SelectedRowsActionButton
                                actions={selectedRowsActions}
                                selectedRowKeys={rowSelection.selectedRowKeys}
                            />
                        )}
                    </div>
                </div>

                <div className={styles.redesigned_table_component_root}>
                    <Table
                        key={tableIndex}
                        onRow={onRow}
                        locale={{
                            emptyText: <EmptyText text={emptyText ?? translate('nothingFoundTryChangeRequest')} />,
                        }}
                        rowClassName={!!rowClassName ? rowClassName : !!onRow ? styles.redesigned_table_row : undefined}
                        ref={tableRef}
                        showHeader
                        rowKey={rowKey}
                        components={vc}
                        loading={loading}
                        scroll={{ y: tableHeight }}
                        pagination={false}
                        columns={columns}
                        dataSource={dataSource}
                        rowSelection={withCheckboxes ? rowSelection : undefined}
                        onChange={onTableChange}
                        {...props}
                    />
                </div>
                {rowMainActionParams && (
                    <div className={styles.redesigned_table_footer}>
                        <SelectedRowsMainActionButtons
                            actions={rowMainActionParams}
                            selectedRowKeys={rowSelection.selectedRowKeys}
                        />
                    </div>
                )}
            </div>
        );
    },
);
