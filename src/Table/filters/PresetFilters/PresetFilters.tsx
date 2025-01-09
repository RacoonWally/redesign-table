import React from 'react';
import { observer } from 'mobx-react';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import hash from 'object-hash';

import styles from './PresetFilters.scss';

import { usePresetFilters } from '@components/Table/filters/PresetFilters/hooks/usePresetFilters';
import { isDefined } from '@utils/isDefined';

interface Props {
    selectedPreset?: number;
    presetFiltersParams: PresetFiltersParams;
    selectedFilters?: Record<any, any>;
}

export interface PresetFiltersParams {
    presetFilters: PresetFilter[];
    dataTest: string;
    presetByIndex?: boolean;
    onPresetFilter(params: Record<any, any>, index?: number): Promise<void> | void;
}

export interface PresetFilter {
    label: string;
    isDefaultPreset?: boolean;
    filters: Record<any, any>;
    sortingOrders?: Record<any, any>;
}

export const PresetFilters = observer(
    ({ selectedFilters, selectedPreset, presetFiltersParams: { dataTest, presetFilters, onPresetFilter } }: Props) => {
        const { parseValueToArray } = usePresetFilters({ presetFilters, onPresetFilter });

        return (
            <div className={styles.root}>
                {presetFilters.map((presetFilter, index) => {
                    const filters = parseValueToArray(presetFilter);

                    const isHighlighted =
                        (isDefined(selectedPreset) && index === selectedPreset) ||
                        (selectedFilters && isEqual(filters, selectedFilters));

                    return (
                        <div
                            data-test={`${dataTest}_${index}`}
                            data-testid={`${dataTest}_${index}`}
                            key={hash(presetFilter.filters)}
                            className={classNames([styles.button, isHighlighted && styles.highlighted])}
                            onClick={async () => {
                                await onPresetFilter(presetFilter.filters, index);
                            }}
                        >
                            {presetFilter.label}
                        </div>
                    );
                })}
            </div>
        );
    },
);
