import './styles.css'
import React from "react";

const MyReservations = () => {
    // const myBookings =
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
                        // looped
                        <div className={"selected tables-list-item selectable"}>
                            <div className="table-number">Table # {'table_no'},</div>
                            <div className="dining-capacity">{'capacity'} Persons</div>
                        </div>
                    }
                </div>
            </div>}
        </section>
    )
}

export default MyReservations
