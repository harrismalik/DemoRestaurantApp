import './styles.css'
import React from "react";
const ContactUs = () => {
    return (
        <section className={'contact-us-section'}>
            <div className="contact-us-div">
                <h1>Contact Us</h1>
                <p>Feel free to contact us for wny query.</p>
                <div className="selected tables-list-item selectable">
                    <div>Instagram</div>
                </div>
                <div className="selected tables-list-item selectable">
                    <div>Facebook</div>
                </div>
                <div className="selected tables-list-item selectable">
                    <div>+9000123123</div>
                </div>
                <div className="selected tables-list-item selectable">
                    <div>email@email.com</div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs
