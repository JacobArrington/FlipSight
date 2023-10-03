import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
        <li>
          <NavLink exact to="/"><i className="fas fa-home"></i></NavLink>
        </li>
        <li>
          <button onClick={logout}><i className="fas fa-sign-out-alt"></i></button>
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <li>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    );
  }

  return (
    <ul>
      
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
