// import React, { useMemo } from 'react';
// import compact from 'lodash/compact';
// import uniq from 'lodash/uniq';
//
// interface Data {
//     tableData: EntryTableData[];
//     mobileFields: MobileField[];
// }
//
// export function useEntryMobileCard(): Data {
//     const mobileFields: MobileField[] = [
//         {
//             title: translate('title'),
//             accessor: 'entryTypeTitle',
//             isPrimary: true,
//             withoutTitle: true,
//             fieldType: FieldTypes.Text,
//         },
//         {
//             title: translate('author'),
//             accessor: 'author',
//             fieldType: FieldTypes.Text,
//         },
//         {
//             title: translate('visitDate'),
//             accessor: 'visitTime',
//             fieldType: FieldTypes.Text,
//         },
//         {
//             title: translate('status'),
//             accessor: 'statusIcon',
//             fieldType: FieldTypes.StatusIcon,
//         },
//         {
//             title: '№',
//             accessor: 'indexNumber',
//             hide: true,
//             fieldType: FieldTypes.Text,
//         },
//         {
//             title: translate('type'),
//             accessor: 'entryTypeType',
//             hide: true,
//             fieldType: FieldTypes.Text,
//         },
//         {
//             title: 'serialNumber',
//             accessor: 'serialNumber',
//             hide: true,
//             fieldType: FieldTypes.Text,
//         },
//         {
//             title: 'id',
//             accessor: 'id',
//             hide: true,
//             fieldType: FieldTypes.Text,
//         },
//         {
//             title: 'ehrId',
//             accessor: 'ehrId',
//             hide: true,
//             fieldType: FieldTypes.Text,
//         },
//         {
//             title: translate('idAndEpisode'),
//             accessor: 'medicalCaseIdsAndNames',
//             hide: true,
//             fieldType: FieldTypes.Text,
//         },
//         {
//             title: translate('patient'),
//             accessor: 'patientName',
//             hide: true,
//             fieldType: FieldTypes.Text,
//         },
//         {
//             title: translate('clinic'),
//             accessor: 'organization',
//             hide: true,
//             fieldType: FieldTypes.Text,
//         },
//         {
//             title: 'status',
//             accessor: 'status',
//             hide: true,
//             fieldType: FieldTypes.Text,
//         },
//         {
//             title: translate('status'),
//             accessor: 'statusTitle',
//             hide: true,
//             fieldType: FieldTypes.Text,
//         },
//     ];
//
//     const tableData = useMemo(() => {
//         const {
//             entryListStore: { entryList },
//             ehr: { medicalCases },
//             organizationList,
//             userList,
//         } = useStore([EntryListStore.Name, Ehr.Name, OrganizationList.Name, UserList.Name]);
//
//         const filteredValues = entryList.paginateFilteredValues;
//
//         return filteredValues.map(({ entryTypeTitle, entryTypeType, typeId, ...entry }) => {
//             const detail = entryList.getEntryDetails(entry.id);
//
//             const entryMedicalCase = medicalCases.getFilteredValues({ relatedEntryIds: [entry.id] });
//
//             const organization = organizationList.get(entry.organizationId);
//             const visitTime = TimezoneHelper.toTimeZoneFromLocalTimezone(
//                 entry.visitTime ?? entry.creationTime,
//                 organization.tzCode,
//             );
//
//             const authors = compact(uniq([entry?.doctorId, ...(entry.coAuthorIds || []), entry.authorId]))
//                 .map(id => userList.get(id)?.fullName ?? '')
//                 .join(', ');
//
//             return {
//                 ...entry,
//                 typeId,
//                 entryTypeType,
//                 author: authors,
//                 entryTypeTitle: entriesListService.getEntryTitle(entry.id),
//                 showMoreInfo: !!detail && entryTypeType === EntryTypeType.Tests,
//                 patientName: store.patientStore.patientList.get(entry.ehrId)?.fullName ?? '',
//                 organization: organization?.abbreviation ?? '',
//                 visitTime: DateHelper.toLocalStringDate(visitTime, true),
//                 statusTitle: translate(entry.status === EntryStatus.Signed ? 'signed' : 'draft'),
//                 statusIcon: React.createElement(EntryStatusItem, {
//                     status: entry.status,
//                     isSignedWithEDS: entry.isSignedWithEDS,
//                 }),
//                 medicalCaseIdsAndNames: React.createElement(EntryCaseList, {
//                     cases: entryMedicalCase.map(({ serialNumber, name, isClosed }) => ({
//                         serialNumber,
//                         name,
//                         isClosed,
//                     })),
//                 }),
//             };
//         });
//     }, []);
//
//     return {
//         mobileFields,
//         tableData,
//     };
// }