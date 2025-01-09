import isArray from 'lodash/isArray';

interface Data {
    parseValueToArray(record: Record<any, any>): Record<any, any>;
    parseNullParams(params: any): any;
}

export function useFiltersParsers(): Data {
    function parseNullParams(params: any): any {
        const parsedParams = { ...params };

        for (const key in params) {
            if (isArray(params[key]) && params[key].length === 1 && params[key][0] === 'null') {
                parsedParams[key] = 'null';
            }
        }

        return parsedParams;
    }

    function parseValueToArray(record: Record<any, any>): Record<any, any> {
        const localFilters = { ...record };

        for (const key in record) {
            const value = record[key];
            if (!isArray(value)) {
                localFilters[key] = [value];
            }
        }

        return localFilters;
    }

    return {
        parseValueToArray,
        parseNullParams,
    };
}
