import './styles.css'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuthenticated} from "../../redux/modules/auth/selectors";
import {logoutRequest} from "../../redux/modules/auth/actions";
import Cookies from "js-cookie";

interface NavBarProps {
    navigateTo: (params: any) => any;
}

const NavBar:React.FC<NavBarProps> = ({navigateTo}) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const dispatch = useDispatch();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavigate = (path:string) => {
        navigateTo(path)
    }

    const handleLogout = () => {
        const token:string = Cookies.get('access_token') ? Cookies.get('access_token') as string : ""
        dispatch(logoutRequest({token}))
        navigateTo('home')
    }

    return (
        <div className={'nav-section'}>
            <div className={`nav-wrapper ${isMobileMenuOpen ? 'show-mobile-menu' : ''}`}>
                <ul className={`nav-ul nav-logo ${isMobileMenuOpen ? 'show-mobile-menu' : ''}`}>
                    <li onClick={() => handleNavigate('home')}>DemoApp</li>
                </ul>

                <div className={`hamburger ${isMobileMenuOpen ? 'show-mobile-menu' : ''}`} onClick={toggleMobileMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                <ul className={`nav-ul nav-main ${isMobileMenuOpen ? 'mobile-menu' : ''}`}>
                    <li onClick={() => handleNavigate('home')}>Home</li>
                    <li onClick={() => handleNavigate('menu')}>Menu</li>
                    <li onClick={() => handleNavigate('about')}>About</li>
                    <li onClick={() => handleNavigate('contact')}>Contact</li>
                    {
                        isAuthenticated && <>
                            <li>|</li>
                            <li onClick={() => handleNavigate('createReservation')}>Reserve Table</li>
                            <li onClick={() => handleNavigate('myReservations')}>My Reservations</li>
                        </>
                    }
                </ul>

                <ul className={`nav-ul nav-auth ${isMobileMenuOpen ? 'mobile-menu' : ''}`}>
                    {
                        isAuthenticated ? (
                            <li onClick={handleLogout}>Logout</li>
                        ) : (
                            <>
                                <li onClick={() => handleNavigate('login')}>Login</li>
                                <li onClick={() => handleNavigate('signup')}>Signup</li>
                            </>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default NavBar
