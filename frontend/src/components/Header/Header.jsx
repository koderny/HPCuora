// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
// import logo from '/public/logo.png'

function Header({ isLoaded }) {


    return (
        <header>
            <NavLink to="/"> <img src="logo.png" className="logo-container" /></NavLink>
            <Navigation isLoaded={isLoaded} />
        </header>
    );
}

export default Header;