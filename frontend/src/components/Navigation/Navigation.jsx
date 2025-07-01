// frontend/src/components/Navigation/Navigation.jsx

import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '/public/logo.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

const navigate = useNavigate();
  const goToHome = () => {
    navigate('/')
  }

  return (
    <ul>
      <li>
        <NavLink to="/"> <img src= {logo} className="logo-container" onClick={goToHome} /></NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      {sessionUser && <li><NavLink to="/favoriteQuestions">Favorites</NavLink></li>}
    </ul>
  );
}

export default Navigation;