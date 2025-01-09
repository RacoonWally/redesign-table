import isArray from 'lodash/isArray';

import { Nullable } from 'chaika-common-types';

import { PresetFilter } from '@components/Table/filters/PresetFilters/PresetFilters';
import { useEffect } from 'react';

interface Props {
    presetFilters: PresetFilter[];
    onPresetFilter(params: Record<any, any>): Promise<void> | void;
}

interface Data {
    parseValueToArray(presetFilter: PresetFilter): Record<string, Nullable<string>[]>;
}

export function usePresetFilters({ presetFilters, onPresetFilter }: Props): Data {
    useEffect(() => {
        (async () => {
            const filterWithDefaultPreset = presetFilters.find(filter => filter.isDefaultPreset);
            if (!!filterWithDefaultPreset) {
                await onPresetFilter(filterWithDefaultPreset.filters);
            }
        })();
    }, []);

    function parseValueToArray(presetFilter: PresetFilter): Record<string, Nullable<string>[]> {
        const filters: Record<string, Nullable<string>[]> = {};

        for (const key in presetFilter.filters) {
            const value = presetFilter.filters[key];
            filters[key] = isArray(value) ? value : [value];
        }

        return filters;
    }

    return {
        parseValueToArray,
    };
}
