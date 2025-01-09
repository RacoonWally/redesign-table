import { AntdOptionType } from '@utils/makeOptionTypes';

interface UseTableColumnsData {
    getColumnValue(params: ColumnValueProps): string;
    getColumnIncludesValue(params: ColumnValueProps): string;
}

interface ColumnValueProps {
    value: string;
    options: AntdOptionType[];
    extraOptions?: AntdOptionType[];
}

export function useTableColumns(): UseTableColumnsData {
    function getColumnValue({ value, options, extraOptions }: ColumnValueProps): string {
        return (
            options.find(option => option.value === value)?.text ??
            extraOptions?.find(option => option.value === value)?.text ??
            ''
        );
    }

    function getColumnIncludesValue({ value, options, extraOptions }: ColumnValueProps): string {
        return (
            options.find(option => option.value.includes(value))?.text ??
            extraOptions?.find(option => option.value.includes(value))?.text ??
            ''
        );
    }

    return { getColumnValue, getColumnIncludesValue };
}
