import './styles.css'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSlotsRequest, getTablesRequest, listingSuccess} from "../../redux/modules/listing/actions";
import {selectSlots, selectTables} from "../../redux/modules/listing/selectors";
import {bookingRequest} from "../../redux/modules/booking/actions";
import {extractHour} from "../../helpers/helpers";
import Cookies from "js-cookie";

interface CreateReservationProps {
    navigateTo: (params: any) => any;
}
const CreateReservation:React.FC<CreateReservationProps> = ({navigateTo}) => {
    const dispatch = useDispatch()
    const [tablesConfirmed, setTablesConfirmed] = useState<boolean>(false);
    const [bookingDate, setBookingDate] = useState<string>('');
    const [customerPhone, setCustomerPhone] = useState<string>('');
    const [customerNote, setCustomerNote] = useState<string>('');
    const [diningCapacity, setDiningCapacity] = useState<number>(0);
    const [selectedTables, setSelectedTables] = useState<Array<number>>([])
    const [slot, setSlot] = useState<number|null>(null);

    const slots = useSelector(selectSlots)
    const tables = useSelector(selectTables)

    const updateSlot = (_slot:string) => setSlot(_slot=='0'?null:parseInt(_slot))
    const updateBookingDate = (_date:string) => setBookingDate(_date)
    const updateSelectedTables = (_table:number,_diningCapacity:number) => {
        if(selectedTables.includes(_table)) {
            setSelectedTables(selectedTables.filter(t => t !== _table))
            setDiningCapacity(diningCapacity-_diningCapacity)
        } else {
            setSelectedTables([_table,...selectedTables])
            setDiningCapacity(diningCapacity+_diningCapacity)
        }
    }
    const handleReserveNow = () => {
        const token:string = Cookies.get('access_token') ? Cookies.get('access_token') as string : ""
        if(slot!==null) {
            dispatch(bookingRequest({
                booking_date: bookingDate,
                customer_phone_number: customerPhone,
                customer_note: customerNote,
                slot_id: slot,
                table_ids: selectedTables,
                token
            }))
            dispatch(listingSuccess({ type:'myBookings', data:[], message:"Empty" }))
            navigateTo('recentReservation')
        }
    }

    useEffect(() => {
        !slot && dispatch(getSlotsRequest())
        bookingDate && dispatch(getTablesRequest({date:bookingDate}))
    },[bookingDate])

    const getAvailableTables = (_tables:[]) => {
        const comparingSlot = slot
        const newTables = _tables.filter(table => {
            let included = true
            // @ts-ignore
            table?.bookings?.forEach(booking => {
                // @ts-ignore
                booking?.slots?.forEach(slot => {
                    // @ts-ignore
                    if(comparingSlot == slot['id']) {
                        included = false
                    }
                })
            })
            return included
        })
        return newTables
    }

    return (
        <section className={'create-reservation-section'}>
            <div className="reservation-form">
                <input
                    type="date"
                    id="reservation-date"
                    onChange={e => updateBookingDate(e.target.value)}
                />
                {
                    bookingDate && tables.length && (
                        <input
                            type="text"
                            disabled
                            id="diningCapacity"
                            value={"Selected Capacity: "+diningCapacity?.toString()}
                            placeholder="Selected Capacity"
                        />
                    )
                }
                { tablesConfirmed && (
                    <>
                        <input
                            type="text"
                            id="customer_phone_number"
                            onChange={e => setCustomerPhone(e.target.value)}
                            placeholder="Phone Number (+9000000000)"
                        />
                        <input
                            type=""
                            id="customer_note"
                            onChange={e => setCustomerNote(e.target.value)}
                            placeholder="Additional Note"
                        />
                    </>
                )}
                <select name="slot" {...(selectedTables.length ? { disabled: true } : {})} onChange={e => updateSlot(e.target.value)} id="slot">
                    <option value="0">Select Your Slot</option>
                    { slots.map(_slot => <option value={_slot['id']}>{extractHour(_slot['start_time']) +' - '+ extractHour(_slot['end_time'])}</option>) }
                </select>
                {tablesConfirmed && slot && customerPhone && <button onClick={handleReserveNow}>Reserve Now</button>}
            </div>

            {bookingDate && slot && tables.length && <div className="tables-list">
                <div className="tables-list-item tables-heading">
                    <div>
                        {tablesConfirmed ? 'Selected Tables' : 'Select Tables'}
                    </div>
                </div>
                <div className="scrollable">
                    {
                        !tablesConfirmed && getAvailableTables(tables).map(table => (
                            <div className={(selectedTables.includes(table['id'])?"selected":"")+" tables-list-item selectable"} onClick={() => updateSelectedTables(table['id'],table['capacity'])}>
                                <div className="table-number">Table # {table['table_no']},</div>
                                <div className="dining-capacity">{table['capacity']} Persons</div>
                            </div>
                        ))
                    }
                    {
                        tablesConfirmed && tables.filter(t => selectedTables.includes(t['id'])).map(table => (
                            <div className="selected tables-list-item">
                                <div className="table-number">Table # {table['table_no']},</div>
                                <div className="dining-capacity">{table['capacity']} Persons</div>
                            </div>
                        ))
                    }
                </div>
                {
                    !tablesConfirmed && selectedTables.length && (
                        <div className="confirm-table tables-list-item selectable" onClick={() => setTablesConfirmed(true)}>
                            <div>Confirm Tables</div>
                        </div>
                    )
                }
            </div>}
        </section>
    )
}

export default CreateReservation
