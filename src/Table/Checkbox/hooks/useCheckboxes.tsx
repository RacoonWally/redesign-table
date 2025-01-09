import React, { useState } from 'react';
import { TableCheckbox } from '@components/Table/Checkbox';
import styles from '@components/Table/RedesignedTable_.scss';
import { TableRowSelection } from 'antd/es/table/interface';
import { RowSelectionParams } from '@components/Table/RedesignedTable';

interface Props {
    dataSource: readonly any[];
    rowSelectionParent?: RowSelectionParams;
}

interface Data {
    rowSelection: TableRowSelection<any>;
}

export function useCheckboxes({ dataSource, rowSelectionParent }: Props): Data {
    const [selectedRowKeys, setSelectedRowKeys] = useState<any>(rowSelectionParent?.selectedRowKeys ?? []);
    const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

    function getRowSelection(): TableRowSelection<any> {
        return {
            columnWidth: 50,
            selectedRowKeys,
            onChange: onSelectAll,
            onCell: () => ({ onClick: event => event.stopPropagation() }),
            columnTitle: (
                <TableCheckbox
                    isChecked={isAllChecked}
                    className={styles.redesigned_table_checkbox}
                    onChange={() => {
                        onSelectAll();
                    }}
                />
            ),
            renderCell: (value, record) => {
                return (
                    <TableCheckbox
                        disabled={record.disableRowSelect}
                        isChecked={value}
                        className={styles.redesigned_table_checkbox}
                        onChange={() => {
                            onChange(value, record);
                        }}
                    />
                );
            },
        };
    }

    function onSelectAll(): void {
        if (isAllChecked) {
            setSelectedRowKeys([]);
            rowSelectionParent?.setSelectedRowsKeys([]);
            setIsAllChecked(false);
        } else {
            const activeRows = dataSource.filter(item => !item.disableRowSelect);
            const keys = activeRows.map(item => item.key);
            setSelectedRowKeys(keys);
            rowSelectionParent?.setSelectedRowsKeys(keys);
            setIsAllChecked(true);
        }
    }

    function onChange(_: boolean, record: any): void {
        if (selectedRowKeys.includes(record.key)) {
            const filteredRows = selectedRowKeys.filter((key: string) => key !== record.key);
            setSelectedRowKeys(filteredRows);
            rowSelectionParent?.setSelectedRowsKeys(filteredRows);
            if (isAllChecked) {
                setIsAllChecked(false);
            }
        } else {
            setSelectedRowKeys([...selectedRowKeys, record.key]);
            rowSelectionParent?.setSelectedRowsKeys([...selectedRowKeys, record.key]);
            if (selectedRowKeys.length + 1 === dataSource.length) {
                setIsAllChecked(true);
            }
        }
    }

    return {
        rowSelection: getRowSelection(),
    };
}
