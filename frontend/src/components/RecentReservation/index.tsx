import './styles.css'
import {useSelector} from "react-redux";
import {selectLastBooking} from "../../redux/modules/booking/selectors";
export default function RecentReservation() {
    const lastBooking = useSelector(selectLastBooking)
    return (
        <section className={'recent-booking-section'}>
            <div className="recent-booking-div">
                <h1>Thanks for choosing us!</h1>
                {
                    lastBooking!==undefined && (
                        <>
                            <p>Your booking is confirmed on "<i>{
                                // @ts-ignore
                                lastBooking['booking_date']
                            }</i>" with booking reference "<i>{
                                // @ts-ignore
                                lastBooking['booking_ref']
                            }</i>".</p>
                        </>
                    )
                }
            </div>
        </section>
    )
}
