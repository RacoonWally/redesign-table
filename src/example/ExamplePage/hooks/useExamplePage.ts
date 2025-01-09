// interface Data {
//     count: number;
//     data: EntryListParams[];
//     filteredInfo: Record<string, FilterValue | null>;
//     presetFilters: PresetFiltersParams;
//     columns: ColumnsType<EntryListParams>;
//     loadMore(): Promise<void>;
//     onEntryClick(record: EntryListParams, event: React.MouseEvent): void;
//     onRow(record: EntryListParams): RowHandlers;
//     getIsArchiveStatus(record: EntryListParams): boolean;
//     onFiltersChange(filters: Record<string, FilterValue | null>): Promise<void>;
//     onTableChange(
//         pagination: TablePaginationConfig,
//         filters: Record<string, FilterValue | null>,
//         sorter: SorterResult<PatientReservationTableData> | SorterResult<PatientReservationTableData>[],
//         extra: TableCurrentDataSource<PatientReservationTableData>,
//     ): void;
// }
//
// export function useExamplePage(): Data {
//     const { ehr } = useStore([Ehr.Name]);
//     const navigate = useNavigate();
//
//     const { data, onSortingOrderChange, count, loadMore, updateFilters, changeStatus, deleteEntry } = useLoadData({
//         orderBy: EntryOrder.CreationTime,
//         ehrIds: ehr.id,
//         relationOptions: {
//             withFiles: true,
//             withDetails: true,
//             withMedicalCases: true,
//         },
//     });
//
//     const { onFiltersChange, onTableChange, filteredInfo } = useFilters({ updateFilters, onSortingOrderChange });
//     const { presetFilters } = usePresetFilters({ onFiltersChange });
//     const { getMenuItems } = useMenu({
//         changeStatus,
//         deleteEntry,
//     });
//
//     const { getColumns } = useColumns({ filteredInfo, getMenuItems, withoutEhrColumn: true });
//     const columns = getColumns();
//
//     function getIsArchiveStatus(record: EntryListParams): boolean {
//         return record.status === EntryStatus.Archive;
//     }
//
//     const onRow = useCallback((record: EntryListParams): RowHandlers => {
//         return {
//             onClick: (e: React.MouseEvent) => onEntryClick(record, e),
//         };
//     })
//
//     const onEntryClick = useCallback((record: EntryListParams, event: React.MouseEvent): void => {
//         const url = `/patient/${ehr.recordId}/entry/${record.serialNumber}`;
//
//         if (isCtrlOrMetaClick(event)) {
//             window.open(url, '_blank');
//         } else {
//             navigate(url);
//         }
//     })
//
//     return {
//         data,
//         count,
//         filteredInfo,
//         presetFilters,
//         columns,
//         onRow,
//         onEntryClick,
//         getIsArchiveStatus,
//         onFiltersChange,
//         onTableChange,
//         loadMore,
//     };
// }
