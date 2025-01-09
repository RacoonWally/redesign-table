// import { useCallback } from 'react';
//
// interface Props {
//     changeStatus(id: string, status: EntryStatus): Promise<void>;
//     deleteEntry(id: string): Promise<void>;
// }
//
// interface Data {
//     getMenuItems(record: EntryListParams): CellButtonMenuItem[];
// }
//
// export function useMenu({ changeStatus, deleteEntry }: Props): Data {
//     const { app } = useStore([AppState.Name]);
//
//     const tDelete = translate('delete');
//     const tCancel = translate('cancel');
//     const tAreYouSure = translate('areYouSure');
//     const tMoveToArchive = translate('moveToArchive');
//     const tReturnFromArchive = translate('returnFromArchive');
//
//     const getMenuItems = useCallback(
//         (record: EntryListParams): CellButtonMenuItem[] => {
//             const menuItems: CellButtonMenuItem[] = [
//                 {
//                     isHighlighted: true,
//                     label: tDelete,
//                     dataTest: '',
//                     onClick: () => onDelete(record.id),
//                 },
//             ];
//
//             switch (record.status) {
//                 case EntryStatus.Archive:
//                     menuItems.unshift({
//                         label: tReturnFromArchive,
//                         dataTest: '',
//                         onClick: async () => changeStatus(record.id, EntryStatus.Draft),
//                     });
//                     break;
//                 case EntryStatus.Draft:
//                 case EntryStatus.Unsigned:
//                     menuItems.unshift({
//                         label: tMoveToArchive,
//                         dataTest: '',
//                         onClick: async () => changeStatus(record.id, EntryStatus.Archive),
//                     });
//             }
//
//             return menuItems;
//         },
//         [tDelete, tMoveToArchive, tReturnFromArchive, changeStatus]
//     );
//
//     const onDelete = useCallback(
//         (id: string) => {
//             app.showConfirmPopup({
//                 onClose,
//                 description: tAreYouSure,
//                 confirmText: tDelete,
//                 cancelText: tCancel,
//                 modifiers: [PopupModifiers.Redesign],
//                 onCancel: onClose,
//                 onConfirm: () => onConfirm(id),
//             });
//         },
//         [app, tAreYouSure, tDelete, tCancel, onConfirm]
//     );
//
//     const onConfirm = useCallback(
//         async (id: string) => {
//             await deleteEntry(id);
//         },
//         [deleteEntry]
//     );
//
//     const onClose = useCallback(() => {
//         app.showConfirmPopup(null);
//     }, [app]);
//
//     return {
//         getMenuItems,
//     };
// }