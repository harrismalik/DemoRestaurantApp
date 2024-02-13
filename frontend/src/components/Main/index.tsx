import './index.css'
import NavBar from "../NavBar";
import background from "../../assets/images/background-home-section-1.jpg";
export default function Main() {
    return (
        <section className={'section-one-home'} style={{ backgroundImage: `url(${background})` }}>
            <NavBar/>
        </section>
    )
}
