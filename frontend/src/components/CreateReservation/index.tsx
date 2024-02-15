import './styles.css'
import React, {useState} from "react";
export default function CreateReservation() {
    const [bookingDate, setBookingDate] = useState<string>('');
    const [diningCapacity, setDiningCapacity] = useState<null|number>(null);
    return (
        <section className={'create-reservation-section'}>
            <div className="reservation-form">
                <input
                    type="date"
                    id="reservation-date"
                    value={bookingDate}
                    required
                />
                <input
                    type="number"
                    id="diningCapacity"
                    value={diningCapacity?.toString()}
                    placeholder="Number of People"
                    required
                />
                {/*<button>Reserve Now</button>*/}
            </div>

            <div className="tables-list">
                <div className="tables-list-item tables-heading">
                    <div>
                        Select Tables
                    </div>
                </div>
                <div className="scrollable">
                    <div className="tables-list-item selectable">
                        <div className="table-number">Table # 2B,</div>
                        <div className="dining-capacity">4 Persons</div>
                    </div>
                    <div className="tables-list-item selectable">
                        <div className="table-number">Table # 2B,</div>
                        <div className="dining-capacity">4 Persons</div>
                    </div>
                    <div className="tables-list-item selectable">
                        <div className="table-number">Table # 2B,</div>
                        <div className="dining-capacity">4 Persons</div>
                    </div>
                    <div className="tables-list-item selectable">
                        <div className="table-number">Table # 2B,</div>
                        <div className="dining-capacity">4 Persons</div>
                    </div>
                    <div className="tables-list-item selectable">
                        <div className="table-number">Table # 2B,</div>
                        <div className="dining-capacity">4 Persons</div>
                    </div>
                    <div className="tables-list-item selectable">
                        <div className="table-number">Table # 2B,</div>
                        <div className="dining-capacity">4 Persons</div>
                    </div>
                    <div className="tables-list-item selectable">
                        <div className="table-number">Table # 2B,</div>
                        <div className="dining-capacity">4 Persons</div>
                    </div>
                    <div className="tables-list-item selectable">
                        <div className="table-number">Table # 2B,</div>
                        <div className="dining-capacity">4 Persons</div>
                    </div>
                </div>
                <div className="tables-list-item selectable">
                    <div>Confirm</div>
                </div>
            </div>
        </section>
    )
}
