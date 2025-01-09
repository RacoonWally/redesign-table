// import { useCallback } from 'react';
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
//     const onChangeStatus = useCallback(async (): Promise<void> => {
//         const newStatus = data.status === EntryStatus.Draft ? EntryStatus.Archive : EntryStatus.Draft;
//         await onChangeStatusPopup(data.id, newStatus);
//     }, [data.id, data.status, onChangeStatusPopup]);
//
//     const onSubmit = useCallback((event: React.MouseEvent): void => {
//         onSubmitPopup(data.serialNumber, event);
//     }, [data.serialNumber, onSubmitPopup]);
//
//     const onCancel = useCallback((event: React.MouseEvent): void => {
//         onCancelPopup(event);
//     }, [onCancelPopup]);
//
//     const onDelete = useCallback((event: React.MouseEvent): void => {
//         app.showConfirmPopup({
//             description: tAreYouSure,
//             confirmText: tDelete,
//             cancelText: tCancel,
//             modifiers: [PopupModifiers.Redesign],
//             onConfirm: () => onConfirm(event),
//             onClose: () => app.showConfirmPopup(null),
//             onCancel: () => app.showConfirmPopup(null),
//         });
//     }, [app, tAreYouSure, tDelete, tCancel, onConfirm]);
//
//     const onConfirm = useCallback(async (event: React.MouseEvent): Promise<void> => {
//         app.showConfirmPopup(null);
//         await onDeletePopup(data, event);
//     }, [app, onDeletePopup, data]);
//
//     return {
//         onSubmit,
//         onCancel,
//         onDelete,
//         onChangeStatus,
//     };
// }