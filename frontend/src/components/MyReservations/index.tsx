import './styles.css'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectMyBookings} from "../../redux/modules/listing/selectors";
import {getMyBookingsRequest} from "../../redux/modules/listing/actions";
import Cookies from "js-cookie";
import {extractHour} from "../../helpers/helpers";

const MyReservations = () => {
    const dispatch = useDispatch()
    const myBookings = useSelector(selectMyBookings)
    useEffect(()=>{
        if(!myBookings.length) {
            const token:string = Cookies.get('access_token') ? Cookies.get('access_token') as string : ""
            dispatch(getMyBookingsRequest({token}))
        }
    },[])
    const getBookingSlot = (booking:any) => {
        return extractHour(booking.slots[0].start_time).toLowerCase() +' - '+ extractHour(booking.slots[0].end_time).toLowerCase()
    }

    const getBookingTables = (booking:any) => {
        let tables = "Tables: "
        booking.tables.forEach((table:any,index:number) => {
            tables+=(index ? ", "+table.table_no : table.table_no)
        })
        return tables
    }
    console.log(myBookings)
    return (
        <section className={'my-reservations-section'}>
            {<div className="tables-list">
                <div className="tables-list-item tables-heading">
                    <div>
                        Your Bookings
                    </div>
                </div>
                <div className="scrollable">
                    {
                        myBookings?.map(booking => (
                            <div className={"selected tables-list-item selectable"}>
                                <div className="table-number">{booking['booking_date']},</div>
                                <div className="table-number">{getBookingSlot(booking)},</div>
                                <div className="dining-capacity">{getBookingTables(booking)}</div>
                            </div>
                        ))
                    }
                </div>
            </div>}
        </section>
    )
}

export default MyReservations
