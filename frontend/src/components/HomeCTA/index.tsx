import './styles.css'
import React from "react";
interface HomeCTAProps {
    navigateTo: (params: any) => any;
}
const HomeCTA:React.FC<HomeCTAProps> = ({navigateTo}) => {
    return (
        <section className={'home-cta'}>
            <div className="text-cta">
                <h1>Welcome to Demo App</h1>
                <p>This is just a demo app with cool features.</p>
                <button onClick={() => navigateTo('createReservation')}>Reserve Your Table</button>
            </div>
        </section>
    )
}

export default HomeCTA
