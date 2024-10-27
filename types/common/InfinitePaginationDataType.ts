export type InfinitePaginationDataType<K extends string, T> = {
    [key in K]: T[];
} & {
    pageInfo: {
        page: number;
        hasNext: boolean;
    };
};
