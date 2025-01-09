import { useEffect, useState } from 'react';

import { Optional } from 'chaika-common-types';
import { isDefined } from '@utils/isDefined';
import { PresetFiltersParams } from '@components/Table/filters/PresetFilters/PresetFilters';

interface Props {
    selectedFilters?: Record<any, any>;
    presetFiltersParams?: PresetFiltersParams;
    onFiltersChange?(params: Record<any, any>): Promise<void> | void;
}

interface Data {
    tableIndex: number;
    selectedPreset?: number;
    hasFilters: boolean;
    hasPresetFilters: boolean;
    onResetFilters(): void;
    onPresetFilterClick(params: Record<any, any>, index?: number): Promise<void> | void;
}

export function useFilters({ selectedFilters, presetFiltersParams, onFiltersChange }: Props): Data {
    const [tableIndex, setTableIndex] = useState(0);
    const [selectedPreset, setSelectedPreset] = useState<Optional<number>>();

    useEffect(() => {
        if (presetFiltersParams?.presetByIndex) {
            const defaultPresetIndex = presetFiltersParams.presetFilters.findIndex(it => it.isDefaultPreset);
            setSelectedPreset(defaultPresetIndex >= 0 ? defaultPresetIndex : undefined);
        }
    }, []);

    const hasFilters = !!selectedFilters && Object.values(selectedFilters).some(value => !!value);
    const hasPresetFilters = !!presetFiltersParams;

    async function onPresetFilterClick(params: Record<any, any>, index?: number): Promise<void> {
        if (!!presetFiltersParams?.onPresetFilter) {
            setTableIndex(prev => prev + 1);
            if (presetFiltersParams.presetByIndex) {
                setSelectedPreset(index);
            }
            await presetFiltersParams.onPresetFilter(params);
        }
    }

    function onResetFilters(): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isDefined(selectedPreset) && setSelectedPreset(undefined);
        onFiltersChange?.({});
        setTableIndex(prev => prev + 1);
    }

    return {
        tableIndex,
        hasFilters,
        hasPresetFilters,
        selectedPreset,
        onResetFilters,
        onPresetFilterClick,
    };
}
