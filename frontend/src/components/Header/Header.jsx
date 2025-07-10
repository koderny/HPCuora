// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import { GoSearch } from "react-icons/go";
import { useState } from 'react';

// import logo from '/public/logo.png'

function Header({ isLoaded, search, setSearch }) {

    return (
        <header>
            <NavLink to="/"> <img src="/logo.png" className="logo-container" /></NavLink>
            <form>
                <input type="text" placeholder="What is AI" value={search} onChange={(event) => setSearch(event.target.value)}/>
                    {/* <button type="submit"><GoSearch /></button> */}
            </form>
            <Navigation isLoaded={isLoaded} />
        </header>
    );
}

export default Header;