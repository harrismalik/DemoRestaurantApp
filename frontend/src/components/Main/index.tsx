import './styles.css'
import NavBar from "../NavBar";
import background from "../../assets/images/background-home-section-1.jpg";
import HomeCTA from "../HomeCTA";
import {useState} from "react";
import Login from "../Login";
export default function Main() {
    const [displaySection, setDisplaySection] = useState('login')
    return (
        <section className={'section-one-home'} style={{ backgroundImage: `url(${background})` }}>
            <NavBar/>
            {displaySection == 'home' && <HomeCTA/>}
            {displaySection == 'login' && <Login/>}
        </section>
    )
}
