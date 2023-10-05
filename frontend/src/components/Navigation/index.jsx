import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();


 

 
    return (
      <ul>
          {isLoaded && (
            <>
              {sessionUser && (
                <li>
                    <NavLink exact to="/"><i className="fas fa-home"></i></NavLink>
                </li>
              )}
              <li>
                  <ProfileButton user={sessionUser} />
              </li>
            </>
         )}
      </ul>
    );
  }
export default Navigation;
