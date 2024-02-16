export interface ListingState {
    updating: boolean;
    response: string | null;
    error: boolean;
    tables: [];
    menu: [];
    slots: [];
}

export interface ListingPayload {
    type: string;
    data:any;
}

export interface GetTablesPayload {
    date: string;
}
