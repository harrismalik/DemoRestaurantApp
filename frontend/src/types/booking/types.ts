export interface BookingState {
    processing: boolean;
    response: string | null;
    error: boolean;
    lastBooking: object|undefined;
}

export interface BookPayload {
    booking_date:string,
    customer_phone_number:string,
    customer_note:string,
    slot_id:number,
    table_ids:Array<number>,
    token?:string
}
