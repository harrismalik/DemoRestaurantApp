import './styles.css'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSlotsRequest, getTablesRequest} from "../../redux/modules/listing/actions";
import {selectSlots, selectTables} from "../../redux/modules/listing/selectors";
export default function CreateReservation() {
    const dispatch = useDispatch()
    const [bookingDate, setBookingDate] = useState<string>('');
    const [diningCapacity, setDiningCapacity] = useState<null|number>(null);
    const [slot, setSlot] = useState<number|null>(null);
    const updateSlot = (_slot:string) => _slot!=='0' && setSlot(parseInt(_slot))
    const updateBookingDate = (_date:string) => setBookingDate(_date)
    const slots = useSelector(selectSlots)
    const tables = useSelector(selectTables)
    const extractHour = (_date:string) => {
        const hr = parseInt(_date.split(':')[0])
        const am_pm = hr>11 ? 'PM' : 'AM'
        return (hr>12 ? hr-12 : hr).toString()+' '+am_pm
    }

    useEffect(() => {
        !slot && dispatch(getSlotsRequest())
        bookingDate && dispatch(getTablesRequest({date:bookingDate}))
    },[bookingDate])

    return (
        <section className={'create-reservation-section'}>
            <div className="reservation-form">
                <input
                    type="date"
                    id="reservation-date"
                    onChange={e => updateBookingDate(e.target.value)}
                    required
                />
                <input
                    type="number"
                    id="diningCapacity"
                    value={diningCapacity?.toString()}
                    placeholder="Number of People"
                    required
                />
                <select name="slot" onChange={e => updateSlot(e.target.value)} id="slot">
                    <option value="0">Select Your Slot</option>
                    {
                        slots.map(_slot => <option value={_slot['id']}>{extractHour(_slot['start_time']) +' - '+ extractHour(_slot['end_time'])}</option>)
                    }
                </select>
                {/*<button>Reserve Now</button>*/}
            </div>

            {bookingDate && tables.length && <div className="tables-list">
                <div className="tables-list-item tables-heading">
                    <div>
                        Select Tables
                    </div>
                </div>
                <div className="scrollable">
                    {
                        tables.map(table => (
                            <div className="tables-list-item selectable">
                                <div className="table-number">Table # {table['table_no']},</div>
                                <div className="dining-capacity">{table['capacity']} Persons</div>
                            </div>
                        ))
                    }
                </div>
                <div className="tables-list-item selectable">
                    <div>Confirm</div>
                </div>
            </div>}
        </section>
    )
}
