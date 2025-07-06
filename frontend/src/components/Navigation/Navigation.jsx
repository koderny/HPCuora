// frontend/src/components/Navigation/Navigation.jsx

import { NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import logo from '/public/logo.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);


  return (
    <ul className='navigation-list'>
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