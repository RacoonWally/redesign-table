// interface Props {
//     onFiltersChange(params: any): void;
// }
//
// interface Data {
//     presetFilters: PresetFiltersParams;
// }
//
// export function usePresetFilters({ onFiltersChange }: Props): Data {
//     const { authUser } = useStore([AuthUser.Name]);
//     const { getSelectedDoctors } = useAssistantDoctors();
//     const authorIds = [authUser.id];
//     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//     authUser.isAssistant && getSelectedDoctors().forEach(it => authorIds.push(it.id));
//
//     const defaultFilters = {
//         sortingOrder: SortingOrder.Desc,
//     };
//
//     function getPresetFilters(): PresetFiltersParams {
//         const dataTest = 'presetFilters';
//
//         const onlySignedPreset = getOnlySignedEntriesPreset();
//         const analysisEntriesPreset = getAnalysisEntriesPreset();
//         const atLastMonthEntriesPreset = getAtLastMonthPreset();
//         const myEntriesPreset = getMyEntriesPreset();
//
//         return {
//             dataTest,
//             presetByIndex: true,
//             presetFilters: [onlySignedPreset, analysisEntriesPreset, atLastMonthEntriesPreset, myEntriesPreset],
//             onPresetFilter: onFiltersChange,
//         };
//     }
//
//     function getOnlySignedEntriesPreset(): PresetFilter {
//         return {
//             label: translate('onlySigned'),
//             filters: {
//                 ...defaultFilters,
//                 status: [EntryStatusCustom.WithEds],
//             },
//         };
//     }
//
//     function getAnalysisEntriesPreset(): PresetFilter {
//         return {
//             label: translate('analyzes'),
//             filters: {
//                 ...defaultFilters,
//                 entryTypeType: [EntryTypeType.Tests],
//             },
//         };
//     }
//
//     function getAtLastMonthPreset(): PresetFilter {
//         const today = new Date();
//         const lastMonthDate = new Date();
//         lastMonthDate.setMonth(today.getMonth() - 1);
//
//         return {
//             label: translate('everythingForLastMonth'),
//             filters: {
//                 ...defaultFilters,
//                 creationTimeFrom: lastMonthDate,
//             },
//         };
//     }
//
//     function getMyEntriesPreset(): PresetFilter {
//         return {
//             label: translate('myEntries'),
//             filters: {
//                 ...defaultFilters,
//                 authorId: authorIds,
//             },
//         };
//     }
//
//     return {
//         presetFilters: getPresetFilters(),
//     };
// }
