import './styles.css'
import {useState} from "react";

export default function NavBar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <div className={'nav-section'}>
            <div className={`nav-wrapper ${isMobileMenuOpen ? 'show-mobile-menu' : ''}`}>
                <ul className={`nav-ul nav-logo ${isMobileMenuOpen ? 'show-mobile-menu' : ''}`}>
                    <li>DemoApp</li>
                </ul>

                <div className={`hamburger ${isMobileMenuOpen ? 'show-mobile-menu' : ''}`} onClick={toggleMobileMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                <ul className={`nav-ul nav-main ${isMobileMenuOpen ? 'mobile-menu' : ''}`}>
                    <li>Home</li>
                    <li>Menu</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>

                <ul className={`nav-ul nav-auth ${isMobileMenuOpen ? 'mobile-menu' : ''}`}>
                    <li>Login</li>
                    <li>Signup</li>
                </ul>
            </div>
        </div>
    )
}
