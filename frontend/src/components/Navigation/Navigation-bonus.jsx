import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='div-navigation-wrapper'>
      <div className='div-navigation-a'>
        <NavLink to="/">
          <img className='homeImg'src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Animal_Crossing_Leaf.svg/504px-Animal_Crossing_Leaf.svg.png' alt='Home img'></img>
        </NavLink>
      </div>
      {isLoaded && (
        <div className='div-navigation-a-user'>
          {sessionUser && <NavLink to="/spots/new" className={`a-createSpot`}>Create a New Spot</NavLink>}
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
