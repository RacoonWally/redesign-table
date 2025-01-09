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
//
//     function getMenuItems(record: EntryListParams): CellButtonMenuItem[] {
//         const menuItems: CellButtonMenuItem[] = [
//             {
//                 isHighlighted: true,
//                 label: translate('delete'),
//                 dataTest: '',
//                 onClick: () => onDelete(record.id),
//             },
//         ];
//         switch (record.status) {
//             case EntryStatus.Archive: {
//                 menuItems.unshift({
//                     label: translate('returnFromArchive'),
//                     dataTest: '',
//                     onClick: async () => changeStatus(record.id, EntryStatus.Draft),
//                 });
//                 break;
//             }
//             case EntryStatus.Draft:
//             case EntryStatus.Unsigned: {
//                 menuItems.unshift({
//                     label: translate('moveToArchive'),
//                     dataTest: '',
//                     onClick: async () => changeStatus(record.id, EntryStatus.Archive),
//                 });
//             }
//         }
//
//         return menuItems;
//     }
//
//     function onDelete(id: string) {
//         app.showConfirmPopup({
//             onClose,
//             description: tAreYouSure,
//             confirmText: tDelete,
//             cancelText: tCancel,
//             modifiers: [PopupModifiers.Redesign],
//             onCancel: onClose,
//             onConfirm: () => onConfirm(id),
//         });
//     }
//
//     async function onConfirm(id: string) {
//         await deleteEntry(id);
//     }
//
//     function onClose(): void {
//         const { app } = useStore([AppState.Name]);
//
//         app.showConfirmPopup(null);
//     }
//
//     return {
//         getMenuItems,
//     };
// }
