// import { Key, useEffect, useState, useCallback } from 'react';
// import isArray from 'lodash/isArray';
// import uniqBy from 'lodash/uniqBy';
// import { FilterDropdownProps, FilterValue } from 'antd/es/table/interface';
//
// import { AntdOptionType } from '@utils/makeOptionTypes';
//
// interface Props {
//     filteredInfo: FilterValue | null;
//     options?: AntdOptionType[];
//     filterProps: FilterDropdownProps;
//     loadByQuery?(query: string): Promise<AntdOptionType[]>;
// }
//
// interface Data {
//     inputValue: string;
//     foundValues: AntdOptionType[];
//     isButtonDisabled: boolean;
//     onApply(): void;
//     onReset(): void;
//     onInputChange(value: string): void;
//     onSelectItem(item: AntdOptionType): void;
//     getIsItemChecked(item: AntdOptionType): boolean;
// }
//
// export function useDropDownFilters({ loadByQuery, filterProps, options = [], filteredInfo }: Props): Data {
//     const [inputValue, setInputValue] = useState('');
//     const [foundValues, setFoundValues] = useState<AntdOptionType[]>(options);
//     const [loadedOptions, setLoadedOptions] = useState<AntdOptionType[]>(options);
//     const [checkedSet, setCheckedSet] = useState<Set<Key>>(new Set(filterProps.selectedKeys));
//
//     useEffect(() => {
//         if (!!loadByQuery) {
//             (async () => {
//                 if (!inputValue) {
//                     setFoundValues(loadedOptions);
//                 } else {
//                     const loadedOptions = await loadByQuery(inputValue);
//
//                     setLoadedOptions(prevState => {
//                         return uniqBy(prevState.concat(loadedOptions), 'value');
//                     });
//
//                     setFoundValues(loadedOptions);
//                 }
//             })();
//         } else {
//             setFoundValues(() =>
//                 options.filter(item => item.text.toLowerCase().includes(inputValue.toLowerCase()))
//             );
//         }
//     }, [inputValue, loadByQuery, loadedOptions, options]);
//
//     useEffect(() => {
//         setCheckedSet(new Set(filterProps.selectedKeys));
//     }, [filterProps.selectedKeys]);
//
//     const onInputChange = useCallback((value: string): void => {
//         setInputValue(value);
//     }, []);
//
//     const onSelectItem = useCallback((item: AntdOptionType): void => {
//         const checkedKeys: Key[] = [];
//
//         if (filterProps.selectedKeys.some(selectedValue => selectedValue === item.value)) {
//             checkedKeys.push(...filterProps.selectedKeys.filter(selectedValue => selectedValue !== item.value));
//         } else {
//             const { selectedKeys } = filterProps;
//             checkedKeys.push(...selectedKeys, item.value);
//         }
//
//         filterProps.setSelectedKeys(checkedKeys);
//         setCheckedSet(new Set(checkedKeys));
//     }, [filterProps]);
//
//     const getIsItemChecked = useCallback(
//         (item: AntdOptionType): boolean => {
//             return checkedSet.has(item.value);
//         },
//         [checkedSet]
//     );
//
//     const onApply = useCallback((): void => {
//         filterProps.confirm();
//     }, [filterProps.confirm]);
//
//     const onReset = useCallback((): void => {
//         filterProps.setSelectedKeys([]);
//         setCheckedSet(new Set());
//         filterProps.confirm();
//     }, [filterProps.confirm, filterProps.setSelectedKeys]);
//
//     const getIsButtonDisabled = useCallback((): boolean => {
//         let isButtonsDisabled = true;
//         if (filterProps.selectedKeys.length > 0 && (!filteredInfo || isArray(filteredInfo))) {
//             isButtonsDisabled = false;
//         } else if (filterProps.selectedKeys.length === 0 && isArray(filteredInfo)) {
//             isButtonsDisabled = false;
//         }
//
//         return isButtonsDisabled;
//     }, [filterProps.selectedKeys, filteredInfo]);
//
//     return {
//         inputValue,
//         foundValues,
//         onApply,
//         onReset,
//         onInputChange,
//         onSelectItem,
//         getIsItemChecked,
//         isButtonDisabled: getIsButtonDisabled(),
//     };
// }