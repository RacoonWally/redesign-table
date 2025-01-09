import { SortingOrder } from 'chaika-enums';

import { TableProps } from '../types';

import { TableAction } from '@components/Table/RedesignedTable';
import { removeNilAndEmptyKeys } from '@utils/removeNilAndEmptyKeys';

interface Props {
    onChange?: TableProps<object>['onChange'];
    onFiltersChange?(params: Record<any, any>): Promise<void> | void;
    onSortingOrderChange?(order: SortingOrder): Promise<void>;
}

interface Data {
    onTableChange: TableProps<object>['onChange'];
}

export function useChangeTable({ onChange, onFiltersChange, onSortingOrderChange }: Props): Data {
    const onTableChange: TableProps<object>['onChange'] = async (pagination, filters, sorter, extra): Promise<void> => {
        if (extra.action === TableAction.Filter) {
            await onFiltersChange?.(removeNilAndEmptyKeys(filters));
        }
        if (extra.action === TableAction.Sort) {
            const order = createQueryOrderParams(sorter);
            onSortingOrderChange?.(order);
        }
    };

    function createQueryOrderParams(sorter: any): SortingOrder {
        return sorter.order === 'ascend' ? SortingOrder.Asc : SortingOrder.Desc;
    }

    return {
        onTableChange: onChange ?? onTableChange,
    };
}
