// import { useCallback, useEffect } from 'react';
//
// interface LoaderProps extends EntryListQuery {
//     relationOptions?: RelationOptions;
// }
//
// interface Data {
//     count: number;
//     data: EntryListParams[];
//     loadMore(): Promise<void>;
//     updateFilters(params: EntryListQuery): Promise<void>;
//     onSortingOrderChange(order: SortingOrder): Promise<void>;
//     changeStatus(id: string, status: EntryStatus): Promise<void>;
//     deleteEntry(id: string): Promise<void>;
// }
//
// export function useLoadData({ relationOptions, ...params }: LoaderProps): Data {
//     const {
//         entryListStore: { entryList },
//         app,
//     } = useStore([EntryListStore.Name, AppState.Name]);
//
//     useEffect(() => {
//         (async () => {
//             app.setIsOnUpdate(true);
//             entryList.staticRestParams = { ...params };
//             await load();
//             app.setIsOnUpdate(false);
//         })();
//     }, [app, params, load]);
//
//     const load = useCallback(async (): Promise<void> => {
//         await entriesListService.load({
//             entryList,
//             relationOptions,
//         });
//     }, [entryList, relationOptions]);
//
//     const updateFilters = useCallback(async (params: EntryListQuery): Promise<void> => {
//         const sortingOrder = params.sortingOrder ?? SortingOrder.Desc;
//         await entriesListService.load({
//             entryList,
//             queryParams: { ...params, sortingOrder },
//             relationOptions,
//         });
//     }, [entryList, relationOptions]);
//
//     const loadMore = useCallback(async (): Promise<void> => {
//         await entriesListService.loadMore({ entryList, relationOptions });
//     }, [entryList, relationOptions]);
//
//     const onSortingOrderChange = useCallback(async (order: SortingOrder): Promise<void> => {
//         await entriesListService.changeSortingOrder({ entryList, relationOptions }, order);
//     }, [entryList, relationOptions]);
//
//     const changeStatus = useCallback(async (id: string, status: EntryStatus): Promise<void> => {
//         await entriesListService.updateEntryStatus(id, status, entryList);
//     }, [entryList]);
//
//     const deleteEntry = useCallback(async (id: string): Promise<void> => {
//         await entriesListService.removeEntry(id, entryList);
//     }, [entryList]);
//
//     return {
//         loadMore,
//         updateFilters,
//         onSortingOrderChange,
//         changeStatus,
//         deleteEntry,
//         count: entryList.count,
//         data: entryList.values,
//     };
// }