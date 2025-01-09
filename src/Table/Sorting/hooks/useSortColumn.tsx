import React from 'react';

import { SortingIcon } from '@components/Table/Sorting';
import { ColumnType } from 'antd/es/table/interface';

interface Data {
    defaultSortColumnParams: ColumnType<any>;
}

export function useSortColumn(): Data {
    function getDefaultSortColumnParams(): ColumnType<any> {
        return {
            sorter: true,
            showSorterTooltip: false,
            sortDirections: ['ascend', 'descend', 'ascend'],
            sortIcon: ({ sortOrder }) => <SortingIcon sortOrder={sortOrder} />,
        };
    }

    return {
        defaultSortColumnParams: getDefaultSortColumnParams(),
    };
}
