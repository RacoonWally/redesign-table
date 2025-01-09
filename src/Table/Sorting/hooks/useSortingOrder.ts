import { AntdOptionType } from '@utils/makeOptionTypes';
import { DateHelper, StringDateSeparators } from '@utils/DateHelper';

interface Data {
    alphabetSorting(a: object, b: object, fieldName: string): number;
    dateSorting(a: object, b: object, fieldName: string, customDateFormat?: CustomDateFormat): number;
    numberSorting(a: object, b: object, fieldName: string): number;
    idSorting(a: object, b: object, fieldName: string, options: AntdOptionType[]): number;
    arrayIdsSorting(a: object, b: object, fieldName: string, options: AntdOptionType[]): number;
}

interface CustomDateFormat {
    stringSeparators?: StringDateSeparators;
}

const defaultSeparators: StringDateSeparators = {
    dateTime: ' ',
    date: '.',
    time: ':',
};

export function useSortingOrder(): Data {
    function alphabetSorting(a: object, b: object, fieldName: string): number {
        return a[fieldName].localeCompare(b[fieldName]);
    }

    function dateSorting(a: object, b: object, fieldName: string, customDateFormat?: CustomDateFormat): number {
        let dateA = a[fieldName];
        let dateB = b[fieldName];

        if (customDateFormat) {
            dateA = DateHelper.parseCustomStringToDate(
                a[fieldName],
                customDateFormat.stringSeparators ?? defaultSeparators,
            );
            dateB = DateHelper.parseCustomStringToDate(
                b[fieldName],
                customDateFormat.stringSeparators ?? defaultSeparators,
            );
        }

        return DateHelper.differenceInMinutes(dateA, dateB);
    }

    function numberSorting(a: object, b: object, fieldName: string): number {
        return a[fieldName] - b[fieldName];
    }

    function arrayIdsSorting(a: object, b: object, fieldName: string, options: AntdOptionType[]): number {
        const aValues = a[fieldName]
            .map((value: string) => options?.find(option => option.value === value)?.text ?? '')
            .join('');
        const bValues = b[fieldName]
            .map((value: string) => options?.find(option => option.value === value)?.text ?? '')
            .join('');

        return aValues.localeCompare(bValues);
    }

    function idSorting(a: object, b: object, fieldName: string, options: AntdOptionType[]): number {
        const aValue = (options?.find(option => option.value === a[fieldName])?.text as string) ?? '';
        const bValue = (options?.find(option => option.value === b[fieldName])?.text as string) ?? '';

        return aValue.localeCompare(bValue);
    }

    return {
        dateSorting,
        alphabetSorting,
        numberSorting,
        idSorting,
        arrayIdsSorting,
    };
}
