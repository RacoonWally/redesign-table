// import React from 'react';
// import { EntryStatus } from 'chaika-enums';
//
// interface UseHandlersProps {
//     data: EntryListParams & EntryTableData;
//     onSubmitPopup(serialNumber: number, event: React.MouseEvent): void;
//     onDeletePopup(entry: EntryListParams & EntryTableData, event: React.MouseEvent): Promise<void>;
//     onCancelPopup(event: React.MouseEvent): void;
//     onChangeStatusPopup(entryId: string, status: EntryStatus): void;
// }
//
// export function useHandlers({
//     onChangeStatusPopup,
//     onSubmitPopup,
//     onCancelPopup,
//     onDeletePopup,
//     data,
// }: UseHandlersProps) {
//     const { app } = useStore([AppState.Name]);
//
//     const tDelete = translate('delete');
//     const tCancel = translate('cancel');
//     const tAreYouSure = translate('areYouSure');
//
//     async function onChangeStatus(): Promise<void> {
//         const newStatus = data.status === EntryStatus.Draft ? EntryStatus.Archive : EntryStatus.Draft;
//         await onChangeStatusPopup(data.id, newStatus);
//     }
//
//     function onSubmit(event: React.MouseEvent): void {
//         onSubmitPopup(data.serialNumber, event);
//     }
//
//     function onCancel(event: React.MouseEvent): void {
//         onCancelPopup(event);
//     }
//
//     function onDelete(event: React.MouseEvent): void {
//         app.showConfirmPopup({
//             description: tAreYouSure,
//             confirmText: tDelete,
//             cancelText: tCancel,
//             modifiers: [PopupModifiers.Redesign],
//             onConfirm: () => onConfirm(event),
//             onClose: () => app.showConfirmPopup(null),
//             onCancel: () => app.showConfirmPopup(null),
//         });
//     }
//
//     async function onConfirm(event: React.MouseEvent): Promise<void> {
//         app.showConfirmPopup(null);
//         await onDeletePopup(data, event);
//     }
//
//     return {
//         onSubmit,
//         onCancel,
//         onDelete,
//         onChangeStatus,
//     };
// }
