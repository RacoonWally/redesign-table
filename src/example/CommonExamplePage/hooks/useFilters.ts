// interface Props {
//     onSortingOrderChange(order: SortingOrder): Promise<void>;
//     updateFilters(params?: QueryWithPreset): Promise<void>;
// }
//
// interface Data {
//     filteredInfo: Record<string, FilterValue | null>;
//     onFiltersChange(filters: Record<string, FilterValue | null>): Promise<void>;
//     onTableChange(
//         pagination: TablePaginationConfig,
//         filters: Record<string, FilterValue | null>,
//         sorter: SorterResult<PatientReservationTableData> | SorterResult<PatientReservationTableData>[],
//         extra: TableCurrentDataSource<PatientReservationTableData>,
//     ): void;
// }
//
// export function useFilters({ updateFilters, onSortingOrderChange }: Props): Data {
//     const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
//
// const onFiltersChange = useCallback(
//     async (filters: Record<string, FilterValue | null>): Promise<void> => {
//         const query = parseParamsToQuery(filters);
//         setFilteredInfo(removeNilAndEmptyKeys(filters));
//         await updateFilters(query);
//     },
//     [updateFilters]
// );
//
//     const onTableChange: TableProps<PatientReservationTableData>['onChange'] = (
//         pagination,
//         filters,
//         sorter,
//         extra,
//     ): void => {
//         if (extra.action === TableAction.Filter) {
//             setFilteredInfo(removeNilAndEmptyKeys(filters));
//             const filterParamsQuery = parseParamsToQuery(filters);
//             updateFilters(filterParamsQuery);
//         }
//         if (extra.action === TableAction.Sort) {
//             const order = createQueryOrderParams(sorter);
//             onSortingOrderChange(order);
//         }
//     };
//
//     function parseParamsToQuery({
//         status,
//         ehrId,
//         entryTypeTitle,
//         ...params
//     }: Record<string, FilterValue | null>): QueryWithPreset {
//         const withEdsStatus = !!status?.find(it => it === EntryStatusCustom.WithEds);
//         const statuses = withEdsStatus ? status?.filter(it => it !== EntryStatusCustom.WithEds) : status;
//
//         return removeNilAndEmptyKeys({
//             ...params,
//             ehrIds: ehrId?.join(),
//             typeIds: entryTypeTitle?.join(),
//             statuses: isArray(statuses) ? statuses?.join() : statuses,
//             hasSignatoryWithEDS: (!!status?.length && withEdsStatus) || undefined,
//         });
//     }
//
//     function createQueryOrderParams(sorter: any & { order: string }): SortingOrder {
//         return sorter.order === 'ascend' ? SortingOrder.Asc : SortingOrder.Desc;
//     }
//
//     return {
//         filteredInfo,
//         onTableChange,
//         onFiltersChange,
//     };
// }
