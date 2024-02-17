import './styles.css'
import React from "react";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "../../redux/modules/auth/selectors";
interface HomeCTAProps {
    navigateTo: (params: any) => any;
}
const HomeCTA:React.FC<HomeCTAProps> = ({navigateTo}) => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    return (
        <section className={'home-cta'}>
            <div className="text-cta">
                <h1>Welcome to Demo App</h1>
                <p>This is just a demo app with cool features.</p>
                <button onClick={() => isAuthenticated ? navigateTo('createReservation') : navigateTo('login')}>Reserve Your Table</button>
            </div>
        </section>
    )
}

export default HomeCTA
