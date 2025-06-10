import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '/src/logo.png';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/')
  }

  return (

    <>

      <NavLink to="/"> <img src= {logo} className="logo-container" onClick={goToHome} /></NavLink>

      {isLoaded && (
        
        sessionUser && <NavLink to="/spots/new" className="create-a-spot-container">Create a Spot</NavLink>


      )}


      {isLoaded && (
        
          <ProfileButton user={sessionUser} className="session-button" />

      )}

    </>

  );
}



export default Navigation;