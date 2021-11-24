export enum FilterOrdering {
    Ascending = "asc",
    Descending = "desc"
};

export type Limits = {
    min: number | null,
    max: number | null
}

export type RangeFilter = {
    ordering?: FilterOrdering,
    limits: Limits
}