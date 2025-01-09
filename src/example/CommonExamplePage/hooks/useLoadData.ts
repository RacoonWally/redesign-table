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
//     }, []);
//
//     async function load(): Promise<void> {
//         await entriesListService.load({
//             entryList,
//             relationOptions,
//         });
//     }
//
//     async function updateFilters(params: EntryListQuery): Promise<void> {
//         const sortingOrder = params.sortingOrder ?? SortingOrder.Desc;
//         await entriesListService.load({ entryList, queryParams: { ...params, sortingOrder }, relationOptions });
//     }
//
//     async function loadMore(): Promise<void> {
//         await entriesListService.loadMore({ entryList, relationOptions });
//     }
//
//     async function onSortingOrderChange(order: SortingOrder): Promise<void> {
//         await entriesListService.changeSortingOrder({ entryList, relationOptions }, order);
//     }
//
//     async function changeStatus(id: string, status: EntryStatus): Promise<void> {
//         await entriesListService.updateEntryStatus(id, status, entryList);
//     }
//
//     async function deleteEntry(id: string): Promise<void> {
//         await entriesListService.removeEntry(id, entryList);
//     }
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
