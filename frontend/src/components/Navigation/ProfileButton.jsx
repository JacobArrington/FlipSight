import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setTimeout(() => {
        setShowMenu(true);
    }, 0);
};

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

const ulClassName = showMenu ? "" : "hidden";
  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={`border border-black border-2 rounded-lg bg-white text-left p-1 ${ulClassName}`} ref={ulRef}>
    <li>{user.username}</li>
    <li>{user.firstName} {user.lastName}</li>
    <li>{user.email}</li>
    <li>
        <button onClick={logout}>Log Out</button>
    </li>
</ul>
    </>
  );
}

export default ProfileButton;
