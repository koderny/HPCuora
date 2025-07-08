// frontend/src/components/Navigation/Navigation.jsx

import { NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FaHeart } from "react-icons/fa";
// import logo from '/public/logo.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);


  return (
    <ul className='navigation-list'>
      {sessionUser && <li><NavLink to="/favoriteQuestions"><FaHeart className="favorited-questions"/></NavLink></li>}
       {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;