// import React from 'react';
// import compact from 'lodash/compact';
// import uniq from 'lodash/uniq';
//
// interface Props {
//     filteredInfo: Record<string, FilterValue | null>;
//     hideEntryTypeFilter?: boolean;
//     hideStatusFilter?: boolean;
//     withoutEhrColumn?: boolean;
//     getMenuItems?(item: EntryListParams): CellButtonMenuItem[];
// }
//
// interface Data {
//     getColumns(): ColumnsType<EntryListParams>;
// }
//
// export function useColumns({
//     filteredInfo,
//     getMenuItems,
//     hideEntryTypeFilter,
//     hideStatusFilter,
//     withoutEhrColumn,
// }: Props): Data {
//     const { dateSorting } = useSortingOrder();
//
//     function getColumns(): ColumnsType<EntryListParams> {
//         const { userOptions } = useUserOptionTypes();
//         const { patientOptions, loadPatientsOptions } = usePatientOptionTypes();
//         const { clinicOptions } = useOrganizationOptionTypes();
//         const { defaultSortColumnParams } = useSortColumn();
//         const { entryTypeOptions } = useEntryTypeOptions();
//         const antdEntryTypeTypeOptions = parseOptionTypeToAntdOptionType(entryTypeTypeOptions);
//         const statusOptions: AntdOptionType[] = [
//             {
//                 value: EntryStatusCustom.WithEds,
//                 text: getCustomEntryStatusTranslation(EntryStatusCustom.WithEds),
//             },
//             ...getEnumValues(EntryStatus).map(it => ({
//                 value: it,
//                 text: getEntryStatusTranslation(it as EntryStatus),
//             })),
//         ];
//
//         return compact([
//             {
//                 title: translate('dateAndTime'),
//                 dataIndex: 'creationTime',
//                 key: 'creationTime',
//                 filterData: {
//                     filteredValue: filteredInfo.creationTime,
//                     count: filteredInfo.creationTime?.length,
//                 },
//                 width: 140,
//                 render: (value: string, record) => DateHelper.toLocalStringDate(record.visitTime ?? value, true),
//                 ...defaultSortColumnParams,
//                 defaultSortOrder: 'descend',
//                 sorter: (a: EntryListParams, b: EntryListParams) => dateSorting(a, b, 'creationTime'),
//             },
//             !withoutEhrColumn && {
//                 title: translate('patient'),
//                 dataIndex: 'ehrId',
//                 key: 'ehrId',
//                 width: 150,
//                 filterData: {
//                     filteredValue: filteredInfo.ehrId,
//                     count: filteredInfo.ehrId?.length,
//                 },
//                 renderType: ColumnRenderType.RowText,
//                 makeColumnValue: (value: string) => {
//                     const { patientStore } = useStore([PatientStore.Name]);
//
//                     return patientStore.patientList.get(value)?.fullName ?? '';
//                 },
//                 filterDropdown: props => (
//                     <FilterDropDown
//                         filteredInfo={filteredInfo.patientId}
//                         filterProps={props}
//                         options={patientOptions}
//                         loadByQuery={loadPatientsOptions}
//                     />
//                 ),
//             },
//             {
//                 title: translate('entryTypeLabel'),
//                 dataIndex: 'entryTypeType',
//                 key: 'entryTypeType',
//                 width: 130,
//                 filterData: {
//                     filteredValue: filteredInfo.entryTypeType,
//                     count: filteredInfo.entryTypeType?.length,
//                 },
//                 renderType: ColumnRenderType.RowText,
//                 makeColumnValue: (value: string) => {
//                     return antdEntryTypeTypeOptions.find(it => it.value === value)?.text ?? '';
//                 },
//                 filterDropdown: hideEntryTypeFilter
//                     ? undefined
//                     : props => (
//                           <FilterDropDown
//                               filteredInfo={filteredInfo.entryTypeType}
//                               options={antdEntryTypeTypeOptions}
//                               filterProps={props}
//                           />
//                       ),
//             },
//             {
//                 title: translate('title'),
//                 dataIndex: 'entryTypeTitle',
//                 key: 'entryTypeTitle',
//                 width: 250,
//                 renderType: ColumnRenderType.RowText,
//                 makeColumnValue: (value, record) => entriesListService.getEntryTitle(record.id),
//                 filterData: {
//                     filteredValue: filteredInfo.typeId,
//                     count: filteredInfo.typeId?.length,
//                 },
//                 filterDropdown: props => (
//                     <FilterDropDown
//                         filteredInfo={filteredInfo.typeId}
//                         options={parseOptionTypeToAntdOptionType(entryTypeOptions)}
//                         filterProps={props}
//                     />
//                 ),
//             },
//             {
//                 title: translate('episodeOfCare'),
//                 dataIndex: 'medicalCaseIds',
//                 key: 'medicalCaseIds',
//                 width: 300,
//                 renderType: ColumnRenderType.RowText,
//                 makeColumnValue: (values?: string[]) => {
//                     const { medicalCaseStore } = useStore([MedicalCaseStore.Name]);
//
//                     return values?.map(it => medicalCaseStore.medicalCaseList.get(it)?.name).join(', ') ?? '';
//                 },
//             },
//             {
//                 title: translate('author'),
//                 dataIndex: 'authorId',
//                 key: 'authorId',
//                 width: 130,
//                 filterData: {
//                     filteredValue: filteredInfo.authorId,
//                     count: filteredInfo.authorId?.length,
//                 },
//                 renderType: ColumnRenderType.RowText,
//                 makeColumnValue: (value, { doctorId, coAuthorIds = [] }) => {
//                     const { userList } = useStore([UserList.Name]);
//                     return compact(uniq([doctorId, ...coAuthorIds, value]))
//                         .map(id => userList.get(id)?.shortFullName ?? '')
//                         .join(', ');
//                 },
//                 filterDropdown: props => (
//                     <FilterDropDown
//                         dataTest={''}
//                         filteredInfo={filteredInfo.authorId}
//                         options={userOptions}
//                         filterProps={props}
//                     />
//                 ),
//             },
//             {
//                 title: '',
//                 dataIndex: 'coAuthorIds',
//                 key: 'coAuthorIds',
//                 width: 0,
//                 filterData: {
//                     filteredValue: filteredInfo.coAuthorIds,
//                     count: filteredInfo.coAuthorIds?.length,
//                 },
//                 render: () => '',
//                 filterDropdown: props => (
//                     <FilterDropDown
//                         dataTest={''}
//                         filteredInfo={filteredInfo.coAuthorIds}
//                         options={userOptions}
//                         filterProps={props}
//                     />
//                 ),
//             },
//             {
//                 title: translate('clinic'),
//                 dataIndex: 'organizationId',
//                 key: 'organizationId',
//                 width: 100,
//                 filterData: {
//                     filteredValue: filteredInfo.organizationId,
//                     count: filteredInfo.organizationId?.length,
//                 },
//                 renderType: ColumnRenderType.RowText,
//                 makeColumnValue: value => {
//                     const { organizationList } = useStore([OrganizationList.Name]);
//
//                     return organizationList.get(value)?.abbreviation;
//                 },
//                 filterDropdown: props => (
//                     <FilterDropDown
//                         dataTest={''}
//                         filteredInfo={filteredInfo.authorId}
//                         options={clinicOptions}
//                         filterProps={props}
//                     />
//                 ),
//             },
//             {
//                 title: translate('status'),
//                 dataIndex: 'status',
//                 key: 'status',
//                 width: 130,
//                 render: (value, record) => {
//                     const isAnalysisType = record.entryTypeType === EntryTypeType.Tests;
//                     const isSigned = value === EntryStatus.Signed;
//
//                     const ignoreEds = isSigned && isAnalysisType;
//
//                     return (
//                         <RowText
//                             text={getEntryStatusTranslation(value)}
//                             prefix={
//                                 <EntryStatusItem
//                                     status={
//                                         record.isSignedWithEDS
//                                             ? getCustomEntryStatusTranslation(EntryStatusCustom.WithEds)
//                                             : value
//                                     }
//                                     ignoreEds={ignoreEds}
//                                     isSignedWithEds={record?.isSignedWithEDS}
//                                 />
//                             }
//                         />
//                     );
//                 },
//                 filterData: {
//                     filteredValue: filteredInfo.status,
//                     count: filteredInfo.status?.length,
//                 },
//                 filterDropdown: hideStatusFilter
//                     ? undefined
//                     : props => (
//                           <FilterDropDown
//                               dataTest={''}
//                               filteredInfo={filteredInfo.status}
//                               options={statusOptions}
//                               filterProps={props}
//                           />
//                       ),
//             },
//             isDefined(getMenuItems) && {
//                 title: '',
//                 dataIndex: 'edit',
//                 key: 'edit',
//                 width: 25,
//                 render: (_, record) => {
//                     return React.createElement(CellButtonWrapper, {
//                         withIcon: true,
//                         items: getMenuItems(record),
//                         theme: CellButtonThemes.Light,
//                     });
//                 },
//             },
//         ]);
//     }
//
//     return {
//         getColumns,
//     };
// }
