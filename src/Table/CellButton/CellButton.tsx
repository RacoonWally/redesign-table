// import React from 'react';
// import classNames from 'classnames';
// import { observer } from 'mobx-react';
//
// import styles from './CellButton.scss';
//
// import { Icon, IconType } from '@components/Icon';
// import { SelectButtonItem } from '@components/SelectButtonItem';
// import { ClickOutsideMask } from '@components/ClickOutsideMask';
// import { useCellButton } from '@components/Table/CellButton/hooks/useCellButton';
// import { ComponentTypes } from '@components/types';
//
// interface Props {
//     theme?: CellButtonThemes;
//     items: CellButtonMenuItem[];
//     label?: string;
//     withIcon?: boolean;
//     disabled?: boolean;
// }
//
// export enum CellButtonThemes {
//     // @ts-ignore
//     Primary = styles.root_primary,
//     // @ts-ignore
//     Secondary = styles.root_secondary,
//     // @ts-ignore
//     Light = styles.root_light,
// }
//
// export interface CellButtonMenuItemWithLabel {
//     label: string;
//     dataTest: string;
//     isHighlighted?: boolean;
//     disable?: boolean;
//     value?: string;
//     disableHint?: string;
//     startIconType?: IconType;
//     endIconType?: IconType;
//     onClick(value?: string, event?: React.MouseEvent<HTMLDivElement>): void;
// }
// interface CellButtonMenuDivider {
//     divider: true;
// }
//
// export type CellButtonMenuItem = CellButtonMenuItemWithLabel | CellButtonMenuDivider;
//
// export const CellButton = observer(
//     ({ theme, items, label, withIcon = false, disabled = false }: Props): JSX.Element => {
//         const { isOpen, onToggleOpen } = useCellButton();
//
//         return (
//             <div
//                 className={classNames([
//                     styles.root,
//                     isOpen && styles.open,
//                     disabled && styles.disabled,
//                     !!theme && theme,
//                     label && styles.root_withLabel,
//                 ])}
//                 onClick={disabled ? undefined : onToggleOpen}
//             >
//                 {label && <span className={styles.label}>{label}</span>}
//                 {withIcon && <Icon type={IconType.MEATBALL} />}
//                 {isOpen && (
//                     <>
//                         <ClickOutsideMask
//                             zIndex={1}
//                             transparentBackground
//                             onClickOutside={onToggleOpen}
//                         />
//                         <div className={styles.menuWrapper}>
//                             {items.map((item, index) =>
//                                 ComponentTypes.Divider in item ? (
//                                     <div
//                                         key={`${ComponentTypes.Divider}_${index}`}
//                                         className={styles.divider}
//                                     />
//                                 ) : (
//                                     <SelectButtonItem
//                                         redesign
//                                         dataTest={item.dataTest}
//                                         disable={item.disable}
//                                         disableHint={item.disableHint}
//                                         key={item.label}
//                                         value={item.value}
//                                         label={item.label}
//                                         startIconType={item.startIconType}
//                                         endIconType={item.endIconType}
//                                         isHighlighted={item.isHighlighted}
//                                         toggleIsOpen={onToggleOpen}
//                                         onItemClick={item.onClick}
//                                     />
//                                 ),
//                             )}
//                         </div>
//                     </>
//                 )}
//             </div>
//         );
//     },
// );
