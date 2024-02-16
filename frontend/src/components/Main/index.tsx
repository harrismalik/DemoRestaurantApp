import './styles.css'
import NavBar from "../NavBar";
import background from "../../assets/images/background-home-section-1.jpg";
import HomeCTA from "../HomeCTA";
import {useEffect, useState} from "react";
import Login from "../Login";
import Signup from "../Signup";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "../../redux/modules/auth/selectors";
import CreateReservation from "../CreateReservation";
import RecentReservation from "../RecentReservation";
export default function Main() {
    const [displaySection, setDisplaySection] = useState('recentReservation')
    const isAuthenticated = useSelector(selectIsAuthenticated)

    useEffect(() => {
        if(isAuthenticated && ['login','signup'].includes(displaySection)) {
            setDisplaySection('home')
        }
    },[isAuthenticated])

    return (
        <section className={'section-one-home'} style={{ backgroundImage: `url(${background})` }}>
            <NavBar navigateTo={setDisplaySection}/>
            {displaySection == 'home' && <HomeCTA navigateTo={setDisplaySection}/>}
            {displaySection == 'login' && <Login/>}
            {displaySection == 'signup' && <Signup/>}
            {displaySection == 'createReservation' && <CreateReservation navigateTo={setDisplaySection}/>}
            {displaySection == 'recentReservation' && <RecentReservation/>}
        </section>
    )
}
