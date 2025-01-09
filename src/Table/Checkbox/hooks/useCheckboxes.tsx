// import React, { useState } from 'react';

// import styles from '@components/Table/RedesignedTable_.scss';

// import { TableCheckbox } from '@components/Table/Checkbox';
// import { TableRowSelection } from 'antd/es/table/interface';
// import { RowSelectionParams } from '@components/Table/RedesignedTable';
//
// interface Props {
//     dataSource: readonly any[];
//     rowSelectionParent?: RowSelectionParams;
// }
//
// interface Data {
//     rowSelection: TableRowSelection<any>;
// }
//
// export function useCheckboxes({ dataSource, rowSelectionParent }: Props): Data {
//     const [selectedRowKeys, setSelectedRowKeys] = useState<any>(rowSelectionParent?.selectedRowKeys ?? []);
//     const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
//
//     function getRowSelection(): TableRowSelection<any> {
//         return {
//             columnWidth: 50,
//             selectedRowKeys,
//             onChange: onSelectAll,
//             onCell: () => ({ onClick: event => event.stopPropagation() }),
//             columnTitle: (
//                 <TableCheckbox
//                     isChecked={isAllChecked}
//                     className={styles.redesigned_table_checkbox}
//                     onChange={onSelectAll}
//                 />
//             ),
//             renderCell: (value, record) => {
//                 return (
//                     <TableCheckbox
//                         disabled={record.disableRowSelect}
//                         isChecked={value}
//                         className={styles.redesigned_table_checkbox}
//                         onChange={() => {
//                             onChange(value, record);
//                         }}
//                     />
//                 );
//             },
//         };
//     }
//
//     const onSelectAll = useCallback((): void => {
//         if (isAllChecked) {
//             setSelectedRowKeys([]);
//             rowSelectionParent?.setSelectedRowsKeys([]);
//             setIsAllChecked(false);
//         } else {
//             const activeRows = dataSource.filter(item => !item.disableRowSelect);
//             const keys = activeRows.map(item => item.key);
//             setSelectedRowKeys(keys);
//             rowSelectionParent?.setSelectedRowsKeys(keys);
//             setIsAllChecked(true);
//         }
//     }, [isAllChecked, dataSource, rowSelectionParent]);
//
//     const onChange = useCallback(
//         (_: boolean, record: any): void => {
//             if (selectedRowKeys.includes(record.key)) {
//                 const filteredRows = selectedRowKeys.filter((key: string) => key !== record.key);
//                 setSelectedRowKeys(filteredRows);
//                 rowSelectionParent?.setSelectedRowsKeys(filteredRows);
//                 if (isAllChecked) {
//                     setIsAllChecked(false);
//                 }
//             } else {
//                 const newSelectedRowKeys = [...selectedRowKeys, record.key];
//                 setSelectedRowKeys(newSelectedRowKeys);
//                 rowSelectionParent?.setSelectedRowsKeys(newSelectedRowKeys);
//                 if (newSelectedRowKeys.length === dataSource.filter(item => !item.disableRowSelect).length) {
//                     setIsAllChecked(true);
//                 }
//             }
//         },
//         [selectedRowKeys, isAllChecked, dataSource, rowSelectionParent]
//     );
//
//     return {
//         rowSelection: getRowSelection(),
//     };
// }
